import React, { useState, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { API, API_TUNNEL } from './config';
import AuthStack from './AuthStack';
import HomeTabs from './HomeTabs';

export const AuthContext = React.createContext();

const AuthProvider = () => {
    const [user, setUser] = useState(null);
    const [loginError, setLoginError] = useState('');

    const auth = {
        user,
        loginError,
        login: async (email, password) => {
            const login = `${API_TUNNEL}/login`;
            const axiosInstance = axios.create({
                timeout: 30000, // 30s
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            const payload = {
                'email': email,
                'password': password
            };
            
            await axiosInstance.post(login, payload)
            .then((response) => {
                // status == 200 otherwise throws an error
                setUser(response.data);
                AsyncStorage.setItem('user', JSON.stringify(response.data));
                setLoginError('');
            })
            .catch((error) => {
                setLoginError('Login Failed.');
            });
        },
        logout: async () =>  {
            const logout = `${API_TUNNEL}/logout`;
            const axiosInstance = axios.create({
                timeout: 30000, // 30s
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${user.access_token}`
                }
            });
            
            await axiosInstance.get(logout)
            .then((response) => {
                console.log(response.data);
                setUser(null);
                AsyncStorage.removeItem('user');
            }).catch((error) => {
                console.log(error);
            });
        },
        register: async (name, email, password, confirmPassword) => {
            const register = `${API_TUNNEL}/register`;
            const axiosInstance = axios.create({
                timeout: 30000, // 30s
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            const payload = {
                'name': name,
                'email': email,
                'password': password,
                'password_confirmation': confirmPassword
            };

            await axiosInstance.post(register, payload)
            .then((response) => {
                setUser(response.data);
                AsyncStorage.setItem('user', JSON.stringify(response.data));
            });
        }
    };

    return (
        <AuthContext.Provider value={ auth }>
            { user ? <HomeTabs /> : <AuthStack /> }
        </AuthContext.Provider>
    );
};

export default AuthProvider;