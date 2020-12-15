import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import DashboardStack from './DashboardStack';
import NewEntry from './screens/NewEntry';
import CarDetails from './screens/CarDetails';


const Tab = createBottomTabNavigator ();

const HomeTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        switch (route.name) {
                            case 'Dashboard':
                                return <FontAwesome name='dashboard' size={size} color={color} />;
                            case 'NewEntry':
                                return <FontAwesome5 name='tools' size={size} color={color} />;
                            case 'CarDetails':
                                return <FontAwesome5 name='car' size={size} color={color} />;
                        }
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                
                <Tab.Screen name='Dashboard' component={DashboardStack} />
                <Tab.Screen name='NewEntry' component={NewEntry} />
                <Tab.Screen name='CarDetails' component={CarDetails} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default HomeTabs;
