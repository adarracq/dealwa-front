import { Image, ScrollView, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import React, { Component, useState } from 'react'
import Colors from '../../../constants/Colors'

import Button from '../../../components/molecules/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigations/Nav';
import Title1 from '../../../components/atoms/Title1';
import InputField from '../../../components/molecules/InputField';
import DateTimePicker from '@react-native-community/datetimepicker';
import SmallText from '../../../components/atoms/SmallText';
import { showMessage } from 'react-native-flash-message';
import BodyText from '../../../components/atoms/BodyText';
import Country from './components/Country';

type Props = NativeStackScreenProps<RootStackParamList, 'SetLanguages'>;

export default function SetLanguagesScreen({ navigation, route }: Props) {

    const params = route.params;
    const [languages, setLanguages] = useState([
        {
            id: 0,
            name: 'Allemand',
            icon: 'flag-germany',
            selected: false
        },
        {
            id: 1,
            name: 'Anglais',
            icon: 'flag-uk',
            selected: false
        },
        {
            id: 2,
            name: 'Arabe',
            icon: 'flag-arabic',
            selected: false
        },
        {
            id: 3,
            name: 'Chinois',
            icon: 'flag-china',
            selected: false
        },
        {
            id: 4,
            name: 'Espagnol',
            icon: 'flag-spain',
            selected: false
        },
        {
            id: 5,
            name: 'Français',
            icon: 'flag-french',
            selected: false
        },
        {
            id: 6,
            name: 'Italien',
            icon: 'flag-italy',
            selected: false
        },
        {
            id: 7,
            name: 'Japonais',
            icon: 'flag-japan',
            selected: false
        },
        {
            id: 8,
            name: 'Portugais',
            icon: 'flag-portugal',
            selected: false
        },
        {
            id: 9,
            name: 'Russe',
            icon: 'flag-russia',
            selected: false
        },
    ]);

    function changeLanguage(id: number) {
        setLanguages(languages.map((language) => language.id === id ? { ...language, selected: !language.selected } : language));
    }


    function goToLanguages() {
        /*if (selectedLanguages.length < 1) {
            showMessage({
                message: "Veuillez choisir au moins une langue",
                type: "danger",
            });
            return;
        }*/
    }


    return (
        <View style={styles.container}>
            <Title1 title="Choisissez vos langue(s) préférée(s)" />
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
                onPress={goToLanguages} />

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