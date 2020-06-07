import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {Image, Keyboard, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const Error = ({message, pressHandler, cleanUp}) => {
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                cleanUp ? cleanUp() : null;
            };
        }, [])
    );
    return (
        <View style={styles.container}>
                <Text style={styles.title}>Something went wrong!</Text>
            {
                message ?
                    <Text style={styles.body}>{message}</Text> :
                    <Text style={styles.body}>Try again and if problem persists, please kindly contact our support
                        team</Text>
            }
            {
                pressHandler ?
                    <View style={styles.back}>
                        <TouchableOpacity style={styles.arrow} onPress={pressHandler}>
                            <Image style={styles.arrowPic}
                                   source={require('../../../assets/back.png')}

                            />
                            <Text style={styles.goBack} >Go back</Text>
                        </TouchableOpacity>
                    </View>
                    : null
            }

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'montserratBold',
        textAlign: 'center'

    },
    body: {
        fontFamily: 'montserratMed',
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: 'center',

    },
    back:{
        width: '100%',
    },
    arrow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowPic:{
        height: 20,
        width: 20,
        marginRight: 20
    },
    goBack: {
        fontWeight: 'bold'
    }
});
export default Error;
