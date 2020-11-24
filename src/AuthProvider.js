import React, { useState, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { API, API_TUNNEL } from './config';
import AuthStack from './AuthStack';
import HomeTabs from './HomeTabs';

export const AuthContext = React.createContext();

const AuthProvider = () => {
    const [user, setUser] = useState(null);

    // const auth = useMemo(() => ({
    const auth = {
        user,
        login: async (username, password) => {            
            const login = `${API_TUNNEL}/api/login`;
            const axiosInstance = axios.create({
                timeout: 30000, // 30s
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            
            await axiosInstance.post(login, {
                'username': username,
                'password': password
            }).then((response) => {
                setUser(response.data);
                AsyncStorage.setItem('user', JSON.stringify(response.data));
            });
            // .catch((error) => {
            //     console.log('e1', error);}
            // );
        },
        logout: async () =>  {            
            const logout = `${API_TUNNEL}/api/logout`;
            const axiosInstance = axios.create({
                timeout: 30000, // 30s
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${user.access_token}`
                }
            });
            
            await axiosInstance.get(logout).then((response) => {
                if (response.status == 200) {
                    setUser(null);
                    AsyncStorage.removeItem('user');
                }
            }).catch((error) => {
                console.log('e1', error);
            });
        }
    //}), []);
    };

    return (
        <AuthContext.Provider value={ auth }>
            { user ? <HomeTabs /> : <AuthStack /> }
        </AuthContext.Provider>
    );
};

export default AuthProvider;