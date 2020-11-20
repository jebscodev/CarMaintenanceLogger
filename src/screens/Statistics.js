import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../AuthProvider';

const Statistics = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={styles.screen}>
            <Text>Statistics Page</Text>
            <Text>Welcome {user.name}!</Text>
            <Button 
                title='Logout' 
                onPress={async ()=>{ 
                    await logout(); 
                }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 50,
    },
});

export default Statistics;

