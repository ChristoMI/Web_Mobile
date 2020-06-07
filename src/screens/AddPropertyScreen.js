import React, {useEffect} from 'react';
import Register from "../components/Register/Register";
import {addProperty} from "../redux/property/actions";
import AddProperty from "../components/Property/AddProperty";
import {useDispatch, useSelector} from "react-redux";
import Error from "../components/Common/Error";
import Loading from "../components/Common/Loading";
import {hideUserError} from "../redux/user/actions";

const AddPropertyScreen = ({route, navigation}) => {
    const {token, errors, isLoading} = useSelector(state => state.user);
    const {added, item} = useSelector(state => state.property);
    const dispatch = useDispatch();
    const submitAdd = (property, image) => dispatch(addProperty(property, image, token));

    if(errors) return <Error pressHandler={() => dispatch(hideUserError())}
                             message={errors.message} />;
    if(isLoading) return <Loading/>;
    if(added){
        navigation.navigate('Search', {
            screen: "Property",
            params: {property: item}
        })
    }
    return (
        <AddProperty add={submitAdd}/>
    );
};

export default AddPropertyScreen;
