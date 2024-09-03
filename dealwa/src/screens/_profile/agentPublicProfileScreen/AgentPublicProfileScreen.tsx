import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileNavParams } from '../../../navigations/ProfileNav';
import Colors from '../../../constants/Colors';
import HeaderArea from '../../../components/containers/HeaderArea';
import AgentProfileHeader from './components/AgentProfileHeader';
import BodyText from '../../../components/atoms/BodyText';
import AgentSpecialities from './components/AgentSpecialities';
import MenuArrow from '../../../components/molecules/MenuArrow';

type Props = NativeStackScreenProps<ProfileNavParams, 'PublicAgent'>;

export default function AgentPublicProfileScreen({ navigation, route }: Props) {

    return route.params.user && (
        <ScrollView >
            <View style={styles.container}>
                <AgentProfileHeader
                    user={route.params.user}
                    onSendMessage={() => { }}
                />
                <HeaderArea
                    title='Présentation'
                    titleColor={Colors.mainBlue}
                >
                    <View style={{ padding: 20 }} >
                        <BodyText
                            text={route.params.user.presentation ?? ''}
                            color={Colors.black}
                        />
                    </View>
                </HeaderArea>
                <AgentSpecialities
                    user={route.params.user}
                />
                <HeaderArea
                    title='Annonces'
                    titleColor={Colors.mainBlue}>
                    <MenuArrow
                        text='Voir les annonces'
                        onPress={() => console.log('annonces')} />
                    <MenuArrow
                        text='Voir les avis'
                        onPress={() => console.log('avis')} />
                </HeaderArea>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: Colors.lightGrey,
        padding: 20,
        paddingTop: 70
    },
})