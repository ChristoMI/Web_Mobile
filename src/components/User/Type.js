import React, {useState} from 'react';
import {Button} from "react-native-paper";
import {Platform, StatusBar, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setUserType} from "../../redux/user/actions";
import { useFocusEffect } from '@react-navigation/native';

const Type = ({setType}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>I am a...</Text>
            <Button
                color="#009688"
                mode="contained"
                style={[styles.button, styles.google]}
                onPress={() => setType('host')}>
                <Text style={{lineHeight: 30}}>Host</Text>
            </Button>
            <Button
                color="#009688"
                mode="contained"
                style={[styles.button, styles.google]}
                onPress={() => setType('customer')}>
                <Text style={{lineHeight: 30}}>Customer</Text>
            </Button>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        fontFamily: 'montserratBold',
        fontSize: 20
    },
    google: {
        width: 280,
        backgroundColor: '#009688',
        fontFamily: 'montserratBold',
        borderRadius: 5,
        height:50,
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    button: {
        borderRadius: 5,
        marginBottom: 0,
        marginTop: 20,
        fontFamily: 'montserratBold',
    },
});
export default Type;
