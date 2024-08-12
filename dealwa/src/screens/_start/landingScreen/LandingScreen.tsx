import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import Colors from '../../../constants/Colors'
import LogoElement from '../../../components/molecules/LogoElement'
import BottomArea from '../../../components/containers/BottomArea'
import Title1 from '../../../components/atoms/Title1'
import SmallText from '../../../components/atoms/SmallText'
import OrSeparator from '../../../components/molecules/OrSeparator'

import { NavigationProp } from '@react-navigation/native';
import Button from '../../../components/molecules/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigations/Nav'


type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {

    function goToAgentScreen() {
        navigation.navigate('Landing2', {
            type: 'Agent'
        });
    }

    function goToUserScreen() {
        navigation.navigate('Landing2', {
            type: 'User'
        });
    }

    function goToLoginScreen() {
        console.log('goToLoginScreen');
        navigation.navigate('Login', {
            type: 'Undefined'
        });
    }

    return (
        <View style={styles.container}>
            <LogoElement color={Colors.white} />
            <BottomArea>
                <Title1 title="Vous êtes ..." marginBottom={40} marginTop={10} centered />
                <Button title="Agent immobiler" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                    onPress={goToAgentScreen} />
                <OrSeparator />
                <Button title="Particulier" backgroundColor={Colors.white}
                    onPress={goToUserScreen} />
                <SmallText text="Vous avez déja un compte ?" marginBottom={20} marginTop={40}
                    onPress={() => goToLoginScreen()} />
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