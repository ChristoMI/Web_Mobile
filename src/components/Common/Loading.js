import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from "react-native";
import Text from "react-native-paper/src/components/Typography/Text";

const Loading = ({message}) => {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            {message ? <Text style={{marginVertical: 5}}>{message}</Text> : null}
            <ActivityIndicator size="large" color="#009688"/>
        </View>
    );
};

export default Loading;
