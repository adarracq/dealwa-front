import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProjectsNavParams } from '../../../navigations/ProjectsNav';
import Colors from '../../../constants/Colors';
import Title1 from '../../../components/atoms/Title1';
import { UserContext } from '../../../contexts/UserContext';
import { projectService } from '../../../services/project.service';
import SmallText from '../../../components/atoms/SmallText';
import IconButton from '../../../components/molecules/IconButton';
import BodyText from '../../../components/atoms/BodyText';
import { functions } from '../../../utils/Functions';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProjectPresentation from '../../../components/organisms/ProjectPresentation';
import { userService } from '../../../services/user.service';

type Props = NativeStackScreenProps<ProjectsNavParams, 'ProjectDetails'>;

export default function ProjectDetailsScreen({ navigation, route }: Props) {

    const [project, setProject] = useState(route.params.project);
    const [user, setUser] = useState(null);

    function getUser() {
        if (!project.user_id)
            return;
        userService.getUserById(project.user_id)
            .then((user) => {
                setUser(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {
        getUser();
    }, []);

    return user && (
        <ProjectPresentation
            project={project}
            user={user}
            onMessage={() => console.log('message')}
            onLike={() => console.log('like')}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})