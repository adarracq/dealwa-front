import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AgentMapScreen from '../screens/_map/agentMapScreen/AgentMapScreen';
import Project from '../models/Project';
import ProjectViewScreen from '../screens/_map/ProjectViewScreen/ProjectViewScreen';

export type AgentMapNavParams = {
    Home: undefined;
    Project: { project: Project };
};

const Stack = createStackNavigator<AgentMapNavParams>();


export default function AgentMapNav() {

    return (
        <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={AgentMapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Project" component={ProjectViewScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}