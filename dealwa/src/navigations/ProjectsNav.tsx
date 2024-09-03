import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProjectsScreen from '../screens/_project/projectsScreen/ProjectsScreen';
import NewProjectScreen from '../screens/_project/newProjectScreen/NewProjectScreen';
import NewProjectLocationScreen from '../screens/_project/newProjectLocationScreen/NewProjectLocationScreen';
import Project from '../models/Project';
import ProjectDetailsScreen from '../screens/_project/projectDetailsScreen/ProjectDetailsScreen';
import EditProjectScreen from '../screens/_project/editProjectScreen/EditProjectScreen';

export type ProjectsNavParams = {
    Home: undefined;
    NewProject: undefined;
    NewProjectLocation: { type: number, description: string };
    ProjectDetails: { project: Project };
    EditProject: { project: Project };
};

const Stack = createStackNavigator<ProjectsNavParams>();


export default function ProjectsNav() {

    return (
        <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={ProjectsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewProject" component={NewProjectScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewProjectLocation" component={NewProjectLocationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProject" component={EditProjectScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}