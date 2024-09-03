import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { Component, useContext, useState } from 'react'
import Colors from '../../../constants/Colors'

import Button from '../../../components/molecules/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParams } from '../../../navigations/Nav';
import Title1 from '../../../components/atoms/Title1';
import SmallText from '../../../components/atoms/SmallText';
import { showMessage } from 'react-native-flash-message';
import BodyText from '../../../components/atoms/BodyText';
import Country from './components/Country';
import { userService } from '../../../services/user.service';
import AsyncStorageUser from '../../../utils/AsyncStorageUser';
import { UserContext } from '../../../contexts/UserContext';
import Languages from '../../../constants/Languages';

type Props = NativeStackScreenProps<NavParams, 'SetLanguages'>;

export default function SetLanguagesScreen({ navigation, route }: Props) {

    const params = route.params;
    const [userData, setUserData] = useContext(UserContext);
    const [languages, setLanguages] = useState(Languages.languages);

    function changeLanguage(id: number) {
        setLanguages(languages.map((language) => language.id === id ? { ...language, selected: !language.selected } : language));
    }


    function saveLanguages() {
        const selectedLanguages = languages.filter((language) => language.selected).map((language) => language.id);
        userService.update(params.email, {
            languages: selectedLanguages
        }).then((response) => {

            AsyncStorageUser.setUser(response);
            setUserData(response);

            if (params.type === 'agent')
                navigation.navigate('SetAgentDetails', {
                    email: params.email,
                });
            else
                navigation.navigate('Home');

        }).catch((error) => {
            showMessage({
                message: 'Erreur',
                description: 'Une erreur est survenue',
                type: 'danger',
            })
        });
    }


    return (
        <View style={styles.container}>
            <Title1 title="Choisissez vos langue(s) parlée(s)" />
            <SmallText text="Vous pourrez changer ces langues dans votre profil après votre inscription." isLeft />
            <BodyText text="Populaire" color={Colors.darkGrey} marginLeft={30} />
            <View style={{ gap: 10 }}>
                <Country flag={languages[5].icon} name={languages[5].name} selected={languages[5].selected}
                    onPress={() => changeLanguage(5)} />
                <Country flag={languages[1].icon} name={languages[1].name} selected={languages[1].selected}
                    onPress={() => changeLanguage(1)} />
            </View>
            <BodyText text="A-Z" color={Colors.darkGrey} marginLeft={30} />
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={{ gap: 10 }}>
                    {languages.map((language, index) => (
                        <Country key={index} flag={language.icon} name={language.name} selected={language.selected}
                            onPress={() => changeLanguage(language.id)} />
                    ))}
                </View>
            </ScrollView>
            <Button
                title="Continuer"
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={saveLanguages} />

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.lightGrey,
        padding: 20,
        paddingTop: 70,
        gap: 20
    },
    icon: {
        width: 48,
        height: 48,
        tintColor: Colors.darkGrey
    }
})