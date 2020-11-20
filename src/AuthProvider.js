import React, { useState, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { API, API_TUNNEL } from './config';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const auth = useMemo(() => ({
        login: async (username, password) => {
            
            const endpoint = `${API_TUNNEL}/api/login`;
            // const endpoint = 'http://localhost:8000/api/login';
            // const endpoint = '/api/login';

            console.log('login', endpoint, username, password);

            const axiosInstance = axios.create({
                //timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': '*'
                }
            });

            try {
                await axiosInstance.post(endpoint, {
                    'username': username,
                    'password': password
                }).then(
                    (response) => {console.log(response.data);}
                ).catch(
                    (error) => {console.log('e1', error);}
                );
            } catch (e) {
                console.log('e2', e);
            }

            // axios.post(
            //     endpoint, 
            //     { 
            //         username,
            //         password
            //     }
            // )
            // .then(response => {
            //     console.log('success', response.data.data);
            // })
            // .catch(error => {
            //     console.log('An error occured.', error);
            // });
        },
        logout: () =>  {
            console.log('logout');
        },
        register: (username, email, password) => {
            console.log('register', username, email, password);
        }
    }), []);

    return (
        <AuthContext.Provider value={ auth }>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;