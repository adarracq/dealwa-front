import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AgentMapScreen from '../screens/_map/agentMapScreen/AgentMapScreen';
import Project from '../models/Project';
import ProjectViewScreen from '../screens/_map/ProjectViewScreen/ProjectViewScreen';
import AgentMapScreen2 from '../screens/_map/agentMapScreen2/AgentMapScreen2';

export type AgentMapNavParams = {
    HomeAgentMap: undefined;
    HomeAgentMap2: undefined;
    Project: { project: Project };
};

const Stack = createStackNavigator<AgentMapNavParams>();


export default function AgentMapNav() {

    return (
        <Stack.Navigator initialRouteName={'HomeAgentMap2'}>
            <Stack.Screen name="HomeAgentMap" component={AgentMapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeAgentMap2" component={AgentMapScreen2} options={{ headerShown: false }} />
            <Stack.Screen name="Project" component={ProjectViewScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}