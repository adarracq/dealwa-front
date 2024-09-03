import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileNavParams } from '../../../navigations/ProfileNav';
import Colors from '../../../constants/Colors';
import User from '../../../models/User';
import { userService } from '../../../services/user.service';
import Button from '../../../components/molecules/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage } from 'react-native-flash-message';
import Title1 from '../../../components/atoms/Title1';
import SmallText from '../../../components/atoms/SmallText';
import InputField from '../../../components/molecules/InputField';
import HeaderArea from '../../../components/containers/HeaderArea';
import SelectDropDown from '../../../components/molecules/SelectDropDown';
import Languages from '../../../constants/Languages';
import { functions } from '../../../utils/Functions';
import LanguageSelected from './components/LanguageSelected';
import IconButton from '../../../components/molecules/IconButton';

type Props = NativeStackScreenProps<ProfileNavParams, 'EditPerso'>;

export default function EditProfileScreen({ navigation, route }: Props) {

    const [user, setUser] = useState<User>(route.params.user);
    const [isChanged, setIsChanged] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const [languages, setLanguages] = useState(Languages.languages);
    const [selectedLanguages, setSelectedLanguages] = useState<number[]>(user.languages || []);

    function save() {
        if (!isChanged || !user)
            return;

        userService.update(user.email, {
            firstname: user.firstname,
            lastname: user.lastname,
            birthdate: user.birthdate,
            presentation: user.presentation,
            languages: user.languages
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

    function addLanguage(id: number) {
        if (!selectedLanguages.includes(id)) {
            let _selectedLanguages = [...selectedLanguages, id]
            setSelectedLanguages(_selectedLanguages);
            setUser({ ...user, languages: _selectedLanguages });
            setIsChanged(true);
        }
    }

    function removeLanguage(id: number) {
        let _selectedLanguages = selectedLanguages.filter((lang) => lang !== id)
        setSelectedLanguages(_selectedLanguages);
        setUser({ ...user, languages: _selectedLanguages });
        setIsChanged(true);
    }


    return (
        user &&
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 20, padding: 20, }}>
                <Title1 title="Vos renseignements personnels" />
                <SmallText text="Vos données sont confidentielles et ne seront en aucun cas partagées." isLeft />
                <InputField
                    title='Prénom'
                    placeholder="Votre prénom"
                    value={user.firstname}
                    onChangeText={(text) => {
                        setUser({ ...user, firstname: text });
                        setIsChanged(true);
                    }}
                />
                <InputField
                    title='Nom'
                    placeholder="Votre nom"
                    value={user.lastname ? user.lastname : ''}
                    onChangeText={(text) => {
                        setUser({ ...user, lastname: text });
                        setIsChanged(true);
                    }}
                />
                <InputField
                    title='Date de naissance'
                    placeholder="Date de naissance (mm/dd/yyyy)"
                    value={user.birthdate ? user.birthdate : ''}
                    onChangeText={() => setOpen(true)}
                    onFocus={() => setOpen(true)}
                />
                <InputField
                    title='Présentation'
                    placeholder="Ecrivez quelques mots sur vous pour vous présenter"
                    value={user.presentation ? user.presentation : ''}
                    onChangeText={(text) => {
                        setUser({ ...user, presentation: text });
                        setIsChanged(true);
                    }}
                    isMultiline
                    height={200}
                />
                <HeaderArea
                    title="Langue(s) préférée(s)"
                >
                    <View style={{ padding: 20, gap: 8 }}>
                        <SelectDropDown
                            title="Langues"
                            items={languages}
                            onSelectItem={(item) => addLanguage(item.id)}
                        />
                        {
                            selectedLanguages.map((id) => {
                                const lang = languages.find((lang) => lang.id == id);
                                return lang && (
                                    <LanguageSelected
                                        key={lang.id}
                                        title={lang.name}
                                        icon={lang.icon}
                                        onDelete={() => removeLanguage(lang.id)}
                                    />
                                )
                            })
                        }
                    </View>
                </HeaderArea>
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
                                setUser({ ...user, birthdate: stringDate });
                                setIsChanged(true);
                            }}
                        />
                    )
                }
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <IconButton
                    icon='save'
                    backgroundColor={isChanged ? Colors.mainBlue : Colors.lightGrey}
                    iconColor={isChanged ? Colors.white : Colors.darkGrey}
                    onPress={save}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.lightGrey,
        paddingTop: 70,
    },
    button: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
    }
})