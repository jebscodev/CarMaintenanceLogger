import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { AuthContext } from '../AuthProvider';
import { API_TUNNEL } from '../config/';
import { MAKES, MODELS, YEARS, BODYTYPES } from '../config/data';
import axios from 'axios';

import SolidButton from '../components/SolidButton';
import DropDown from '../components/DropDown';
import Header from '../components/Header';
import Error from '../components/Error';
import Loading from '../components/Loading';

const CarDetails = () => {

    const { user } = useContext(AuthContext);
    
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [bodyType, setBodyType] = useState('');

    const addDetails = async () => {
        const url = `${API_TUNNEL}/cars`;
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
            make,
            model,
            year,
            bodyType
        };

        await axiosInstance.post(url, payload)
        .then((response) => {})
        .catch((error) => {});
    };

    return (
        <View style={styles.screen}>
            
            {/* <Loading loading={ loading } style={{ elevation:10 }}/> */}

            <View style={styles.form}>
                
                <View style={styles.headerWrapper}>
                    <Header style={styles.header} text='Car Details' />
                </View>
                
                {/* <Error style={ styles.wrapper } text={ error } /> */}

                <Text style={styles.label}>Make:</Text>
                <View style={styles.wrapper}>
                    <DropDown
                        default='select-make'
                        data={MAKES}
                        value={make}
                        onChange={(item) => {
                            setMake(item.label);
                        }} />
                </View>

                <Text style={styles.label}>Model:</Text>
                <View style={styles.wrapper}>
                    <DropDown
                        default='select-model'
                        data={MODELS}
                        value={model}
                        onChange={(item) => {
                            setModel(item.label);
                        }} />
                </View>

                <Text style={styles.label}>Year:</Text>
                <View style={styles.wrapper}>
                    <DropDown
                        default='select-year'
                        data={YEARS}
                        value={year}
                        onChange={(item) => {
                            setYear(item.label);
                        }} />
                </View>

                <Text style={styles.label}>Body Type:</Text>
                <View style={styles.wrapper}>
                    <DropDown
                        default='select-body-type'
                        data={BODYTYPES}
                        value={bodyType}
                        onChange={(item) => {
                            setBodyType(item.label);
                        }} />
                </View>

                <SolidButton 
                    title='ADD DETAILS' 
                    style={styles.wrapper} 
                    onPress={addDetails} />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    headerWrapper: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        color: '#000',
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

export default CarDetails;