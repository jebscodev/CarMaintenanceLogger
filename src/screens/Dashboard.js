import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

import { AuthContext } from '../AuthProvider';
import { API_TUNNEL } from '../config/index';
import axios from 'axios';

import TextButton from '../components/TextButton';
import NoData from '../components/NoData';

const Dasboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [partsList, setPartsList] = useState([]);
    const [showList, setShowList] = useState(true);

    useEffect(() => {
        const getParts = async () => {
            const url = `${API_TUNNEL}/entries`;
            const axiosInstance = axios.create({
                timeout: 30000, // 30s
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${user.access_token}`
                }
            });
    
            await axiosInstance.get(url)
            .then((response) => {
                switch (response.status) {
                    case 200:
                        setPartsList(response.data.data);
                        break;
                    case 204: // No Content
                    // case 500: // Server Error
                        setShowList(false);
                        break;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        };

        getParts();
    }, 
    // pass an empty array as dependency
    // so that useEffect is invoked only once
    // []
    // TODO: find a way such that useEffect is invoked only when needed
    );

    // should be dynamic
    let carMake = 'Suzuki';
    let carModelYear = 'Swift 2016';
    let carBodyType = 'Hatchback';

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text>Hello {user.user.name}!</Text>
                <TextButton 
                    style={styles.textButton}
                    title='LOGOUT' 
                    onPress={async ()=>{ 
                        await logout(); 
                    }} />
            </View>

            <View style={styles.cardWrapper}>
                <View style={styles.mainCard}>
                    <Text style={styles.label}>Car Make: {carMake}</Text>
                    <Text style={styles.label}>Model and Year: {carModelYear}</Text>
                    <Text style={styles.label}>Body Type: {carBodyType}</Text>
                </View>

                { showList ? <FlatList 
                    data={partsList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card} onPress={()=>{}}>
                                <View style={styles.cardDetails}>
                                    <Text style={styles.label}>Name of Parts: {item.entry.part}</Text>
                                    <Text style={styles.label}>Last Serviced on: {item.entry.lastServiceDate}</Text>
                                    <Text style={styles.label}>Service Time Elapsed: {item.entry.serviceTimeElapsed}</Text>
                                    <Text style={styles.label}>Total Cost: {item.entry.totalCost}</Text>
                                </View>
                                <View style={styles.cardImage}>
                                    {/* <Image source={item.image} /> */}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    contentContainerStyle={{ paddingBottom: 150 }} /> : <NoData text='No Data Available.' /> }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    textButton: {
        color: 'red',
    },
    cardWrapper: {
        flexDirection: 'column',
    },
    mainCard: {
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        elevation: 5,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 1,
    },
    cardImage: {
        backgroundColor: 'green',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
});

export default Dasboard;

