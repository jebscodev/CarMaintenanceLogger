import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PartComponent = ({ route }) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>PartComponent Page { route.params.item.entry.part } </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PartComponent;