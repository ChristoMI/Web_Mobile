import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideUserError, signOutUser, updateAvatar} from "../redux/user/actions";
import Error from "../components/Common/Error";
import Profile from "../components/User/Profile/Home"
import Loading from "../components/Common/Loading";
import LoginScreen from "./LoginScreen";
const ProfileScreen = ({navigation}) => {
    console.log('inProfile');
    const {profile, isLoading, errors, type, token} = useSelector(state => state.user);
    useEffect(() => {
        if(!token){
            navigation.navigate('Login');
        }
    },[token]);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(signOutUser());
        dispatch(hideUserError());
        navigation.navigate('Login');
    };
    const updateUserAvatar = (image) => {
        dispatch(updateAvatar(image, type, token));
    };
    if(isLoading) return <Loading/>;
    if(errors) return <Error/>;
    if(profile && token) return (
        <Profile profile={profile} type={type} updateAvatar={updateUserAvatar} logout={logout} navigation={navigation}/>
        );
    else return <Loading/>;

};

export default ProfileScreen;
