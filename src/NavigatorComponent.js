import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import PropertiesScreen from "./screens/PropertiesScreen";
import PropertyScreen from "./screens/PropertyScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import VerificationScreen from "./screens/VerficationScreen";
import {useSelector} from "react-redux";
import Amplify, { Auth } from 'aws-amplify';

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const PropertyStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const PropertiesNavigator = () => {
    return (
        <PropertyStack.Navigator initialRouteName="Properties" headerMode='none'>
            <PropertyStack.Screen name="Properties" component={PropertiesScreen}/>
            <PropertyStack.Screen name="Property" component={PropertyScreen}/>
        </PropertyStack.Navigator>
    );
};
const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator initialRouteName="Login" headerMode='none'>
            <ProfileStack.Screen name="Login" component={LoginScreen}/>
            <ProfileStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <ProfileStack.Screen name="Register" component={RegisterScreen}/>
            <ProfileStack.Screen name="ProfileHome" component={ProfileScreen}/>
            <ProfileStack.Screen name="Verification" component={VerificationScreen}/>
        </ProfileStack.Navigator>
    );
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Search') {
                        iconName = 'ios-search'
                    } else if (route.name === 'Reservations') {
                        iconName = 'ios-calendar'
                    } else if (route.name === 'Profile') {
                        iconName = 'ios-person'
                    } else if (route.name === 'More') {
                        iconName = 'ios-more'
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: '#303030',
                style: {backgroundColor: '#39A298', borderTopColor: 'white'},
                keyboardHidesTabBar: true,
            }}
        >
            <Tab.Screen name="Search" component={PropertiesNavigator}/>
            <Tab.Screen name="Reservations" component={PropertiesScreen}/>
            <Tab.Screen name="Profile" component={ProfileNavigator}/>
            <Tab.Screen name="More" component={ProfileScreen}/>
        </Tab.Navigator>
    )
};


const NavigatorComponent = (props) => {
    const {type} = useSelector(state => state.user);
    console.log(type);
    if(type){
        if(type === 'customer'){
            Auth.configure(Amplify.configure({
                Auth: {
                    userPoolId: 'eu-central-1_sXobUjqVh',
                    userPoolWebClientId: "5vpqdi2hlkvqjsjqd3gsama9c8",
                    region: 'eu-central-1'
                }
            }));

        }
        else if(type === 'host'){
            Auth.configure(Amplify.configure({
                Auth: {
                    userPoolId: 'eu-central-1_pPGEanitH',
                    userPoolWebClientId: "4o98dleg8r6uqi1g09ctoua1cg",
                    region: 'eu-central-1'
                }
            }));
        }
    }
    return (
        <NavigationContainer>
            <AppStack.Navigator initialRouteName="SignInScreen" headerMode='none'>
                {
                    <AppStack.Screen
                        name="HomeNav"
                        component={BottomTabNavigator}/>

                }
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default NavigatorComponent;


