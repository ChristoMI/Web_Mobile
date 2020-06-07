import React, {useState} from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import {Button} from "react-native-paper";
import {useSelector} from "react-redux";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import ThemeButton from "../Common/ThemeButton";

const AddProperty = ({add}) => {
    const submit = (values) => {
        const property = {
            ...values
        };
        add(property, image);
    };
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
                quality: 1,
                base64: true
            });
            if (!result.cancelled) {
                setImage(result.base64);
            }
        } catch (E) {
            console.log(E);
        }
    };
    const [image, setImage] = useState(null);
    const [fields, setFields] = useState({
        name: "",
        description: "",
        cover_image_file_name: "",
        cover_image_base64: "",
        address: "",
        city: "",
        country: "",
        price: 0,
        totalRoomsNumber: 0
    });
    const [opportunities, setOpportunities] = useState([]);
    const [landmarks, setLandmarks] = useState([]);
    return (
        <KeyboardAvoidingView style={styles.containerWrapper}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.logo_text}>Add a property</Text>
                    <Text style={styles.title}>Add a property easily use Booking services.</Text>
                    <Formik
                        initialValues={{name: '', description: '', address:'', city: '', country: '', price:0, totalRoomsNumber:0}}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .trim()
                                .required('Required name'),
                            description: Yup.string()
                                .trim()
                                .required('Required description'),
                            address: Yup.string()
                                .trim()
                                .required('Required address'),
                            city: Yup.string()
                                .trim()
                                .required('Required city'),
                            country: Yup.string()
                                .trim()
                                .required('Required country'),
                            price: Yup.number()
                                .required('Required price'),
                            totalRoomsNumber: Yup.number()
                                .required('Required name'),
                        })}
                        onSubmit={(values, actions) => {
                            submit(values, actions)
                        }}>
                        {props => (
                            <View>
                                <Text style={styles.label}>Property Name</Text>
                                <TextInput
                                    onChangeText={props.handleChange('name')}
                                    onBlur={props.handleBlur('name')}
                                    value={props.values.name}
                                    placeholder="your property name"
                                    style={styles.input}
                                    autoCapitalize='none'
                                />
                                {props.touched.name && props.errors.name ? (
                                    <Text style={styles.error}>{props.errors.name}</Text>
                                ) : null}
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    onChangeText={props.handleChange('description')}
                                    onBlur={props.handleBlur('description')}
                                    value={props.values.description}
                                    placeholder="your property description"
                                    style={styles.input}
                                    autoCapitalize='none'
                                />
                                {props.touched.description && props.errors.description ? (
                                    <Text style={styles.error}>{props.errors.description}</Text>
                                ) : null}
                                <Text style={styles.label}>Address</Text>
                                <TextInput
                                    onChangeText={props.handleChange('address')}
                                    onBlur={props.handleBlur('address')}
                                    value={props.values.address}
                                    placeholder="your property address"
                                    style={styles.input}
                                    autoCapitalize='none'
                                />
                                {props.touched.address && props.errors.address ? (
                                    <Text style={styles.error}>{props.errors.address}</Text>
                                ) : null}
                                <Text style={styles.label}>City</Text>
                                <TextInput
                                    onChangeText={props.handleChange('city')}
                                    onBlur={props.handleBlur('city')}
                                    value={props.values.city}
                                    placeholder="your property city"
                                    style={styles.input}
                                    autoCapitalize='none'
                                />
                                {props.touched.city && props.errors.city ? (
                                    <Text style={styles.error}>{props.errors.city}</Text>
                                ) : null}
                                <Text style={styles.label}>Country</Text>
                                <TextInput
                                    onChangeText={props.handleChange('country')}
                                    onBlur={props.handleBlur('country')}
                                    value={props.values.country}
                                    placeholder="your property country"
                                    style={styles.input}
                                    autoCapitalize='none'
                                />
                                {props.touched.country && props.errors.country ? (
                                    <Text style={styles.error}>{props.errors.country}</Text>
                                ) : null}
                                <Text style={styles.label}>Price</Text>
                                <TextInput
                                    onChangeText={props.handleChange('price')}
                                    onBlur={props.handleBlur('price')}
                                    value={props.values.price}
                                    placeholder="your property price"
                                    style={styles.input}
                                    autoCapitalize='none'
                                />
                                {props.touched.price && props.errors.price ? (
                                    <Text style={styles.error}>{props.errors.price}</Text>
                                ) : null}
                                <Text style={styles.label}>Number of rooms</Text>
                                <TextInput
                                    onChangeText={props.handleChange('totalRoomsNumber')}
                                    onBlur={props.handleBlur('totalRoomsNumber')}
                                    value={props.values.totalRoomsNumber}
                                    placeholder="your property totalRoomsNumber"
                                    style={styles.input}
                                    autoCapitalize='none'
                                />
                                {props.touched.totalRoomsNumber && props.errors.totalRoomsNumber ? (
                                    <Text style={styles.error}>{props.errors.totalRoomsNumber}</Text>
                                ) : null}
                                <Text style={styles.label}>Property Image</Text>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => _pickImage()} style={styles.links}>
                                    <Text style={styles.logout}>Pick an image</Text>
                                </TouchableOpacity>
                                <Button
                                    onPress={props.handleSubmit}
                                    color="#009688"
                                    mode="contained"
                                    loading={props.isSubmitting}
                                    disabled={props.isSubmitting}
                                    style={styles.button}>
                                    <Text style={{lineHeight: 30}}>Add Property</Text>
                                </Button>
                            </View>
                        )}
                    </Formik>




                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    containerWrapper: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 10,
    },
    logo: {
        height: 100,
        width: 100,
    },
    links: {
        height: 20,
        marginTop: 20,
    },
    linkText:{
        color: '#39A298',
        fontFamily: 'montserratMed',


    },
    logout:{
        color: '#39A298',
        fontFamily: 'montserratMed',
        marginHorizontal: 27,
        textAlign: 'center'
    },
    logo_text: {
        color: '#575757',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'montserratMed',
    },
    google: {
        width: 280,
        backgroundColor: '#009688',
        fontFamily: 'montserratBold',
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    title: {
        margin: 10,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'montserratBold',
        color: '#181818'
    },
    error: {
        marginTop: 5,
        fontSize: 10,
        color: '#FE6A6A',
        fontFamily: 'montserratBold',
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
    question: {
        color: '#009688',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'montserratMed',
        lineHeight: 16,
    },
    userActions: {flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 10}
});
export default AddProperty;
