import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import { AuthContext } from '../AuthProvider';

import Branding from '../components/Branding';
import Input from '../components/Input';
import SolidButton from '../components/SolidButton';
import TextButton from '../components/TextButton';

const Login = ({ navigation }) => {
    const bgImage = require('../../assets/background-login.jpg');

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const { login } = useContext(AuthContext);

    return (
        <ImageBackground source={ bgImage } style={ styles.backgroundImage }>

            <Branding style={ styles.brandWrapper }/>

            <View style={ styles.screen }>

                <Input 
                    style={ styles.wrapper }
                    placeholder='Username' 
                    value={ username }
                    onChangeText={ setUsername } />

                <Input 
                    style={ styles.wrapper }
                    placeholder='Password' 
                    secureTextEntry
                    value={ password }
                    onChangeText={ setPassword } />

                <SolidButton 
                    title='Log In' 
                    style={ styles.wrapper } 
                    onPress={ async ()=>{ 
                        await login(username, password); 
                    }}/>

                <TextButton 
                    title='Sign Up' 
                    style={ styles.wrapper } 
                    onPress={()=>{
                        navigation.navigate('Register')
                    }}/>

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
    brandWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30,
    },
    wrapper: {
        marginBottom: 20,
    },
});

export default Login;

