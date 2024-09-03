import { Image, StyleSheet, View } from 'react-native'
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
import { userService } from '../../../services/user.service';
import { functions } from '../../../utils/Functions';

type Props = NativeStackScreenProps<NavParams, 'SetDetails'>;

export default function SetDetailsScreen({ navigation, route }: Props) {

    const params = route.params;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    function goToLanguages() {
        if (firstName === '' || lastName === '' || birthDate === '') {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez remplir tous les champs',
                type: 'danger',
            })
            //return;
        }

        userService.update(params.email, {
            firstname: firstName,
            lastname: lastName,
            birthdate: birthDate
        }).then(() => {
            navigation.navigate('SetLanguages', {
                email: params.email,
                type: params.type
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
            <View style={{ gap: 20 }}>
                <Image
                    source={functions.getIconSource('id-card')}
                    style={styles.icon}
                />
                <Title1 title="Vos informations" />
                <SmallText text="Vos données sont confidentielles et ne seront en aucun cas partagées." isLeft />
                <InputField
                    placeholder="Prénom"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <InputField
                    placeholder="Nom"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
                <InputField
                    placeholder="Date de naissance (mm/dd/yyyy)"
                    value={birthDate}
                    onChangeText={() => setOpen(true)}
                    onFocus={() => setOpen(true)}
                />
                {
                    open && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || date;
                                setOpen(false);
                                setDate(currentDate);
                                // add 0 to day and month if < 10
                                let day = currentDate.getDate().toString();
                                let month = (currentDate.getMonth() + 1).toString();
                                if (day.length === 1)
                                    day = "0" + day;
                                if (month.length === 1)
                                    month = "0" + month;

                                let stringDate = day
                                    + "/" + month
                                    + "/" + currentDate.getFullYear().toString();
                                setBirthDate(stringDate);
                            }}
                        />
                    )
                }

            </View>
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
        paddingTop: 70
    },
    icon: {
        width: 48,
        height: 48,
        tintColor: Colors.darkGrey
    }
})