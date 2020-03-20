import React from 'react';
import {Text, View, StyleSheet, TextInput, Alert, Image, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import { Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {signInUser} from "../../logic/user/actions";


class SignInScreen extends React.Component {
    signIn = function(values){
        this.props.signIn(values.email,values.password);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerWrapper}>
                <ScrollView>
                    <View style={styles.container}>
                        <Image style={styles.logo} source={require('../../../assets/Logo.png')}/>
                        <Text style={styles.logo_text}>BOOKING</Text>
                        <Text style={styles.title}>Sign in</Text>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid Email')
                                    .required('Required email'),
                                password: Yup.string()
                                    .required('Required password'),
                            })}
                            onSubmit={(values, formikActions) => {
                                this.signIn(values)
                                console.log(values)
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
                                        autoFocus
                                        onSubmitEditing={() => {
                                            this.passwordInput.focus()
                                        }}
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
                                        ref={el => this.passwordInput = el}
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
                        <Text style={styles.question}>Don’t have any account yet?</Text>
                        <Text style={styles.question} onPress={()=>this.props.navigation.navigate('SignUpScreenFirst')}>Sign up</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signIn(login,password) {
            dispatch(signInUser(login,password));

        }
    };
}

export default connect(
    mapDispatchToProps
)(SignInScreen);

const styles = StyleSheet.create({
    containerWrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        paddingTop: 50,
        paddingBottom:10,
    },
    logo:{
        height: 100,
        width: 100,
    },
    logo_text:{
        color: '#575757',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'montserratMed',
    },
    title: {
        margin: 24,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'montserratBold',
        color:'#181818'
    },
    error: {
        marginTop:5,
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
    label:{
        fontSize: 13,
        fontWeight: 'normal',
        marginTop: 15,
        color:'#181818',
        fontFamily: 'montserratBold',

    },
    button:{
        borderRadius: 5,
        marginBottom: 30,
        marginTop: 20,
        fontFamily: 'montserratBold',
    },
    question:{
        color: '#009688',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'montserratMed',
        lineHeight: 16,
    }
});