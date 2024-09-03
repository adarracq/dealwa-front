import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserContext } from '../../../contexts/UserContext';
import { BottomNavParams } from '../../../navigations/BottomTabNav';
import { UserMapNavParams } from '../../../navigations/UserMapNav';

type Props = NativeStackScreenProps<UserMapNavParams, 'Home'>;

export default function UserMapScreen({ navigation, route }: Props) {

    const [screenToDisplay, setScreenToDisplay] = useState('');



    return (
        <View style={styles.container}>
            <Text>UserMapScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})