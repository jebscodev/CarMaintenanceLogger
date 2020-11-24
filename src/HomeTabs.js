import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import Dashboard from './screens/Dashboard';
import NewEntry from './screens/NewEntry';

const Tab = createBottomTabNavigator ();

const HomeTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
            
                        if (route.name === 'Dashboard') {
                            iconName = 'dashboard';
                        } else if (route.name === 'NewEntry') {
                            iconName = 'addfile';
                        }
            
                        // You can return any component that you like here!
                        return <AntDesign name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen name='Dashboard' component={Dashboard} />
                <Tab.Screen name='NewEntry' component={NewEntry} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default HomeTabs;
