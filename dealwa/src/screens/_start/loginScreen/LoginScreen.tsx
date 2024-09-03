import { StyleSheet, Text, View } from 'react-native'
import React, { Component, useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import LogoElement from '../../../components/molecules/LogoElement';
import BottomArea from '../../../components/containers/BottomArea';
import Title1 from '../../../components/atoms/Title1';
import OrSeparator from '../../../components/molecules/OrSeparator';
import SmallText from '../../../components/atoms/SmallText';
import Colors from '../../../constants/Colors';
import Button from '../../../components/molecules/Button';
import InputField from '../../../components/molecules/InputField';
import { showMessage } from 'react-native-flash-message';
import { NavParams } from '../../../navigations/Nav';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userService } from '../../../services/user.service';

type Props = NativeStackScreenProps<NavParams, 'Login'>;

export default function LoginScreen({ route, navigation }: Props) {

    const type = route.params?.type;
    const [email, setEmail] = useState('');
    const [emailErrorText, setEmailErrorText] = useState<string | null>(null);

    function loginWithGoogle() {
        showMessage({
            message: 'Erreur',
            description: 'Fonctionnalité non disponible pour le moment',
            type: 'danger',
        });

    }

    function loginWithApple() {
        showMessage({
            message: 'Erreur',
            description: 'Fonctionnalité non disponible pour le moment',
            type: 'danger',
        });

    }

    function loginWithFacebook() {
        showMessage({
            message: 'Erreur',
            description: 'Fonctionnalité non disponible pour le moment',
            type: 'danger',
        });

    }

    function onEmailChange(text: string) {

        setEmail(text);

        if (!text || text === '') {
            setEmailErrorText('Veuillez entrer un email');
        }
        else if (!/\S+@\S+\.\S+/.test(text)) {
            setEmailErrorText('Veuillez entrer un email valide');
        }
        else {
            setEmailErrorText(null);
            setEmail(text);
        }
    }

    function loginWithEmail() {
        if (!email || email === '')
            setEmailErrorText('Veuillez entrer un email');

        if (emailErrorText) {
            showMessage({
                message: 'Erreur',
                description: emailErrorText,
                type: 'danger',
            });
            return;
        }

        setEmailErrorText(null);

        userService.getUserByEmail(email).then((response) => {
            navigation.navigate('Pswd', {
                email: email,
                type: 'connection'
            });

        }).catch((error) => {
            if (error === 'Not Found') {
                navigation.navigate('Pswd', {
                    email,
                    type
                });
            }
            else {
                showMessage({
                    message: 'Erreur',
                    description: error,
                    type: 'danger',
                });
            }
        });
    }


    return (
        <View style={styles.container}>
            <LogoElement color={Colors.white} />
            <BottomArea>
                <Title1 title="Connexion ou inscription" marginBottom={10} marginTop={10} centered />
                <InputField placeholder="Adresse email"
                    value={email}
                    onChangeText={(text) => { onEmailChange(text) }}
                    errorText={emailErrorText}
                />
                <Button title="Continuer" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                    onPress={loginWithEmail} />
                <OrSeparator />
                <Button title="Continuer avec Google" backgroundColor={Colors.white} icon="google"
                    onPress={loginWithGoogle} />
                <Button title="Continuer avec Apple" backgroundColor={Colors.white} icon="apple"
                    onPress={loginWithApple} />
                <Button title="Continuer avec Facebook" backgroundColor={Colors.white} icon="facebook"
                    onPress={loginWithFacebook} />
                <SmallText text="Si vous créez un nouveau compte, les conditions générales et la politique de confidentialité s'appliqueront." marginBottom={10} marginTop={10} />
            </BottomArea>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.mainBlue
    }
})