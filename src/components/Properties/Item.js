import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet, ImageBackground} from "react-native";

const Item = ({item}) => {
    console.log(item.cover_image_url);
    return (
            <ImageBackground source={{uri: item.cover_image_url}} style={styles.imageContainer} imageStyle={styles.image}>
                <Text style={styles.name}>{item.name}</Text>
            </ImageBackground>
    );
};
const styles = StyleSheet.create({
    imageContainer:{
        width: '100%',
        flex:1,
        justifyContent: 'flex-end',

    },
    image:{
        borderRadius: 5,
        resizeMode: 'cover'
    },
    name:{
        fontFamily: 'montserratBold',
        color: 'white',
        marginHorizontal: 10,
        marginBottom: 10

    }
});
export default Item;
