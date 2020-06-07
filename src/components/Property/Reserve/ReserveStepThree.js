import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, Text, TextInput, View} from "react-native";
import ThemeButton from "../../Common/ThemeButton";

const ReserveStepThree = ({submitBooking}) => {
    const [count, setCount] = useState(1);
    const submit = () => submitBooking(count);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>How many rooms do you want to book?</Text>
            <TextInput
                value={count}
                onChangeText={text => setCount(text)}
                autoCapitalize='none'
                keyboardType='number-pad'
                style={styles.input}
            />
            <ThemeButton
                pressHandler={submit}
                title='Place booking'
                customStyles={{marginTop: 25}}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40,
        paddingHorizontal: 3,
        width: 280,
        borderColor: '#fff',
        borderBottomColor: '#009688',
        borderWidth: 2,
        backgroundColor: '#fff',
        fontFamily: 'montserratBold',


    },
    label: {
        fontSize: 13,
        fontWeight: 'normal',
        marginTop: 15,
        color: '#181818',
        fontFamily: 'montserratBold',

    },
    button: {
        borderRadius: 5,
        marginBottom: 0,
        marginTop: 20,
        fontFamily: 'montserratBold',
    },
});
export default ReserveStepThree;
