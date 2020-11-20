import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const NewEntry = () => {

    // should be dynamic
    let carMake = 'Suzuki';
    let carModelYear = 'Swift 2016';
    let carBodyType = 'Hatchback';

    return (
        <View style={styles.screen}>
            <View style={styles.details}>
                <Text style={styles.label}>Car Make: {carMake}</Text>
                <Text style={styles.label}>Model and Year: {carModelYear}</Text>
                <Text style={styles.label}>Body Type: {carBodyType}</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Parts/Service:</Text>
                <Text style={styles.label}>Job Done:</Text>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.label}>Cost:</Text>
            </View>

            <View style={styles.button}>
                <Button title='Add Entry' onPress={()=>{}} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 50,
    },
    details: {
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
        margin: 10,
    },
    form: {
        padding: 10,
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