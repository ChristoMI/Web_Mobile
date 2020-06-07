import {ADD_PROPERTY, CANCEL_PROPERTY, CANCEL_PROPERTY_BOOKING, FETCH_PROPERTY, RESERVE_PROPERTY} from "./actionTypes";

export function fetchProperty(id){
    return {
        type: FETCH_PROPERTY,
        payload: id
    }
}
export function addProperty(property, image, token){

    return {
        type: ADD_PROPERTY,
        payload: {property, image, token}
    }
}
export function reserveProperty(token, bookingInfo){
    return {
        type: RESERVE_PROPERTY,
        payload: {token, bookingInfo}
    }
}
export function cancelBooking(id, token){
    return {
        type: CANCEL_PROPERTY_BOOKING,
        payload: {id, token}
    }
}
