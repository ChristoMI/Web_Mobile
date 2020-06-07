import React, {useEffect, useState} from 'react';
import {FlatList, Platform, StatusBar, StyleSheet, View, Text, Alert} from "react-native";
import ThemeButton from "../../Common/ThemeButton";

const Reservations = ({reservations, items, cancel}) => {
    const [toShow, setToShow] = useState(reservations);
    useEffect(() => {
        if(items.length > 0){
            setToShow(toShow.map(prop => {
                const property = items.find(item => prop.propertyId === item.id);
                return {...prop, propName: property.name}
            }));
        }
    }, [reservations]);
    const cancelBooking = (id) => {
        Alert.alert(
            'Canceling booking',
            'Are you sure you want to cancel your booking?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => cancel(id) },
            ]
        );
    };
    return (
        <View style={styles.flatList}>
            {
                reservations && reservations.length > 0 ?   <FlatList
                    data={toShow}
                    keyExtractor={item => item.id}
                    ListFooterComponent={<View style={{height: 30}}/>}
                    renderItem={({item}) =>
                        <View style={styles.info}>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={styles.bold}>
                                        At:
                                    </Text>
                                    {item.propName ? ` ${item.propName}`: null}
                                </Text>
                                <Text style={styles.text}><Text
                                    style={styles.bold}>From: </Text> {new Date(item.beginDate).toISOString().split('T')[0]}
                                </Text>
                                <Text style={styles.text}><Text
                                    style={styles.bold}>To: </Text> {new Date(item.beginDate).toISOString().split('T')[0]}</Text>
                            </View>
                            <View>
                                <ThemeButton title={'cancel'} pressHandler={() => cancelBooking(item.id)}
                                             customStyles={{width: 100, alignSelf: 'flex-end'}}/>
                            </View>

                        </View>}>
                </FlatList> :
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginTop: 55}}>You have no active reservations</Text>
                    </View>
            }

        </View>

    );
};
const styles = StyleSheet.create({
    flatList: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    info: {
        marginHorizontal: 23,
        alignSelf: 'stretch',
        marginTop: 22,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        padding: 10,
        fontFamily: 'montserratMed'
    },
    bold:{
        fontFamily: 'montserratBold'
    }
});
export default Reservations;
