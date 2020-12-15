import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AuthContext } from '../AuthProvider';
import { API_TUNNEL } from '../config/';
import { PARTS } from '../config/data';
import axios from 'axios';

import Input from '../components/Input';
import SolidButton from '../components/SolidButton';
import DropDown from '../components/DropDown';
import Header from '../components/Header';
import Error from '../components/Error';
import Loading from '../components/Loading';

const NewEntry = ({ navigation }) => {

    const { user, triggerListUpdate } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [dateStr, setDateStr] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [elapsedTime, setElapsedTime] = useState('0');
    const [partName, setPartName] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getElapsedTime = (serviceDate) => {
        const currentDate = new Date();
        const elapse = Math.floor((currentDate.getTime() - serviceDate.getTime()) / (1000*60*60*24));
        return elapse.toString();
    };

    const onChangeDate = (event, selectedDate) => {
        
        setShow(Platform.OS === 'ios'); // false

        if (event.type === 'neutralButtonPressed') {
            setDate(new Date());
            setDateStr('');
            setElapsedTime('');
        } else {
            const serviceDate = selectedDate || date;
            setDate(serviceDate);
            setDateStr(serviceDate.toLocaleDateString());
            setElapsedTime(getElapsedTime(serviceDate));
        }
    };
  
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
  
    const showDatepicker = () => {
        showMode('date'); // i.e. time
    };

    const addEntry = async () => {

        setLoading(true);

        const addNewEntry = `${API_TUNNEL}/entries`;
        const axiosInstance = axios.create({
            timeout: 30000, // 30s
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${user.access_token}`
            }
        });
        const payload = {
            'part': partName,
            'lastServiceDate': date,
            'lastServiceDateStr': dateStr,
            // 'serviceTimeElapsed': elapsedTime,
            'totalCost': totalCost
        };
    
        await axiosInstance.post(addNewEntry, payload)
        .then((response) => {
            setDateStr('');
            setElapsedTime('0');
            setPartName('');
            setTotalCost('');
            setLoading(false);

            // 201 successful create
            Alert.alert(
                'Success',
                response.data.message,
                [{
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('Dashboard');
                    }
                }]
            );

            triggerListUpdate();
        })
        .catch((error) => {
            setLoading(false);

            // 500 and other errors are caught here
            Alert.alert(
                'Failed',
                'Failed to add new entry. Please try again later.'
            );
        });
    };
  
    return (
        <View style={styles.screen}>
            
            <Loading loading={ loading } style={{ elevation:8 }}/>

            <View style={styles.form}>
                
                <View style={styles.headerWrapper}>
                    <Header style={styles.header} text='Service Log' />
                </View>

                <Error style={ styles.wrapper } text={ error } />

                <Text style={styles.label}>Part / Component:</Text>
                <View style={styles.wrapper}>
                    <DropDown
                        default='select-part'
                        data={PARTS}
                        value={partName}
                        onChange={(item) => {
                            setPartName(item.label);
                        }} />
                </View>

                <Text style={styles.label}>Last Serviced On:</Text>
                <Input 
                    style={styles.wrapper} 
                    placeholder='Select Date' 
                    onFocus={showDatepicker} 
                    value={dateStr} />
                
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="spinner"
                    maximumDate={new Date()}
                    neutralButtonLabel="clear"
                    onChange={onChangeDate} />
                )}

                <Text style={styles.label}>Service Time Elapsed (days):</Text>
                <Input 
                    style={styles.wrapper} 
                    editable={false}
                    value={elapsedTime} 
                    onChangeText={(elapsedTime) => {
                        setElapsedTime(elapsedTime);
                    }} />

                <Text style={styles.label}>Total Cost (Php):</Text>
                <Input 
                    style={styles.wrapper} 
                    keyboardType='numeric' 
                    placeholder='10000'
                    value={totalCost}
                    onChangeText={(totalCost) => {
                        setTotalCost(totalCost);
                    }} />

                <SolidButton 
                    title='ADD ENTRY' 
                    style={styles.wrapper} 
                    onPress={addEntry} />
                    
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    wrapper: {
        marginBottom: 20,
        width: '100%',
    },
    headerWrapper: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        color: '#000',
    },
    form: {
        paddingHorizontal: 20,
        paddingVertical: 50,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
        margin: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default NewEntry;