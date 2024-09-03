import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ShopScreen from '../screens/_agent/shopScreen/ShopScreen';

export type ShopNavParams = {
    Home: undefined;
};

const Stack = createStackNavigator<ShopNavParams>();


export default function ShopNav() {

    return (
        <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={ShopScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}