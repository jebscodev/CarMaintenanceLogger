import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoData = (props) => {
    return (
        <View style={ styles.container }>
            <Text style={{...styles.text, ...props.style}}>{ props.text }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    text: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
});

export default NoData;