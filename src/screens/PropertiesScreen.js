import React, {useEffect} from 'react';
import Properties from '../components/Properties/List';
import {useDispatch, useSelector} from "react-redux";
import {fetchProperties} from "../redux/properties/actions";
import Loading from "../components/Common/Loading";
import Error from "../components/Common/Error";
const PropertiesScreen = ({navigation}) => {
    const {items, isLoading, errors, added} = useSelector(state => state.properties);
    const dispatch = useDispatch();

    useEffect(() => {
        items.length === 0 ? dispatch(fetchProperties()) : null;
    });
    const openProperty = (item) => {
        navigation.navigate('Search', {
            screen: "Property",
            params: {property: item}
        })
    };
    if(isLoading) return <Loading/>;
    if(errors) return <Error/>;
    return (
        <Properties properties={items}
                    navigation={navigation}
                    openProperty = {openProperty}/>
    );
};

export default PropertiesScreen;
