import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextButton = (props) => {
    return (
        <Text 
            {...props} 
            style={{...styles.text, ...props.style}}>
            { props.title }
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#fff',
    }
});

export default TextButton;