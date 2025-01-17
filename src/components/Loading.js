import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = (props) => {
    if (!props.loading) {
        return <View />;
    }

    return (
        <View style={{...styles.overlay, ...props.style}}>
            <ActivityIndicator size='large' color='white'/>
            <Text style={ styles.text }>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    }
});

export default Loading;