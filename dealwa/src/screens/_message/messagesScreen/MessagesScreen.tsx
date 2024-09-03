import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ConversationHeading from './components/ConversationHeading';
import { MessagesNavParams } from '../../../navigations/MessagesNav';
import Title1 from '../../../components/atoms/Title1';
import Colors from '../../../constants/Colors';

type Props = NativeStackScreenProps<MessagesNavParams, 'Home'>;

export default function MessagesScreen({ navigation, route }: Props) {

    const [conversations, setConversations] = useState<{
        id: number;
        name: string;
        picture: string;
        lastMessage: string;
        lastMessageDate: string;
        isRead: boolean;
    }[]>([]);

    function getConversations() {
        //TODO : get conversations
        let _conversations = [
            {
                id: 1,
                name: 'Mathieu',
                picture: 'picture',
                lastMessage: 'Bonjour Mathieu...',
                lastMessageDate: 'Auj.',
                isRead: true
            },
            {
                id: 2,
                name: 'Clara',
                picture: 'picture',
                lastMessage: 'Merci, suite à votre...',
                lastMessageDate: 'Lun.',
                isRead: false
            },
            {
                id: 3,
                name: 'François',
                picture: 'picture',
                lastMessage: 'Bonjour, je vous...',
                lastMessageDate: 'Mar.',
                isRead: true
            }
        ];

        setConversations(_conversations);
    }

    function goToChat(id: number) {
        navigation.navigate('Chat', {
            id
        });
    }

    useEffect(() => {
        getConversations();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 10 }}>
                <Title1 title="Messages" />
                {conversations.map((conversation, index) => {
                    return (
                        <ConversationHeading
                            key={index}
                            name={conversation.name}
                            picture={conversation.picture}
                            lastMessage={conversation.lastMessage}
                            lastMessageDate={conversation.lastMessageDate}
                            isRead={conversation.isRead}
                            onPress={() => goToChat(conversation.id)}
                        />
                    )
                })}
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