import React, {useEffect, useState} from 'react';
import Info from "./Info";
import Comment from "./Comments/Item";
import {FlatList, Platform, StatusBar, StyleSheet, View} from "react-native";
import Loading from "../Common/Loading";
import Error from "../Common/Error";

const Property = ({property, comments, navigation}) => {
    const {items} = comments;
    return (
        <FlatList
            ListHeaderComponent={<Info property={property} navigation={navigation}/>}
            ListFooterComponent={<View style={{height : 30}}/>}
            data={items}
            extraData={property}
            renderItem={({item}) => <Comment item={item}/>}
            keyExtractor={(item) => item.id}
            style={styles.property}
        />
    );
};
const styles = StyleSheet.create({
    property: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    }
});
export default Property;
