import React, {useState} from 'react';
import {Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
const Home = ({updateAvatar, profile}) => {
    const [image, setImage] = useState(null);
    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        return _pickImage();
    };
    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                base64: true
            });
            if (!result.cancelled) {
                updateAvatar(result.base64);
            }
        } catch (E) {
            console.log(E);
        }
    };
    console.log(profile);
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Your Profile</Text>
            <View style={styles.info}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Image source={{uri: profile.avatarUrl}} style={styles.avatarImage}/>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => getPermissionAsync()} style={styles.links}>
                        <Text style={styles.linkText}>Update Photo </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.fullName}>
                    <Text style={styles.textValues}>{profile.firstName} {profile.lastName}</Text>
                    <Text style={styles.textValues}>{profile.email}</Text>
                </View>
            </View>

        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 14,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    title: {
        color: '#4A4848',
        fontFamily: 'montserratBold',
        fontSize: 15,
        marginHorizontal: 27,
        marginTop: 30
    },
    fullName: {
        marginLeft: 45,
    },
    textValues: {
        fontFamily: 'montserratMed',
        color: '#000',
        marginTop: 7
    },
    links: {
        height: 20,
        marginTop: 20,
    },
    linkText:{
        color: '#39A298',
        fontFamily: 'montserratMed',
    },
    avatar: {
        width: 66,
        height: 66,
        borderRadius: 66/2,
        backgroundColor: "#C4C4C4",
        marginTop: 44,

    },
    avatarImage: {
        width: 66,
        height: 66,
        borderRadius: 66/2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
Home.defaultProps ={
    profile: {
        avatarUrl: '',
        firstName: '',
        lastName: '',
        email: ''
    }
};
export default Home;
