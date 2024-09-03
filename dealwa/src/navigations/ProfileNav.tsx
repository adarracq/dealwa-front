import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screens/_profile/profileScreen/ProfileScreen';
import EditProfileScreen from '../screens/_profile/editProfileScreen/EditProfileScreen';
import User from '../models/User';
import EditAgentDetailsScreen from '../screens/_profile/editAgentDetailsScreen/EditAgentDetailsScreen';
import UserPublicProfileScreen from '../screens/_profile/userPublicProfileScreen/UserPublicProfileScreen';
import AgentPublicProfileScreen from '../screens/_profile/agentPublicProfileScreen/AgentPublicProfileScreen';

export type ProfileNavParams = {
    Home: undefined;
    PublicUser: { user: User };
    PublicAgent: { user: User };
    EditPerso: { user: User };
    EditAgent: { user: User };
};

const Stack = createStackNavigator<ProfileNavParams>();


export default function ProfileNav() {

    return (
        <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PublicUser" component={UserPublicProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PublicAgent" component={AgentPublicProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditPerso" component={EditProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditAgent" component={EditAgentDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}