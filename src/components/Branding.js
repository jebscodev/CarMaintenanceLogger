import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Branding = (props) => {
    return (    
        <View style={{...styles.container, ...props.style}}>
            <Text style={ styles.brand }>cara</Text>
            <Text style={ styles.tagline }>Your personal service representative.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    brand: {
        color: '#fff',
        letterSpacing: -5,
        fontSize: 100,
        fontWeight: 'bold',
    },
    tagline: {
        color: '#fff',
        fontStyle: 'italic',
    },
});

export default Branding;