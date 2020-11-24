import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Error = (props) => {
    return (
        <View style={ styles.container }>
            <Text style={{...styles.text, ...props.style}}>{ props.text }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    text: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'italic',
    }
});

export default Error;