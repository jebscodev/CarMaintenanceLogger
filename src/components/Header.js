import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Header = (props) => {
    return (
        <Text 
            {...props} 
            style={{...styles.text, ...props.style}}>
            { props.text }
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
    }
});

export default Header;