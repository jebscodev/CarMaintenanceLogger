import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

import { AuthContext } from '../AuthProvider';
import { API_TUNNEL } from '../config/index';
import axios from 'axios';

import TextButton from '../components/TextButton';
import NoData from '../components/NoData';
import SolidButton from '../components/SolidButton';

const Dashboard = ({ navigation }) => {
    const { user, logout, updateList, triggerListUpdate } = useContext(AuthContext);
    const [partsList, setPartsList] = useState([]);

    const getElapsedTime = (serviceDate) => {
        const currentDate = new Date();
        const elapse = Math.floor((currentDate.getTime() - serviceDate.getTime()) / (1000*60*60*24));
        return elapse.toString();
    };

    const deleteEntry = async (id) => {
        const url = `${API_TUNNEL}/entries/${id}`
        const axiosInstance = axios.create({
            timeout: 30000, // 30s
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${user.access_token}`
            }
        });

        await axiosInstance.delete(url)
        .then((response) => {
            // 204 successful delete
            Alert.alert(
                'Deleted',
                'Entry is removed from the list.',
            );
            triggerListUpdate();
        })
        .catch((error) => {
            // 500 and 404 errors are caught here
            Alert.alert(
                'Failed',
                'Failed to remove entry from the list.',
            );
        });
    };

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
                        setPartsList(response.data);
                        break;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        };

        getParts();
    }, 
    // useEffect is only invoked when updateList changes
    [updateList]
    );

    // should be dynamic
    // const car = {
    //     make: 'Suzuki',
    //     modelYear: 'Swift 2016',
    //     bodyType: 'Hatchback'
    // };
    const car = null;

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text>Hello {user.user.name}!</Text>
                <TextButton 
                    style={styles.textButton}
                    title='LOGOUT' 
                    onPress={async () => { 
                        await logout(); 
                    }} />
            </View>

            <View style={styles.cardWrapper}>
                { car ?
                    <View style={styles.mainCard}>
                        <Text style={styles.label}>Car Make: {car.make}</Text>
                        <Text style={styles.label}>Model and Year: {car.modelYear}</Text>
                        <Text style={styles.label}>Body Type: {car.bodyType}</Text>
                    </View> :
                    <View style={styles.mainCard}> 
                        <NoData text='No Car details available.' /> 
                        <SolidButton title='Add Car Details' onPress={()=>{ navigation.navigate('CarDetails'); }} />
                    </View>
                }

                { partsList.length > 0 ? 
                    <FlatList 
                        data={partsList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity 
                                    style={styles.card} 
                                    onPress={()=>{ navigation.navigate('Part/Component', {item}); }}
                                    onLongPress={() => {
                                        Alert.alert(
                                            'Delete',
                                            `Remove ${item.entry.part} from the list?`,
                                            [
                                                {text: 'Yes', onPress: () => { deleteEntry(item.id); }},
                                                {text: 'Cancel', onPress: () => {}}
                                            ]
                                        );
                                    }}>
                                    
                                    <View style={styles.cardDetails}>
                                        <Text style={styles.label}>Name of Parts: {item.entry.part}</Text>
                                        <Text style={styles.label}>Last Serviced on: {item.entry.lastServiceDateStr}</Text>
                                        <Text style={styles.label}>Service Time Elapsed: { getElapsedTime(new Date(item.entry.lastServiceDate)) }</Text>
                                        <Text style={styles.label}>Total Cost: {item.entry.totalCost}</Text>
                                    </View>
                                    <View style={styles.cardImage}>
                                        {/* <Image source={item.image} /> */}
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        contentContainerStyle={{ paddingBottom: 150 }} /> : 

                    <View style={styles.mainCard}> 
                        <NoData text='No Service logs available.' /> 
                        <SolidButton title='Add Service log' onPress={()=>{ navigation.navigate('NewEntry'); }} />
                    </View>
                }
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
        // borderRadius: 10,
        // elevation: 5,
        // backgroundColor: '#fff',
        // marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
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

export default Dashboard;

