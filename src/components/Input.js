import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
    return (
        <TextInput
            {...props} 
            style={{...styles.input, ...props.style}} />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '60%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingLeft: 20,
    },
});

export default Input;