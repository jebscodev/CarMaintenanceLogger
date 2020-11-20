import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import Statistics from './screens/Statistics';
import NewEntry from './screens/NewEntry';

const Tab = createBottomTabNavigator ();

const HomeTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Statistics') {
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
                <Tab.Screen name='Statistics' component={Statistics} />
                <Tab.Screen name='NewEntry' component={NewEntry} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default HomeTabs;
