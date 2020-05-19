import React from 'react';
import {Button, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {hideUserError, signOutUser, updateAvatar} from "../redux/user/actions";
import {Loading} from "aws-amplify-react-native";
import Error from "../components/Common/Error";
import Profile from "../components/User/Profile/Home"
const ProfileScreen = ({navigation}) => {
    const {profile, isLoading, errors, type, token} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(hideUserError());
        dispatch(signOutUser());
    };
    const updateUserAvatar = (image) => {
        dispatch(updateAvatar(image, type, token));
    };
    if(isLoading) return <Loading/>;
    if(!profile) navigation.navigate('Login');
    if(errors) return  <Error/>;
    return (
        <Profile profile={profile} updateAvatar={updateUserAvatar} logout={logout}/>

    );
};

export default ProfileScreen;
