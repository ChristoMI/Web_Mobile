import {defaultState} from "../defaultState";
import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_OUT,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_ERROR,
    SIGN_UP_FIRST_STEP,
    SIGN_UP_FIRST_STEP_SUCCESS,
    SIGN_UP_FIRST_STEP_ERROR,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    SIGN_UP_VERIFY,
    SIGN_UP_VERIFY_SUCCESS,
    SIGN_UP_VERIFY_ERROR,
    HIDE_USER_ERROR,
    SIGN_IN_FORGOT,
    SIGN_IN_FORGOT_SUCCESS,
    SIGN_IN_FORGOT_ERROR,
    SIGN_IN_GOOGLE,
    SET_USER_ERROR,
    SIGN_IN_GOOGLE_SUCCESS,
    SIGN_IN_GOOGLE_ERROR,
    SIGN_UP_RESEND_CODE,
    SIGN_UP_RESEND_CODE_SUCCESS,
    SIGN_UP_RESEND_CODE_ERROR,
    SET_USER_TYPE,
    UPDATE_USER_IMAGE,
    UPDATE_USER_IMAGE_SUCCESS,
    UPDATE_USER_IMAGE_ERROR,
    FETCH_USER_RESERVATIONS,
    FETCH_USER_RESERVATIONS_SUCCESS, FETCH_USER_RESERVATIONS_ERROR,

} from "./actionTypes";
import produce from "immer";
import {
    CANCEL_PROPERTY_BOOKING,
    CANCEL_PROPERTY_BOOKING_ERROR,
    CANCEL_PROPERTY_BOOKING_SUCCESS, RESERVE_PROPERTY, RESERVE_PROPERTY_ERROR, RESERVE_PROPERTY_SUCCESS
} from "../property/actionTypes";

export default function userReducer(state = defaultState.user, action) {
    return produce(state, draft => {
        switch (action.type) {
            case SIGN_IN:{
                draft.isLoading = true;
                break;
            }
            case SIGN_IN_SUCCESS:{
                draft.isLoading = false;
                const { profile, token }  = action.payload;
                draft.profile = profile;
                draft.token = token;
                break;
            }
            case SIGN_IN_ERROR:{
                draft.isLoading = false;
                draft.errors = action.payload;
                break;
            }
            case SIGN_IN_GOOGLE:{
                draft.isLoading = true;
                break;
            }
            case SIGN_IN_GOOGLE_SUCCESS:{
                draft.isLoading = false;
                const {token, profile} = action.payload;
                draft.token = token;
                draft.profile = profile;
                break;
            }
            case SIGN_IN_GOOGLE_ERROR:{
                draft.isLoading = false;
                draft.errors = action.payload;
                break;
            }
            case SIGN_UP_FIRST_STEP:{
                draft.isLoading = true;
                break;
            }
            case SIGN_UP_FIRST_STEP_SUCCESS:{
                draft.isLoading = false;
                draft.errors = null;
                draft.profile = action.payload;
                break;
            }
            case SIGN_UP_FIRST_STEP_ERROR: {
                draft.isLoading = false;
                draft.errors = action.payload;
                break;
            }
            case SIGN_UP_VERIFY:{
                draft.isLoading = true;
                break;
            }
            case SIGN_UP_VERIFY_SUCCESS:{
                draft.isLoading = false;
                draft.errors = null;
                draft.profile = action.payload;
                break;
            }
            case SIGN_UP_VERIFY_ERROR: {
                draft.isLoading = false;
                draft.errors = action.payload;
                break;
            }
            case SIGN_IN_FORGOT:{
                draft.isLoading = true;
                break;
            }
            case SIGN_IN_FORGOT_SUCCESS:{
                draft.isLoading = false;
                draft.errors = null;
                draft.profile = action.payload;
                break;
            }
            case SIGN_IN_FORGOT_ERROR:{
                draft.isLoading = false;
                draft.errors = action.payload;
                break;
            }
            case SIGN_OUT:{
                draft.isLoading = true;
                break;
            }
            case SIGN_OUT_SUCCESS:{
                draft.isLoading = false;
                draft.token = null;
                draft.profile = null;
                draft.errors = null;
                draft.type = null;
                break;
            }
            case SIGN_OUT_ERROR: {
                draft.isLoading = false;
                draft.token = null;
                draft.errors = null;
                draft.profile = null;
                draft.type = null;
                break;
            }
            case SIGN_UP_RESEND_CODE:{
                draft.isLoading = true;
                break;
            }
            case SIGN_UP_RESEND_CODE_SUCCESS:{
                draft.errors = null;
                draft.isLoading = false;
                break;
            }
            case SIGN_UP_RESEND_CODE_ERROR:{
                draft.errors = action.payload;
                draft.isLoading = false;
                break;
            }
            case UPDATE_USER:{
                draft.isLoading = true;
                break;
            }
            case UPDATE_USER_IMAGE:{
                draft.errors = null;
                draft.isLoading = true;
                break;
            }
            case UPDATE_USER_IMAGE_SUCCESS:{
                draft.profile = action.payload;
                draft.errors = null;
                draft.isLoading = false;
                break;
            }
            case UPDATE_USER_IMAGE_ERROR: {
                draft.errors = null;
                draft.isLoading = false;
                break;
            }
            case HIDE_USER_ERROR: {
                draft.errors = null;
                break;
            }
            case SET_USER_ERROR:{
                draft.errors = action.payload;
                break;
            }
            case SET_USER_TYPE:{
                const {type} = action.payload;
                draft.type = type;
                break;
            }
            case FETCH_USER_RESERVATIONS:{
                draft.isLoading = true;
                break;
            }
            case FETCH_USER_RESERVATIONS_SUCCESS:{
                draft.errors = null;
                draft.isLoading = false;
                draft.reservations = action.payload;
                break;
            }
            case FETCH_USER_RESERVATIONS_ERROR:{
                draft.errors = action.payload;
                draft.isLoading = false;
                break;
            }
            case CANCEL_PROPERTY_BOOKING:{
                draft.isLoading = true;
                break;
            }
            case CANCEL_PROPERTY_BOOKING_SUCCESS:{
                draft.isLoading = false;
                draft.errors = null;
                draft.reservations = draft.reservations.filter(item => item.id !== action.payload.id);
                break;
            }
            case CANCEL_PROPERTY_BOOKING_ERROR:{
                draft.isLoading = false;
                draft.errors = action.payload;
                break;
            }
            case RESERVE_PROPERTY:{
                draft.isLoading = true;
                break;
            }
            case RESERVE_PROPERTY_SUCCESS:{
                draft.isLoading = false;
                draft.errors = null;
                draft.reservations.push(action.payload);
                break;
            }
            case RESERVE_PROPERTY_ERROR:{
                draft.isLoading = false;
                draft.errors = action.payload;
                break;
            }
        }
    });
}
