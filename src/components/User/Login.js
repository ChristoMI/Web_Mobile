import React from 'react';
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

const Login = ({navigation, submit, loginGoogle}) => {
    const {type} = useSelector(state => state.user);
    const signIn = (values, actions) => {
        submit(values);
    };
    return (
        <KeyboardAvoidingView style={styles.containerWrapper}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../../assets/Logo.png')}/>
                    <Text style={styles.logo_text}>BOOKING</Text>
                    <Text style={styles.title}>Sign in</Text>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .trim()
                                .email('Invalid Email')
                                .required('Required email'),
                            password: Yup.string()
                                .required('Required password'),
                        })}
                        onSubmit={(values, actions) => {
                            signIn(values, actions)
                        }}>
                        {props => (
                            <View>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    onChangeText={props.handleChange('email')}
                                    onBlur={props.handleBlur('email')}
                                    value={props.values.email}
                                    placeholder="Email Address"
                                    style={styles.input}
                                    autoCapitalize='none'
                                />
                                {props.touched.email && props.errors.email ? (
                                    <Text style={styles.error}>{props.errors.email}</Text>
                                ) : null}
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    onChangeText={props.handleChange('password')}
                                    onBlur={props.handleBlur('password')}
                                    value={props.values.password}
                                    placeholder="Password"
                                    style={styles.input}
                                    secureTextEntry
                                />
                                {props.touched.password && props.errors.password ? (
                                    <Text style={styles.error}>{props.errors.password}</Text>
                                ) : null}
                                <Button
                                    onPress={props.handleSubmit}
                                    color="#009688"
                                    mode="contained"
                                    loading={props.isSubmitting}
                                    disabled={props.isSubmitting}
                                    style={styles.button}>
                                    <Text style={{lineHeight: 30}}>Sign in</Text>
                                </Button>
                            </View>
                        )}
                    </Formik>
                    {
                        type === 'customer' ?   <Button
                            color="#009688"
                            mode="contained"
                            style={[styles.button, styles.google]}
                            onPress={loginGoogle}>
                            <Text style={{lineHeight: 30}}>Sign in with google</Text>
                        </Button> : null
                    }

                    <View style={styles.userActions}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.question}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.question}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
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
export default Login;
