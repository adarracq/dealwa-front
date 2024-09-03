import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AgentMapScreen from '../screens/_map/agentMapScreen/AgentMapScreen';
import UserMapScreen from '../screens/_map/userMapScreen/UserMapScreen';

export type UserMapNavParams = {
    Home: undefined;
};

const Stack = createStackNavigator<UserMapNavParams>();


export default function UserMapNav() {

    return (
        <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={UserMapScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}