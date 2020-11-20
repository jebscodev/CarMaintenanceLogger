import React, { useContext } from 'react';
import AuthProvider from './AuthProvider';
import AuthConsumer from './AuthConsumer';

const Main = () => {
    return (
        <AuthProvider>
            <AuthConsumer />
        </AuthProvider>
    );
};

export default Main;