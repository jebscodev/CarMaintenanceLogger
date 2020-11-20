import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                mode='modal'
                initialRouteName='Login'>

                <Stack.Screen 
                    name='Login' 
                    component={ Login } 
                    options={{
                        header: () => null,
                    }} />
                <Stack.Screen 
                    name='Register' 
                    component={ Register } />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthStack;