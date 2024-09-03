import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ChatScreen from '../screens/_message/chatScreen/ChatScreen';
import MessagesScreen from '../screens/_message/messagesScreen/MessagesScreen';

export type MessagesNavParams = {
    Home: undefined;
    Chat: { id: number };
};

const Stack = createStackNavigator<MessagesNavParams>();


export default function MessagesNav() {

    return (
        <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={MessagesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}