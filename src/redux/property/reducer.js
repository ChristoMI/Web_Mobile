import {defaultState} from "../defaultState";
import {
    ADD_PROPERTY,
    ADD_PROPERTY_ERROR,
    ADD_PROPERTY_SUCCESS,
    CANCEL_PROPERTY_BOOKING,
    CANCEL_PROPERTY_BOOKING_ERROR,
    CANCEL_PROPERTY_BOOKING_SUCCESS,
    FETCH_PROPERTY,
    FETCH_PROPERTY_ERROR,
    FETCH_PROPERTY_SUCCESS,
    RESERVE_PROPERTY,
    Reserve_PROPERTY,
    RESERVE_PROPERTY_ERROR,
    RESERVE_PROPERTY_SUCCESS
} from "./actionTypes";
import produce from "immer";

export default function propertyReducer(state = defaultState.property, action) {
    console.log(action.type);
    return produce(state, draft => {
        switch (action.type) {
            case FETCH_PROPERTY: {
                draft.isLoading = true;
                break;
            }
            case FETCH_PROPERTY_SUCCESS: {
                draft.isLoading = false;
                draft.item = action.payload;
                draft.errors = null;
                break;
            }
            case FETCH_PROPERTY_ERROR: {
                draft.isLoading = false;
                draft.errors = action.payload;
                break;
            }
            case ADD_PROPERTY:{
                draft.isLoading = true;
                break;
            }
            case ADD_PROPERTY_SUCCESS:{
                draft.isLoading = false;
                draft.errors = null;
                draft.item = action.payload;
                draft.added = true;
                break;
            }
            case ADD_PROPERTY_ERROR:{
                draft.isLoading = false;
                draft.errors = action.payload;
                break;
            }


        }
    });

}
