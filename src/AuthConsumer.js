import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import HomeTabs from './HomeTabs';

const AuthConsumer = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            { user ? <HomeTabs /> : <AuthStack /> }
        </>
    );
};

export default AuthConsumer;