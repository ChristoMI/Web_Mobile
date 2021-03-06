import {
    FETCH_USER_RESERVATIONS,
    HIDE_USER_ERROR, SET_USER_ERROR, SET_USER_TYPE,
    SIGN_IN, SIGN_IN_FORGOT, SIGN_IN_GOOGLE,
    SIGN_OUT,
    SIGN_UP,
    SIGN_UP_FIRST_STEP,
    SIGN_UP_RESEND_CODE,
    SIGN_UP_VERIFY, SIGN_UP_VERIFY_SIGN_IN, UPDATE_USER, UPDATE_USER_IMAGE
} from "./actionTypes";

export function signInUser(email,password, type) {
    return {
        type: SIGN_IN,
        payload: { email, password, type }
    };
}
export function signInGoogle(token) {
    return {
        type: SIGN_IN_GOOGLE,
        payload: {token}
    };
}

export function signOutUser() {
    return {
        type: SIGN_OUT
    };
}

export function hideUserError() {
    return {
        type: HIDE_USER_ERROR
    }
}
export function setUserError(error) {
    return {
        type: SET_USER_ERROR,
        payload: error
    }
}
export function signUpUser(fields) {
    return {
        type: SIGN_UP_FIRST_STEP,
        payload: { fields }
    };
}
export function verifyUser(username, code) {
    return {
        type: SIGN_UP_VERIFY,
        payload: {username, code}
    };
}
export function verifyAndLoginUser(username,password, code, type) {
    return {
        type: SIGN_UP_VERIFY_SIGN_IN,
        payload: {username, password, code, type}
    };
}
export function resendVerificationCode(username){
    return {
        type: SIGN_UP_RESEND_CODE,
        payload: {username}
    };
}
export function updateUser(arr){
    return{
        type: UPDATE_USER,
        payload:{arr}
    }
}
export function recoverPassword(username){
    return {
        type: SIGN_IN_FORGOT,
        payload: {username}
    }
}
export function setUserType(type){
    return {
        type: SET_USER_TYPE,
        payload: {type}
    }
}
export function updateAvatar(image, type, token){
    return {
        type: UPDATE_USER_IMAGE,
        payload: {image, type, token}
    }
}
export function getUserReservations(token){
    return {
        type : FETCH_USER_RESERVATIONS,
        payload: {token}
    }
}
