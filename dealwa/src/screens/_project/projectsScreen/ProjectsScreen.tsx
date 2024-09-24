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
import Title2 from '../../../components/atoms/Title2';
import { useIsFocused } from '@react-navigation/native';
import Project from '../../../models/Project';

type Props = NativeStackScreenProps<ProjectsNavParams, 'Home'>;

export default function ProjectsScreen({ navigation, route }: Props) {

    const [userData, setUserData] = useContext(UserContext);
    const [projects, setProjects] = useState<Project[]>([]);
    const isFocused = useIsFocused();

    function getUserProjects() {
        projectService.getAllByUserId(userData._id)
            .then((response) => {
                setProjects(response);
            }).catch((error) => {
                console.log('error');
            });
    }

    function getColor(type: number) {
        if (type === 0) {
            return Colors.mainBlue;
        }
        else {
            return Colors.mainRed;
        }
    }

    useEffect(() => {
        if (userData)
            getUserProjects();
    }, [userData, isFocused]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 20 }}>
                <Title1 title="Vos projets" />
                {
                    projects.length === 0 ?
                        <SmallText text="Vous n'avez pas encore de projet, cliquer sur le bouton + ci-dessous pour en créer un." isLeft />
                        :
                        projects.map((project: any, index: number) => {
                            return (
                                <View key={index}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backgroundColor: getColor(project.type),
                                            //borderRadius: 16,
                                            padding: 16,
                                            alignItems: 'center',
                                            gap: 8,
                                            width: '100%',
                                            borderTopLeftRadius: 16,
                                            borderTopRightRadius: 16
                                        }}
                                    >
                                        <Title1
                                            title={project.type == 0 ? "Projet d'achat" : 'Projet de vente'}
                                            color={Colors.white}
                                        />
                                        <View style={styles.iconText}>
                                            <Image
                                                source={functions.getIconSource('marker')}
                                                style={styles.icons} />
                                            <BodyText
                                                text={project.address ? project.address : 'Adresse non renseignée'}
                                                color={Colors.white}
                                            />
                                        </View>
                                        <View style={styles.iconText}>
                                            <Image
                                                source={functions.getIconSource('clock')}
                                                style={styles.icons} />
                                            <SmallText
                                                text={functions.getStringDateDifference(project.date)}
                                                color={Colors.lightGrey}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.btnContainer}>
                                        <TouchableOpacity
                                            style={{ flex: 1 }}
                                            onPress={() => navigation.navigate('ProjectDetails', { project: project })}
                                        >
                                            <Title2 title="Voir" />
                                        </TouchableOpacity>
                                        <View style={{ width: 1, height: '100%', backgroundColor: Colors.darkGrey }} />
                                        <TouchableOpacity
                                            style={{ flex: 1 }}
                                            onPress={() => navigation.navigate('EditProject', { project: project })}
                                        >
                                            <Title2 title="Modifier" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                }
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <IconButton
                    icon='plus'
                    backgroundColor={Colors.mainBlue}
                    iconColor={Colors.white}
                    onPress={() => navigation.navigate('NewProject')}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        padding: 20,
        paddingTop: 70
    },
    icons: {
        width: 16,
        height: 16,
        tintColor: Colors.white
    },
    iconText: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    }
})