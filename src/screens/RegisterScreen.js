import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import RegisterFirstStep from '../components/User/Register/RegisterFirstStep';
import {hideUserError, resendVerificationCode, signInUser, signUpUser, verifyUser} from "../redux/user/actions";
import RegisterSecondStep from "../components/User/Register/RegisterSecondStep";
import RegisterThirdStep from "../components/User/Register/RegisterThirdStep";
import Loading from "../components/Common/Loading";
import Error from "../components/Common/Error";
import RegisterSuccess from "../components/User/Register/RegisterSuccess";

const Register = ({navigation}) => {
    const {token, isLoading, errors, type} = useSelector(state => state.user);
    const [step, setStep] = useState(1);
    const [fields, setFields] = useState({
        email: '',
        given_name: '',
        family_name: '',
    });
    const [regPassword, setPassword] = useState('');
    const dispatch = useDispatch();
    const submitFirstStep = (values) => {
        const {email, given_name, family_name} = values;
        setFields({
            email, given_name, family_name
        });
        setStep(2);
    };
    const goToStep = (step) => {
        setStep(step)
    };
    const submit = ({password}) => {
        setPassword(password);
        setStep(3);
        dispatch(signUpUser({...fields, password}));
    };
    const verify = ({code}) => {
        dispatch(verifyUser(fields.email, code));
        setStep(4);

    };
    const resendCode = () => {
        return dispatch(resendVerificationCode(fields.email));
    };
    const hideError = () => {
        setStep(step - 1);
        return dispatch(hideUserError());
    };
    const login = () => {
        dispatch(signInUser(fields.email, regPassword, type));
        navigation.navigate('Profile', {screen: "ProfileHome"});
    };
    if (errors) return <Error message={errors.message}
                              pressHandler={hideError}/>;
    if (isLoading) return <Loading/>;
    else {
        if (step === 1)
            return (
                <RegisterFirstStep navigation={navigation}
                                   submitFirstStep={submitFirstStep}
                                   setStep={setStep}
                                   fields={fields}
                />
            );
        else if (step === 2) return <RegisterSecondStep submit={submit} navigation={navigation} goToStep={goToStep}/>;
        else if (step === 3) return <RegisterThirdStep verify={verify} resendCode={resendCode}
                                                       navigation={navigation}/>;
        else if (step === 4) return <RegisterSuccess login={login}/>;
        else return null; //@TODO
    }


};

export default Register;
