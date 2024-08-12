import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LandingScreen from '../screens/_start/landingScreen/LandingScreen';
import LoginScreen from '../screens/_start/loginScreen/LoginScreen';
import BottomTabNav from './BottomTabNav';
import LandingScreen2 from '../screens/_start/landingScreen2/LandingScreen2';
import ConfirmEmailScreen from '../screens/_start/confirmEmailScreen/ConfirmEmailScreen';
import CreatePswdScreen from '../screens/_start/createPswdScreen/CreatePswdScreen';
import SetDetailsScreen from '../screens/_start/setDetailsScreen/SetDetailsScreen';
import SetLanguagesScreen from '../screens/_start/setLanguagesScreen/SetLanguagesScreen';

export type RootStackParamList = {
    Home: undefined;
    Landing: undefined;
    Login: { type: string };
    ConfirmEmail: { email: string, type: string };
    CreatePswd: { email: string, type: string };
    SetDetails: { email: string, type: string, password: string };
    SetLanguages: { email: string, type: string };
    Landing2: { type: string };
};

const Stack = createStackNavigator<RootStackParamList>();

type NavProps = {
    screenToDisplay?: keyof RootStackParamList;
}

export default function Nav(props: NavProps) {


    return (
        <Stack.Navigator initialRouteName={props.screenToDisplay}>
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Landing2" component={LandingScreen2} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreatePswd" component={CreatePswdScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetDetails" component={SetDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetLanguages" component={SetLanguagesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={BottomTabNav} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}