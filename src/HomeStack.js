import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Statistics from './screens/Statistics';
import NewEntry from './screens/NewEntry';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Statistics' component={Statistics} />
                <Stack.Screen name='NewEntry' component={NewEntry} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default HomeStack;