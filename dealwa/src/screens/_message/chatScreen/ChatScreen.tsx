import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Colors from '../../../constants/Colors';
import Title1 from '../../../components/atoms/Title1';
import { MessagesNavParams } from '../../../navigations/MessagesNav';

type Props = NativeStackScreenProps<MessagesNavParams, 'Chat'>;

export default function ChatScreen({ navigation, route }: Props) {

    function getConversation() {
        //TODO : get conversation
    }



    useEffect(() => {
        getConversation();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 10 }}>
                <Title1 title="Message" />
            </ScrollView>
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
})