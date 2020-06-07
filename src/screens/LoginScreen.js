import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from '@react-navigation/native';
import Login from '../components/User/Login';
import {hideUserError, setUserType, signInGoogle, signInUser} from "../redux/user/actions";
import Error from "../components/Common/Error";
import Loading from "../components/Common/Loading";
import * as AuthSession from 'expo-auth-session';
import {SIGN_IN_GOOGLE_ERROR} from "../redux/user/actionTypes";
import UserType from "../components/User/Type";
const LoginScreen = ({navigation}) => {
    console.log('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {token, errors, isLoading, type} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const submitLogin = ({email, password}) => {
        const username = email ? email.trim() : null;
        setUsername(username);
        setPassword(password);
        return dispatch(signInUser(username, password, type));
    };
    const setType = (type) => {
        dispatch(setUserType(type));
    };
    const loginGoogle = async () => {
        let redirectUrl = AuthSession.getRedirectUrl();

        let result =
            await AuthSession.startAsync({
                authUrl:
                    `https://booking-user-pool-domain-customer.auth.eu-central-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=CODE&client_id=5vpqdi2hlkvqjsjqd3gsama9c8&scope=email%20profile%20openid`
            });

        if (result.type !== 'success') {
            dispatch({type: SIGN_IN_GOOGLE_ERROR, payload: {message:'Login failed, please try again'}});
            return;
        }
        let accessToken = result.params.code;
        dispatch(signInGoogle(accessToken));
    };
    const loginBackHandler = () => {
        dispatch(hideUserError());
        navigation.navigate('Profile');
    };
    if(errors && errors.code === "UserNotConfirmedException"){
        dispatch(hideUserError());
         navigation.navigate('Profile', {
            screen: "Verification",
            params: {username, password}
        })
    }

    if(errors) return <Error pressHandler={() => loginBackHandler()}
                             message={errors.message} />;
    if(isLoading) return <Loading/>;
    if(token) {
        console.log('inToken');
        navigation.reset({
            index: 0,
            routes: [{ name: 'ProfileHome' }],
        });
    }
    if(type){
        return (
            <Login navigation={navigation} submit={submitLogin} loginGoogle={loginGoogle}/>
        );
    }
    return (<UserType setType={setType}/>);

};

export default LoginScreen;
