import React, {useState} from 'react';
import {Button, Platform, StatusBar, StyleSheet, View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ThemeButton from "../../Common/ThemeButton";

const ReserveStepTwo = ({submitEndDate}) => {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShow(Platform.OS === 'ios');
        if(currentDate)
            submitEndDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <ThemeButton pressHandler={showDatepicker} title="Pick your end date"/>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E5E5E5",

    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ReserveStepTwo;
