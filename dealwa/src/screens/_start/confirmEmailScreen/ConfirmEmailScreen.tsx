import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import Colors from '../../../constants/Colors'

import Button from '../../../components/molecules/Button';
import Title1 from '../../../components/atoms/Title1';
import SmallText from '../../../components/atoms/SmallText';
import Title2 from '../../../components/atoms/Title2';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParams } from '../../../navigations/Nav';

type Props = NativeStackScreenProps<NavParams, 'ConfirmEmail'>;

export default function ConfirmEmailScreen({ navigation, route }: Props) {

    const params = route.params;

    return (
        <View style={styles.container}>
            <Text></Text>
            <View style={{ gap: 20 }}>
                <Title1 title="Confirmez votre adresse email" centered />
                <SmallText text="Vérifiez votre boîte de réception et appuyez sur le lien dans l'e-mail que nous venons d'envoyer à :" />
                <Title2 title={params.email} color={Colors.mainBlue} />
            </View>
            <Button
                title="Ouvrir l'appli de messagerie"
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={() => {
                    navigation.navigate('Pswd', {
                        email: params.email,
                        type: params.type
                    });
                }} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.lightGrey,
        padding: 20,
    }
})