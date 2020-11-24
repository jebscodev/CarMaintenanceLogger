import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal } from 'react-native';
import Input from '../components/Input';
import SolidButton from '../components/SolidButton';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewEntry = () => {
    const [date, setDate] = useState(new Date());

    return (
        <View style={styles.screen}>
            <View style={styles.form}>
                <Input style={styles.wrapper} placeholder='Name of Parts' />
                <Input style={styles.wrapper} placeholder='Last Serviced on' />
                <Input style={styles.wrapper} placeholder='Service Time Elapsed' />
                <Input style={styles.wrapper} placeholder='Total Cost' keyboardType='numeric' />
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={date}
                    is24Hour={true}
                    display="default"
                    onChange={()=>{}} />

                <SolidButton 
                    title='ADD ENTRY' 
                    style={styles.wrapper} 
                    onPress={ ()=>{} } />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 50,
    },
    wrapper: {
        marginBottom: 20,
    },
    form: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
        margin: 10,
    },
    label: {
        fontWeight: '300',
    },
    button: {
        alignItems: 'center',
        width: '60%',
    }
});

export default NewEntry;