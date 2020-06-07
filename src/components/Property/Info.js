import React, {useEffect, useState} from 'react';
import {Image, Text, StyleSheet, TouchableOpacity, View, Modal, Alert, TouchableHighlight} from "react-native";
import ThemeButton from "../Common/ThemeButton";
import Add from "./Comments/Add";
import AddComment from "../../containers/AddComment";
import {useSelector} from "react-redux";

const Info = ({property, navigation}) => {
    const {cover_image_url, id, name, description, price, address, country, city} = property;
    const [isFullDescHidden, setIsFullDescHidden] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setIsFullDescHidden(true);
    },[property]);

    return (
        <>
            <Image source={{uri: cover_image_url}} style={styles.image}/>
            <View style={styles.info}>
                <Text style={[styles.infoItem, styles.name]}>{name}</Text>
                <TouchableOpacity onPress={() => setIsFullDescHidden(!isFullDescHidden)} activeOpacity={0.8}>
                    <Text style={styles.infoItem}>
                        {
                            isFullDescHidden && property.description.length > 300 ?
                                description.substring(0, 300) + "..."
                                : description
                        }
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoItem}>
                    {country}
                </Text>
                <Text style={styles.infoItem}>
                    {city}
                </Text>
                <Text style={styles.infoItem}>
                    {address}
                </Text>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={{marginRight: 20, marginTop:20, fontWeight: 'bold', fontFamily: 'montserratBold'}}>Price: {price} $</Text>
                    <ThemeButton title='Reserve' customStyles={styles.button} pressHandler={() => navigation.navigate('Reserve')}/>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Comments</Text>
            <AddComment id={id} />

        </>
    );
};
const styles = StyleSheet.create({
    image:{
        alignSelf: 'stretch',
        height: 144,
        marginBottom: 20
    },
    info:{
        marginHorizontal: 23,
        alignSelf: 'stretch',
        marginTop: 22,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal:10,
        flexGrow: 1,

    },
    sectionTitle: {
        fontFamily: 'montserratBold',
        marginLeft: 24,
        fontSize: 15,
        marginTop: 20
    },
    infoItem:{
        marginHorizontal: 10,
        fontFamily: 'montserratMed',
        marginBottom: 5,
        lineHeight:20
    },
    name: {
        fontFamily: 'montserratBold',
        marginVertical: 5
    },
    showFullText:{
        alignSelf: 'center',
        color: '#009688',
        marginVertical: 15,
        borderWidth: 0.5,
        borderColor : '#009688',
        padding: 10,
        fontFamily: 'montserratMed'
    },
    button:{
        alignSelf: 'flex-end',
        width:113,
        height:37,
        marginRight: 23,
        marginTop: 19
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default Info;
