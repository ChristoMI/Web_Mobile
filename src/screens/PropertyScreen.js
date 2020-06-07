import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProperty} from '../redux/property/actions';
import PropertyKeyboardView from "../components/Property/PropertyKeyboardView";
import Loading from "../components/Common/Loading";
import {fetchPropertyComments} from "../redux/comments/actions";
import Error from "../components/Common/Error";
import {KeyboardAvoidingView} from "react-native";
import Property from "../components/Property/Property";
import {HIDE_USER_ERROR} from "../redux/user/actionTypes";
import {HIDE_COMMENT_ERROR} from "../redux/comments/actionTypes";

const PropertyScreen = ({navigation, route}) => {
    const {property} = route.params;
    const {id} = property;
    const {isLoading, errors, item} = useSelector(state => state.property);
    const comments = useSelector(state => state.comments);
    const dispatch = useDispatch();
    useEffect(() => {
        if(item){
            if ((item.id !== id) || errors || comments.errors) {
                dispatch(fetchProperty(id));
                dispatch(fetchPropertyComments(id));
            }
        }
        else {
            dispatch(fetchProperty(id));
            dispatch(fetchPropertyComments(id));
        }
    }, [id]);

    const propertyErrorBack = () => (navigation.navigate('Search'));
    const commentErrorBack = (error) => {
        dispatch({type: HIDE_COMMENT_ERROR});
        if(error.status === 401)   navigation.navigate('Search', {
            screen: "Property",
            params: {property: item}
        });
        else navigation.goBack();
    };

    if ((item && (item.id !== id)) || isLoading) { //prevents property screen flicker before loading a new one
        return <Loading/>;
    }
    if (errors) // property errors
        return <Error message={errors ? errors.message : null} pressHandler={propertyErrorBack}/>;
    if(comments && comments.errors) //
        return <Error message={comments.errors ? comments.errors.message : null}
                      pressHandler={()=> commentErrorBack(comments.errors)}/>;
    return (
        <KeyboardAvoidingView behavior={"height"} enabled>
            <Property property={item} comments={comments} navigation={navigation}/>
        </KeyboardAvoidingView>
    );
};

export default PropertyScreen;
