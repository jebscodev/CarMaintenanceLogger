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
import Error from '../components/Error';

// TO DO: add loading while adding new entry

const NewEntry = ({ navigation }) => {

    const { user, triggerListUpdate } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [dateStr, setDateStr] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [elapsedTime, setElapsedTime] = useState('0');
    const [partName, setPartName] = useState('select-part');
    const [totalCost, setTotalCost] = useState('');
    const [error, setError] = useState('');

    const getElapsedTime = (serviceDate) => {
        const currentDate = new Date();
        const diff = currentDate.getTime() - serviceDate.getTime();
        const diffDays = Math.floor(diff / (1000*60*60*24));
        return diffDays.toString();
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
            'lastServiceDate': dateStr,
            'serviceTimeElapsed': elapsedTime,
            'totalCost': totalCost
        };

        //console.log(payload);
    
        await axiosInstance.post(addNewEntry, payload)
        .then((response) => {
            setDateStr('');
            setElapsedTime('0');
            setPartName('select-part');
            setTotalCost('');

            switch (response.status) {
                case 201:
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
                    break;
                default:
                    Alert.alert(
                        'Error',
                        'Failed to addd new entry.'
                    );
                    break;
            }
        })
        .catch((error) => {
            // HTTP 500 error is caught here
            Alert.alert(
                'Error',
                'Server Error. Please try again later.',
                [{
                    text: 'OK'
                }]
            );
        });
    };
  
    return (
        <View style={styles.screen}>
            <View style={styles.form}>
            
                <Error style={ styles.wrapper } text={ error } />

                <Text style={styles.label}>Part / Component:</Text>
                <View style={styles.wrapper}>
                    <DropDown
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
        marginTop: 50,
        justifyContent: 'center',
    },
    wrapper: {
        marginBottom: 20,
        width: '100%',
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