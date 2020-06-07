import React, {useState} from 'react';
import Reserve from "../components/Property/Reserve";
import ReserveStepOne from "../components/Property/Reserve/ReserveStepOne";
import ReserveStepTwo from "../components/Property/Reserve/ReserveStepTwo";
import ReserveStepThree from "../components/Property/Reserve/ReserveStepThree";
import {useDispatch, useSelector} from "react-redux";
import {reserveProperty} from "../redux/property/actions";
import Error from "../components/Common/Error";
import Loading from "../components/Common/Loading";
import {hideUserError} from "../redux/user/actions";
import ReserveDone from "../components/Property/Reserve/ReserveDone";

const ReserveScreen = ({navigation, route}) => {
    const {item, reserved, isLoading, errors} = useSelector(state => state.property);
    const {token} = useSelector(state => state.user);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [bookCount, setBookCount] = useState(1);
    const [step, setStep] = useState(1);
    const changeStep = (toStep) => setStep(toStep);
    const dispatch = useDispatch();

    const submitStartDate = (date) => {
        setStartDate(date);
        setStep(2);
    };
    const submitEndDate = (date) => {
        setEndDate(date);
        setStep(3);
    };
    const submitBookCount = (count) => {
        setBookCount(count);
        const bookingInfo = {
            propertyId: item.id,
            bookedRoomsNumber: bookCount,
            beginDate: startDate,
            endDate: endDate,
        };
        dispatch(reserveProperty(token, bookingInfo));
        setStep(4);

    };
    const loginBackHandler = () => {
        dispatch(hideUserError());
        navigation.goBack();
    };
    if(errors) return <Error pressHandler={() => loginBackHandler()}
                             message={errors.message} />;
    if(isLoading) return <Loading/>;
    if(step === 1){
        return (
            <ReserveStepOne submitStartDate={submitStartDate}/>
        );
    }
    if(step === 2) return  <ReserveStepTwo submitEndDate={submitEndDate}/>;
    if(step === 3) return  <ReserveStepThree submitBooking={submitBookCount} />;
    if(step === 4) return  <ReserveDone startDate={startDate} endDate={endDate} booked={bookCount} navigation={navigation}/>

};

export default ReserveScreen;
