import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { Component, useState } from 'react'
import Colors from '../../../constants/Colors'

import Button from '../../../components/molecules/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParams } from '../../../navigations/Nav';
import Title1 from '../../../components/atoms/Title1';
import InputField from '../../../components/molecules/InputField';
import DateTimePicker from '@react-native-community/datetimepicker';
import SmallText from '../../../components/atoms/SmallText';
import { showMessage } from 'react-native-flash-message';
import Title2 from '../../../components/atoms/Title2';
import RadioButton from '../../../components/molecules/RadioButton';
import CheckBox from '../../../components/molecules/Checkbox';
import PlusMinusInput from '../../../components/molecules/PlusMinusInput';
import { userService } from '../../../services/user.service';

type Props = NativeStackScreenProps<NavParams, 'SetAgentDetails'>;

export default function SetAgentDetailsScreen({ navigation, route }: Props) {

    const params = route.params;
    const [network, setNetwork] = useState('');
    const [status, setStatus] = useState(0);
    const [experience, setExperience] = useState('0');
    const [specialities, setSpecialities] = useState([
        {
            id: 0,
            name: 'Achat/Vente',
            selected: false
        },
        {
            id: 1,
            name: 'Immobilier Neuf',
            selected: false
        },
        {
            id: 2,
            name: 'Gestion Locative',
            selected: false
        },
        {
            id: 3,
            name: 'Copropriété',
            selected: false
        }
    ]);

    function saveDetails() {
        const selectedSpecialities = specialities.filter((s) => s.selected).map((s) => s.id);
        userService.update(params.email, {
            network,
            status,
            experience,
            specialities: selectedSpecialities
        }).then(() => {
            navigation.navigate('SelectPlan', {
                email: params.email
            });
        }).catch((error) => {
            showMessage({
                message: 'Erreur',
                description: 'Une erreur est survenue',
                type: 'danger',
            })
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 20 }}>
                <Title1 title="Un peu plus sur vous" />
                <SmallText text="Vous pourrez modifier ces données dans votre profil après votre inscription." isLeft />

                <View style={{ gap: 10 }}>
                    <Title2 title="Votre Réseau" isLeft />
                    <InputField
                        placeholder="Réseau"
                        value={network}
                        onChangeText={(text) => setNetwork(text)}
                    />
                </View>

                <View style={{ gap: 10 }}>
                    <Title2 title="Votre Statut" isLeft />
                    <RadioButton
                        title="Indépendant"
                        selected={status === 0}
                        onPress={() => setStatus(0)}
                    />
                    <RadioButton
                        title="Salarié"
                        selected={status === 1}
                        onPress={() => setStatus(1)}
                    />
                </View>

                <View style={{ gap: 10 }}>
                    <Title2 title="Vos Spécialités" isLeft />
                    {
                        specialities.map((speciality) => (
                            <CheckBox
                                key={speciality.id}
                                title={speciality.name}
                                selected={speciality.selected}
                                onPress={() => setSpecialities(specialities.map((s) => s.id === speciality.id ? { ...s, selected: !s.selected } : s))}
                            />
                        ))
                    }
                </View>

                <View style={{ gap: 10 }}>
                    <Title2 title="Nombre d’années d’expérience" isLeft />
                    <PlusMinusInput
                        value={experience}
                        onChangeValue={(text) => setExperience(text)}
                    />
                </View>

            </ScrollView>
            <Button
                title="Continuer"
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={saveDetails} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.lightGrey,
        padding: 20,
        paddingTop: 70
    },
    icon: {
        width: 48,
        height: 48,
        tintColor: Colors.darkGrey
    }
})