import {all, call, put, takeLatest} from "redux-saga/effects";
import Api from '../../services/Api';
import {
    ADD_PROPERTY,
    ADD_PROPERTY_ERROR,
    ADD_PROPERTY_SUCCESS, CANCEL_PROPERTY_BOOKING, CANCEL_PROPERTY_BOOKING_ERROR, CANCEL_PROPERTY_BOOKING_SUCCESS,
    FETCH_PROPERTY,
    FETCH_PROPERTY_ERROR,
    FETCH_PROPERTY_SUCCESS,
    RESERVE_PROPERTY,
    RESERVE_PROPERTY_ERROR,
    RESERVE_PROPERTY_SUCCESS
} from "./actionTypes";

function* fetchProperty({payload}) {
    try {
        const response = yield call(Api.sendRequest, `/properties/${payload}`, `get`);
        yield put({type: FETCH_PROPERTY_SUCCESS, payload: response.data});
    } catch (e) {
        yield put({type: FETCH_PROPERTY_ERROR, payload: e});
    }
}

function* postProperty({payload}) {

    try {
        const {token, property, image} = payload;
        /*      property.opportunities = ["sona"];
              property.landmarks = [
                  {
                      name: "National mueseum",
                      distance : 5
                  }

              ];
              property.price = 100;
              property.totalRoomsNumber = 5;*/
        console.log(property);
        const data = {
            ...property,
            cover_image_base64: image,
            cover_image_file_name: 'newImage'
        };
        const res = yield call(Api.sendRequest,
            `/properties`,
            `post`,
            data,
            {"Authorization": `Bearer ${token}`});
        console.log(res);
        yield put({type: ADD_PROPERTY_SUCCESS, payload: res.data});
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        yield put({type: ADD_PROPERTY_ERROR, payload: e});
    }
}



export default function* propertySaga() {
    yield all([
        takeLatest(FETCH_PROPERTY, fetchProperty),
        takeLatest(ADD_PROPERTY, postProperty),
    ]);
}
