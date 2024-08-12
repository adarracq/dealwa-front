import { Image, StyleSheet, Text, View } from 'react-native'
import React, { Component, useState } from 'react'
import Colors from '../../../constants/Colors'

import Button from '../../../components/molecules/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigations/Nav';
import Title1 from '../../../components/atoms/Title1';
import InputField from '../../../components/molecules/InputField';
import BodyText from '../../../components/atoms/BodyText';
import { showMessage } from 'react-native-flash-message';

type Props = NativeStackScreenProps<RootStackParamList, 'CreatePswd'>;

export default function CreatePswdScreen({ navigation, route }: Props) {

    const params = route.params;
    const [password, setPassword] = useState('');
    const [rules, setRules] = useState([
        { text: '8 caractères minimum', valid: false },
        { text: '1 caractère minuscule (A-Z)', valid: false },
        { text: '1 caractère majuscule (A-Z)', valid: false },
        { text: '1 chiffre', valid: false },
        { text: '1 caractère spécial e.g. ! @ # $ %', valid: false }
    ]);

    function checkRules(pswd: string) {
        let newRules = rules;
        newRules[0].valid = pswd.length >= 8;
        newRules[1].valid = !!pswd.match(/[a-z]/);
        newRules[2].valid = !!pswd.match(/[A-Z]/);
        newRules[3].valid = !!pswd.match(/[0-9]/);
        newRules[4].valid = !!pswd.match(/[!@#$%^&*]/);
        setRules(newRules);
        setPassword(pswd);
    }

    function goToDetails() {
        if (rules.some(rule => !rule.valid)) {
            showMessage({
                message: "Erreur",
                description: "Votre mot de passe ne respecte pas les règles",
                type: "danger",
            });
            //return;
        }

        navigation.navigate('SetDetails', {
            email: params.email,
            type: params.type,
            password
        });
    }

    return (
        <View style={styles.container}>
            <View style={{ gap: 20 }}>
                <Image
                    source={require('../../../assets/icons/lock.png')}
                    style={styles.icon}
                />
                <Title1 title="Créez votre mot de passe" />
                <InputField
                    isPassword
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={(text) => checkRules(text)}
                />
                <View style={{ gap: 5 }}>
                    <BodyText text="Votre mot de passe doit inclure :" style='bold' color={Colors.darkGrey} />
                    {
                        rules.map((rule, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: rule.valid ? Colors.lightBlue : Colors.mainRed }}>{rule.valid ? '✓ ' : '✗ '}</Text>
                                <BodyText text={rule.text} color={Colors.darkGrey} />
                            </View>
                        ))
                    }
                </View>

            </View>
            <Button
                title="Continuer"
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={goToDetails} />
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
        width: 36,
        height: 36,
        tintColor: Colors.darkGrey
    }
})