import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AgentMapNavParams } from '../../../navigations/AgentMapNav';
import { userService } from '../../../services/user.service';
import ProjectPresentation from '../../../components/organisms/ProjectPresentation';

type Props = NativeStackScreenProps<AgentMapNavParams, 'Project'>;

export default function ProjectViewScreen({ navigation, route }: Props) {

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