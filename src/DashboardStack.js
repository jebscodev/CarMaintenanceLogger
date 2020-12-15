import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import Dashboard from './screens/Dashboard';
import PartComponent from './screens/PartComponent';

const Stack = createStackNavigator();

const DashboardStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Dashboard'>

            <Stack.Screen
                name='Dashboard'
                component={ Dashboard } 
                options={{
                    header: () => null
                }} />

            <Stack.Screen
                name='Part/Component'
                component={ PartComponent } />

        </Stack.Navigator>
    );
};

export default DashboardStack;