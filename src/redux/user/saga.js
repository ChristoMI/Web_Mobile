import {all, call, put, takeLatest, delay} from "redux-saga/effects";
import {
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_IN_FORGOT,
    SIGN_IN_FORGOT_ERROR,
    SIGN_IN_FORGOT_SUCCESS,
    SIGN_IN_GOOGLE,
    SIGN_IN_GOOGLE_ERROR,
    SIGN_IN_GOOGLE_SUCCESS,
    SIGN_IN_SUCCESS, SIGN_OUT, SIGN_OUT_ERROR, SIGN_OUT_SUCCESS,
    SIGN_UP,
    SIGN_UP_ERROR,
    SIGN_UP_FIRST_STEP,
    SIGN_UP_FIRST_STEP_ERROR,
    SIGN_UP_FIRST_STEP_SUCCESS, SIGN_UP_RESEND_CODE, SIGN_UP_RESEND_CODE_ERROR, SIGN_UP_RESEND_CODE_SUCCESS,
    SIGN_UP_SUCCESS,
    SIGN_UP_VERIFY,
    SIGN_UP_VERIFY_ERROR, SIGN_UP_VERIFY_SIGN_IN, SIGN_UP_VERIFY_SIGN_IN_ERROR,
    SIGN_UP_VERIFY_SUCCESS
} from "./actionTypes";
import Amplify, {Auth} from "aws-amplify";
import Api from '../../services/Api';
import awsconfig from "../../../aws-exports";
import * as Google from "expo-google-app-auth";
import axios from "axios";


function* signIn({payload}) {
    const {email: username, password, type} = payload;
    try {
        const response = yield call([Auth, 'signIn'], username, password);
        if(response.code && response.message) //Sign up error response
            yield put({type: SIGN_IN_ERROR, payload: {message: response.message}});
        else {
            const token = response.signInUserSession.idToken.jwtToken;
            const url = type === 'host' ? 'hosts/profile' : 'customers/profile';
            const currentSession = yield call(
                Api.sendRequest,
                url,
                'get',
                null,
                {"Authorization" : `Bearer ${token}`}
            );
            const {data: profile} = currentSession;
            yield put({ type: SIGN_IN_SUCCESS, payload: {profile, token} });
        }
    } catch (err) {
        console.log(err);
        yield put({ type: SIGN_IN_ERROR, payload: err });
    }
}
function* singInGoogle({payload}){
    try{
        const {token} = payload;
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', '5vpqdi2hlkvqjsjqd3gsama9c8');
        params.append('code', token);
        params.append('redirect_uri', 'https://auth.expo.io/@bbehrang/Bookingdesc');

        const response = yield call(() => axios({
            method: 'post',
            url: `https://booking-user-pool-domain-customer.auth.eu-central-1.amazoncognito.com/oauth2/token`,
            data: params,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }));
        const {id_token} = response.data;
        const currentSession = yield call(
            Api.sendRequest,
            'customers/profile',
            'get',
            null,
            {"Authorization" : `Bearer ${id_token}`}
        );
        const {data: profile} = currentSession;
        yield put({ type: SIGN_IN_GOOGLE_SUCCESS, payload: {profile, token: id_token} });
    } catch (e) {
         console.log(e);
        yield put({type: SIGN_IN_GOOGLE_ERROR, payload: e});
     }

}
function* signUp({payload}) {
    try {
        const {fields} = payload;
        const {email, given_name, family_name, password} = fields;
        const response = yield call(
            [Auth, 'signUp'],
            {
                username: email,
                password,
                attributes:{
                    email,
                    given_name,
                    family_name,
                }
            });
        if(response.code && response.message) //Sign up error response
            yield put({type: SIGN_UP_FIRST_STEP_ERROR, payload: {message: response.message}});
        else yield put({type: SIGN_UP_FIRST_STEP_SUCCESS, payload: response});
    } catch (e) {
        console.log(e);
        yield put({type: SIGN_UP_FIRST_STEP_ERROR, payload: e});
    }
}
function* signOut() {
    try{
        const response = yield call([Auth, 'signOut'], {global: true});
        yield put({type: SIGN_OUT_SUCCESS});
    } catch (e) {
        console.log(e);
        yield put({type: SIGN_OUT_ERROR, payload: e});
    }

}
function* verify({payload}){
    const {username, code} = payload;
    try{
        const response = yield call([Auth, 'confirmSignUp'], username, code);
        if(response.code && response.message) //Sign up error response
            yield put({type: SIGN_UP_VERIFY_ERROR, payload: {message: response.message}});
        else yield put({type: SIGN_UP_VERIFY_SUCCESS, payload: response});
    } catch (e) {
        console.log(e);
        yield put({type: SIGN_UP_VERIFY_ERROR, payload: e});
    }
}
function* recoverPassword({payload}) {
    const {username} = payload;
    try{
        const response = yield call([Auth, 'forgotPassword'], username);
        if(response.code && response.message) //Sign up error response
            yield put({type: SIGN_UP_RESEND_CODE_ERROR, payload: {message: response.message}});
        else
            yield put({type: SIGN_UP_RESEND_CODE_SUCCESS, payload: response});
    } catch (e) {
        console.log(e);
        yield put({type: SIGN_UP_RESEND_CODE_ERROR, payload: e});
    }

}
function* resendCode({payload}){
    const {username} = payload;
    yield delay(2000); //Help user understand that resend is in progress
    try{
        const response = yield call([Auth, 'resendSignUp'], username);
        if(response.code && response.message) //Sign up error response
            yield put({type: SIGN_UP_RESEND_CODE_ERROR, payload: {message: response.message}});
        else
            yield put({type: SIGN_UP_RESEND_CODE_SUCCESS, payload: response});
    } catch (e) {
        console.log(e);
        yield put({type: SIGN_UP_RESEND_CODE_ERROR, payload: e});
    }
}
function* verifyAndLogin({payload}){
    const {username, password, code, type} = payload;
    try {
        const confirmResponse = yield call([Auth, 'confirmSignUp'], username, code);
        if (confirmResponse.code && confirmResponse.message) //Sign up error response
            yield put({type: SIGN_UP_VERIFY_ERROR, payload: {message: confirmResponse.message}});
        else {
            const response = yield call([Auth, 'signIn'], username, password);
            if (response.code && response.message) //Sign up error response
                yield put({type: SIGN_IN_ERROR, payload: {message: response.message}});
            else {
                const token = response.signInUserSession.idToken.jwtToken;
                const url = type === 'host' ? 'hosts/profile' : 'customers/profile';
                const currentSession = yield call(
                    Api.sendRequest,
                    url,
                    'get',
                    null,
                    {"Authorization": `Bearer ${token}`}
                );
                const {data: profile} = currentSession;
                yield put({type: SIGN_IN_SUCCESS, payload: {profile, token}});
            }
        }
    }catch (e) {
        yield put({type: SIGN_IN_ERROR, payload: e});
    }
}
export default function* userSaga() {
    yield all([
        takeLatest(SIGN_IN, signIn),
        takeLatest(SIGN_IN_GOOGLE, singInGoogle),
        takeLatest(SIGN_UP_FIRST_STEP, signUp),
        takeLatest(SIGN_OUT, signOut),
        takeLatest(SIGN_UP_VERIFY, verify),
        takeLatest(SIGN_IN_FORGOT, recoverPassword),
        takeLatest(SIGN_UP_RESEND_CODE, resendCode),
        takeLatest(SIGN_UP_VERIFY_SIGN_IN, verifyAndLogin)
    ]);
}
