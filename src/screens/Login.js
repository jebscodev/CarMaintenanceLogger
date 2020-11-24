import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import { AuthContext } from '../AuthProvider';

import Branding from '../components/Branding';
import Input from '../components/Input';
import SolidButton from '../components/SolidButton';
import TextButton from '../components/TextButton';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Login = ({ navigation }) => {
    const bgImage = require('../../assets/background-login.jpg');

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const executeLogin = async ()=>{ 
        try {
            setLoading(true);
            await login(username, password); 
        } catch (e) {
            console.log('e2', e);
            setError('Invalid Login.');
            setLoading(false);
        }
    }

    return (
        <ImageBackground source={ bgImage } style={ styles.backgroundImage }>
        
            <Loading loading={ loading } />

            <Branding style={ styles.brandWrapper }/>

            <View style={ styles.screen }>

                <Error style={ styles.wrapper } text={ error } />

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
                    onPress={ executeLogin }/>

                <TextButton 
                    title='Sign Up' 
                    style={ styles.textButton } 
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
    textButton: {
        marginBottom: 20,
        color: '#fff',
    },
});

export default Login;

