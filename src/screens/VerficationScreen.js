import React, {useEffect} from 'react';
import {Text} from "react-native";
import RegisterThirdStep from "../components/User/Register/RegisterThirdStep";
import {hideUserError, resendVerificationCode, verifyAndLoginUser } from "../redux/user/actions";
import {useDispatch, useSelector} from "react-redux";

import Error from "../components/Common/Error";
import Loading from "../components/Common/Loading";

const VerficationScreen = ({navigation, route}) => {
    const {token, errors, isLoading, profile, type} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {username, password} = route.params;
    const verify = ({code}) => {
        dispatch(verifyAndLoginUser(username, password, code, type));
    };
    const resendCode = () => {
        return dispatch(resendVerificationCode(username));
    };
    if(isLoading) return <Loading/>;
    if(errors) return <Error message={errors.message} pressHandler={() => dispatch(hideUserError())} />;
    if(token) navigation.navigate("ProfileHome");
    return (
        <RegisterThirdStep verify={verify} resendCode={resendCode} />
    );
};

export default VerficationScreen;
