import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Loading from "../../Common/Loading";
import {Button} from "react-native-paper";
import {useSelector} from "react-redux";

const ReserveDone = ({navigation, startDate, endDate, booked}) => {
    const {profile} = useSelector(state => state.user);
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', elevation: 2}}>
            <Text style={styles.text}>Your booking was successfully place, safe travels!</Text>
            <Text style={styles.text2}>Booked by: {profile.firstName} {profile.lastName}</Text>
            <Text style={styles.text2}>From: {startDate.toLocaleString()}</Text>
            <Text style={styles.text2}>To: {endDate.toLocaleString()}</Text>
            <Text style={styles.text2}>Booked rooms: {booked}</Text>
            <Button
                onPress={() => navigation.navigate("Reservations")}
                color="#009688"
                mode="contained"
                style={styles.button}>
                <Text style={{lineHeight: 30}}>Continue</Text>
            </Button>
        </View>
    );
};
const styles = StyleSheet.create({
    text:{
        fontFamily: 'montserratBold',
        marginVertical: 5
    },
    text2:{
        fontFamily: 'montserratMed',
        marginVertical: 5
    },
    button: {
        borderRadius: 5,
        marginBottom: 30,
        marginTop: 20,
        fontFamily: 'montserratBold',
    }
});

export default ReserveDone;
