import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import User from '../../models/User';
import HeaderArea from '../containers/HeaderArea';
import BodyText from '../atoms/BodyText';
import Colors from '../../constants/Colors';
import IconTextButton from '../molecules/IconTextButton';
import { functions } from '../../utils/Functions';
import Title1 from '../atoms/Title1';
import MapView, { Circle } from 'react-native-maps';
import Project from '../../models/Project';
import ProjectRoomsEct from './ProjectRoomsEct';

type Props = {
    project: Project;
    user: User;
    onMessage: () => void;
    onLike: () => void;
}
export default function ProjectPresentation(props: Props) {

    function getFirstNameAndAge() {
        let res = '';
        if (props.user.firstname) {
            res += props.user.firstname;
        }
        if (props.user.birthdate) {
            res += `, ${functions.getAgeFromBirthdate(props.user.birthdate)} ans`;
        }
        return res;
    }

    function getColor(type: number) {
        return (type == 0 || type == 2) ? Colors.mainBlue : Colors.mainRed;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topContainer}>
                {
                    props.user.imageUrl ?
                        <Image
                            source={{ uri: props.user.imageUrl ?? '' }}
                            style={styles.image} />
                        :
                        <View style={styles.image} />
                }
                <Title1
                    title={getFirstNameAndAge()}
                    color={Colors.black}
                />
                <IconTextButton
                    onPress={props.onMessage}
                    backgroundColor={getColor(props.project.type)}
                    icon='message'
                    text='Message'
                    color={Colors.white}
                />
            </View>
            <ProjectRoomsEct project={props.project} />
            <HeaderArea
                title='Présentation'
                titleColor={getColor(props.project.type)}
            >
                <View style={{ padding: 20 }} >
                    <BodyText
                        text={props.user.presentation ?? ''}
                        color={Colors.black}
                    />
                </View>
            </HeaderArea>
            <HeaderArea
                title={'Description'}
                titleColor={getColor(props.project.type)}
            >
                <View style={{ padding: 20 }} >
                    <BodyText
                        text={props.project.description ?? ''}
                        color={Colors.black}
                    />
                </View>
            </HeaderArea>
            <View style={styles.mapContainer}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: props.project.coord[0],
                        longitude: props.project.coord[1],
                        latitudeDelta: 0.0922 * (props.project.radius / 4000),
                        longitudeDelta: 0.0421 * (props.project.radius / 4000),
                    }}
                >
                    <Circle
                        center={{
                            latitude: props.project.coord[0],
                            longitude: props.project.coord[1],
                        }}
                        radius={props.project.radius == 0 ? 100 : props.project.radius}
                        fillColor="rgba(18, 35, 196, 0.2)"
                        strokeWidth={0}
                    />
                </MapView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        backgroundColor: Colors.lightGrey,
        padding: 20,
        paddingTop: 70
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 24,
        gap: 16,
    },
    image: {
        width: 128,
        height: 128,
        borderRadius: 200,
        marginTop: -50,
        backgroundColor: Colors.darkGrey,
        borderColor: Colors.mainBlue,
        borderWidth: 2
    },
    mapContainer: {
        borderRadius: 16,
        height: 300,
        overflow: 'hidden',
        backgroundColor: Colors.mainBlue,
    },
    map: {
        flex: 1,
    },
})