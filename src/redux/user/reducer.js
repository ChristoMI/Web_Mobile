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
    UPDATE_USER_IMAGE, UPDATE_USER_IMAGE_SUCCESS, UPDATE_USER_IMAGE_ERROR,

} from "./actionTypes";
import produce from "immer";

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
                break;
            }
            case SIGN_OUT_ERROR: {
                draft.isLoading = false;
                draft.token = null;
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
                draft.isLoading = false;
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
            case SET_USER_ERROR:{
                draft.errors = action.payload;
                break;
            }
            case SET_USER_TYPE:{
                const {type} = action.payload;
                draft.type = type;
                break;
            }
        }
    });
}
