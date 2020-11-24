import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import Input from '../components/Input';
import Header from '../components/Header';
import SolidButton from '../components/SolidButton';
import Error from '../components/Error';

const Register = () => {
    const bgImage = require('../../assets/background-login.jpg');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('alphalogic@gmail.com');
    const [password, setPassword] = useState('abc');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const register = (username, email, password, confirmPassword) => {
        console.log('register', username, email, password, confirmPassword);

        if (password !== confirmPassword) {
            console.log('Password mismatch.');
            return;
        }
        
        console.log('register-success', username, email, password);
    };

    return (
        <ImageBackground source={ bgImage } style={ styles.backgroundImage }>
            <View style={ styles.screen }>

                <Error style={ styles.wrapper } text={ error } />

                <Header style={ styles.wrapper }  text='Sign Up as new user.'/>

                <Input 
                    style={ styles.wrapper } 
                    keyboardType='email-address'
                    placeholder='Username' 
                    value={ username } 
                    onChangeText={ setUsername } />
                <Input 
                    style={ styles.wrapper } 
                    keyboardType='email-address'
                    placeholder='Email' 
                    value={ email } 
                    onChangeText = { setEmail } />
                <Input 
                    style={ styles.wrapper } 
                    secureTextEntry
                    placeholder='Password'
                    value={ password } 
                    onChangeText = { setPassword } />
                <Input 
                    style={ styles.wrapper } 
                    secureTextEntry
                    placeholder='Confirm Password'
                    value={ confirmPassword } 
                    onChangeText = { setConfirmPassword } />
                    
                <SolidButton 
                    title='Register' 
                    onPress={ () => {
                        register(username, email, password, confirmPassword);
                    } } />

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
    },
    wrapper: {
        marginBottom: 20,
    },
});

export default Register;

