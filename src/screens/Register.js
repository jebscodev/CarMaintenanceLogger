import React, { useState, useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { AuthContext } from '../AuthProvider';

import Input from '../components/Input';
import Header from '../components/Header';
import SolidButton from '../components/SolidButton';

const Register = () => {
    const bgImage = require('../../assets/background-login.jpg');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('alphalogic@gmail.com');
    const [password, setPassword] = useState('abc');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { register } = useContext(AuthContext);

    return (
        <ImageBackground source={ bgImage } style={ styles.backgroundImage }>
            <View style={ styles.screen }>

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
                    onPress={() => { 
                        register(username, email, password);
                     }} />

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

