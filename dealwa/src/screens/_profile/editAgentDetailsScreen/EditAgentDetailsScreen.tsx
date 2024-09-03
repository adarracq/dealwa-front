import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileNavParams } from '../../../navigations/ProfileNav';
import Colors from '../../../constants/Colors';
import User from '../../../models/User';
import { userService } from '../../../services/user.service';
import { UserContext } from '../../../contexts/UserContext';
import Button from '../../../components/molecules/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage } from 'react-native-flash-message';
import { functions } from '../../../utils/Functions';
import Title1 from '../../../components/atoms/Title1';
import SmallText from '../../../components/atoms/SmallText';
import InputField from '../../../components/molecules/InputField';
import PlusMinusInput from '../../../components/molecules/PlusMinusInput';
import Title2 from '../../../components/atoms/Title2';
import CheckBox from '../../../components/molecules/Checkbox';
import RadioButton from '../../../components/molecules/RadioButton';

type Props = NativeStackScreenProps<ProfileNavParams, 'EditAgent'>;

export default function EditAgentDetailsScreen({ navigation, route }: Props) {

    const [user, setUser] = useState<User>(route.params.user);
    const [isChanged, setIsChanged] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);


    function save() {
        if (!isChanged || !user)
            return;

        userService.update(user.email, {
            network: user.network,
            status: user.status,
            experience: user.experience,
            specialities: user.specialities
        }).then(() => {
            showMessage({
                message: 'Succès',
                description: 'Vos informations ont été mises à jour',
                type: 'success',
            })
            setIsChanged(false);
            navigation.goBack();

        }).catch((error) => {
            showMessage({
                message: 'Erreur',
                description: 'Une erreur est survenue',
                type: 'danger',
            })
        })
    }

    const [specialities, setSpecialities] = useState([
        {
            id: 0,
            name: 'Transaction',
            selected: user.specialities ? user.specialities.includes('0') : false
        },
        {
            id: 1,
            name: 'Gestion',
            selected: user.specialities ? user.specialities.includes('1') : false
        },
        {
            id: 2,
            name: 'Location',
            selected: user.specialities ? user.specialities.includes('2') : false
        }
    ]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 20 }}>
                <Title1 title="Vos informations professionnelles" />

                <View style={{ gap: 10 }}>
                    <Title2 title="Votre Réseau" isLeft />
                    <InputField
                        placeholder="Réseau"
                        value={user.network ? user.network : ''}
                        onChangeText={(text) => {
                            setUser({ ...user, network: text });
                            setIsChanged(true);
                        }}
                    />
                </View>

                <View style={{ gap: 10 }}>
                    <Title2 title="Votre Statut" isLeft />
                    <RadioButton
                        title="Indépendant"
                        selected={user.status == '0'}
                        onPress={() => {
                            setUser({ ...user, status: '0' });
                            setIsChanged(true);
                        }}
                    />
                    <RadioButton
                        title="Salarié"
                        selected={user.status == '1'}
                        onPress={() => {
                            setUser({ ...user, status: '1' });
                            setIsChanged(true);
                        }}
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
                                onPress={() => {
                                    let _specs = specialities.map((s) => s.id === speciality.id ? { ...s, selected: !s.selected } : s);
                                    setSpecialities(_specs);
                                    setUser({ ...user, specialities: _specs.filter(s => s.selected).map(s => s.id.toString()) });
                                    setIsChanged(true);
                                }}
                            />
                        ))
                    }
                </View>

                <View style={{ gap: 10 }}>
                    <Title2 title="Nombre d’années d’expérience" isLeft />
                    <PlusMinusInput
                        value={user.experience ? user.experience.toString() : '0'}
                        onChangeValue={(text) => {
                            setUser({ ...user, experience: Number(text) });
                            setIsChanged(true);
                        }}
                    />
                </View>

            </ScrollView>
            <Button
                title="Modifier"
                backgroundColor={isChanged ? Colors.mainBlue : Colors.lightGrey}
                textColor={isChanged ? Colors.white : Colors.darkGrey}
                onPress={save} />
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