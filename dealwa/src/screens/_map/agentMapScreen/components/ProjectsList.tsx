import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Project from '../../../../models/Project';
import Colors from '../../../../constants/Colors';
import Title1 from '../../../../components/atoms/Title1';
import TopMenu from '../../../../components/molecules/TopMenu';
import SmallText from '../../../../components/atoms/SmallText';
import { functions } from '../../../../utils/Functions';
import BodyText from '../../../../components/atoms/BodyText';
import Title2 from '../../../../components/atoms/Title2';

type Props = {
    projects: Project[];
    onSeeProject: (project: Project) => void;
}

export default function ProjectsList(props: Props) {

    let [filter, setFilter] = React.useState(0);

    function onLike(project: Project) {
        // TODO
    }


    function getAdress(adress: string) {
        if (adress === '') {
            return 'Inconnue'
        }
        else {
            let adressArray = adress.split(',');
            // return the two last elements of the array
            if (adressArray.length > 1) {
                return adressArray[adressArray.length - 2] + ', ' + adressArray[adressArray.length - 1];
            }
            else {
                return adressArray[0];
            }
        }
    }

    function heartToDisplay(project: Project) {
        // TODO like or not
        if (project) {
            return <Image
                source={functions.getIconSource('heart_full')}
                style={{
                    width: 16,
                    height: 16,
                    tintColor: getColor(project.type),
                    alignSelf: 'center'
                }} />
        }
        else {
            return <Image
                source={functions.getIconSource('heart_empty')}
                style={{
                    width: 16,
                    height: 16,
                    tintColor: Colors.lightGrey,
                    alignSelf: 'center'
                }} />
        }
    }

    function getColor(type: number) {
        if (type === 0) {
            return Colors.mainBlue;
        }
        else {
            return Colors.mainRed;
        }
    }

    return (
        <View style={styles.container}>
            <Title1 title="Projets dans votre zone" />
            {
                props.projects.length === 0 ?
                    <SmallText text="Aucun projet dans votre zone de chalandise" isLeft />
                    :
                    <>
                        <View style={styles.topMenus}>
                            <TopMenu
                                text="Tous"
                                selected={filter === -1}
                                onPress={() => setFilter(-1)}
                            />
                            <TopMenu
                                text="Achat"
                                selected={filter === 0}
                                onPress={() => setFilter(0)}
                            />
                            <TopMenu
                                text="Vente"
                                selected={filter === 1}
                                onPress={() => setFilter(1)}
                            />
                        </View>
                        <ScrollView contentContainerStyle={{ rowGap: 24, paddingTop: 12 }}>

                            {
                                props.projects.map((project, index) => {
                                    if (filter === -1 || project.type === filter) {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => props.onSeeProject(project)}
                                                key={index}
                                                style={[styles.projectContainer, {
                                                    backgroundColor: getColor(project.type)
                                                }]}>

                                                <View style={styles.type}>
                                                    <Title2
                                                        title={project.type === 0 ? 'Achat' : 'Vente'}
                                                        color={Colors.white}
                                                    />
                                                </View>
                                                <TouchableOpacity onPress={() => onLike(project)}
                                                    style={styles.likeContainer}>

                                                    {heartToDisplay(project)}
                                                </TouchableOpacity>

                                                <Title1
                                                    title={project.user_firstname}
                                                    color={Colors.white}
                                                />

                                                <View style={styles.iconText}>
                                                    <Image
                                                        source={functions.getIconSource('marker')}
                                                        style={styles.icons} />
                                                    <BodyText
                                                        text={getAdress(project.address)}
                                                        color={Colors.lightGrey}
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
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </ScrollView>
                    </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 100,
        gap: 20,
    },
    topMenus: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center'
    },
    projectContainer: {
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 16,
        gap: 8,
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    type: {
        position: 'absolute',
        top: -12,
        left: 16
    },
    icons: {
        width: 16,
        height: 16,
        tintColor: Colors.lightGrey
    },
    iconText: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    likeContainer: {
        position: 'absolute',
        right: 16,
        top: -12,
        borderRadius: 8,
        height: 32,
        width: 32,
        backgroundColor: Colors.white,
        display: 'flex',
        justifyContent: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    }
})