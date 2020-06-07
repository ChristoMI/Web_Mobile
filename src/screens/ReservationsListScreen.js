import React, {useEffect} from 'react';
import Reservations from "../components/User/Profile/Reservations";
import {useDispatch, useSelector} from "react-redux";
import Error from "../components/Common/Error";
import Loading from "../components/Common/Loading";
import {getUserReservations, hideUserError} from "../redux/user/actions";
import {fetchProperties} from "../redux/properties/actions";
import {cancelBooking} from "../redux/property/actions";
import Text from "react-native-paper/src/components/Typography/Text";

const ReservationsListScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const {token, isLoading, errors, reservations} = useSelector(state => state.user);

    const {items} = useSelector(state => state.properties);
    const loginBackHandler = () => {
        dispatch(hideUserError());
        navigation.navigate('Reservations');
    };
    const cancel = (id) => {
        console.log('canceling', id);
        dispatch(cancelBooking(id, token));
    };
    useEffect(() => {
        if(token){
            dispatch(getUserReservations(token));
        }
    }, [token]);
    if(errors) return <Error pressHandler={() => loginBackHandler()}
                             message={errors.message} />;
    if(isLoading) return <Loading/>;
    if(reservations){
        return (
            <Reservations reservations={reservations} items={items} cancel={cancel}/>
        );
    }
    else return <Loading/>
};

export default ReservationsListScreen;
