import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CalendarScreen from '../screens/_calendar/calendarScreen/CalendarScreen';
import AddEventScreen from '../screens/_calendar/addEventScreen/AddEventScreen';

export type CalendarNavParams = {
    Home: undefined;
    AddEvent: undefined;
};

const Stack = createStackNavigator<CalendarNavParams>();


export default function CalendarNav() {

    return (
        <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={CalendarScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddEvent" component={AddEventScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}