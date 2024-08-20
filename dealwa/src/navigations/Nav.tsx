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
import SetAgentDetailsScreen from '../screens/_start/setAgentDetailsScreen/SetAgentDetailsScreen';
import SuccessScreen from '../screens/_start/successScreen/SuccessScreen';
import SelectPlanScreen from '../screens/_start/selectPlanScreen/SelectPlanScreen';
import PaiementScreen from '../screens/_start/paiementScreen/PaiementScreen';

export type RootStackParamList = {
    Home: undefined;
    Landing: undefined;
    Login: { type: string };
    ConfirmEmail: { email: string, type: string };
    CreatePswd: { email: string, type: string };
    SetDetails: { email: string, type: string, password: string };
    SetLanguages: { email: string, type: string };
    Landing2: { type: string };
    SetAgentDetails: { email: string, type: string };
    Success: { nextScreen: string };
    SelectPlan: undefined;
    Paiement: undefined;
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
            <Stack.Screen name="SetAgentDetails" component={SetAgentDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SelectPlan" component={SelectPlanScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Paiement" component={PaiementScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={BottomTabNav} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}