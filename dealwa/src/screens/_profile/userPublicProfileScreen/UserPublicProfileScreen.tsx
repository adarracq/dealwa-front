import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileNavParams } from '../../../navigations/ProfileNav';

type Props = NativeStackScreenProps<ProfileNavParams, 'PublicUser'>;

export default function UserPublicProfileScreen({ navigation, route }: Props) {

    return (
        <View>
            <Text>Profil</Text>
        </View>
    )
}