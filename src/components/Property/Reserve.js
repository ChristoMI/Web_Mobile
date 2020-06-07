import React, {useState} from 'react';
import {Button, Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Reserve = ({step, submitStartDate, submitEndDate, changeStep}) => {

    const [startDate, setStartDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShow(Platform.OS === 'ios');
        setStartDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View>
            <View>
                <Button onPress={showDatepicker} title="Pick your starting date"/>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default Reserve;
