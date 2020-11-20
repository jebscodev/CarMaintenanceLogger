import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const SolidButton = (props) => {
    return (
        <View style={{...styles.container, ...props.style}}>
            <Button title={ props.title } onPress={ props.onPress } />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '60%',
    },
});

export default SolidButton;