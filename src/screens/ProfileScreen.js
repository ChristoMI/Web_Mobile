import React from 'react';
import {Button, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {hideUserError, signOutUser} from "../redux/user/actions";
import {Loading} from "aws-amplify-react-native";
import Error from "../components/Common/Error";
import Profile from "../components/User/Profile/Home"
const ProfileScreen = ({navigation}) => {
    const {profile, isLoading, errors} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(hideUserError());
        dispatch(signOutUser());
    };
    if(isLoading) return <Loading/>;
    if(!profile) navigation.navigate('Login');
    if(errors) return  <Error/>;
    return (
        <Profile/>

    );
};

export default ProfileScreen;
