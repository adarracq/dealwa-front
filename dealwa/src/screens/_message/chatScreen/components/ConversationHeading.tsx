import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../../constants/Colors'
import Octicons from '@expo/vector-icons/Octicons';
import { functions } from '../../../../utils/Functions';
import Title2 from '../../../../components/atoms/Title2';
import BodyText from '../../../../components/atoms/BodyText';
import SmallText from '../../../../components/atoms/SmallText';

type Props = {
    name: string,
    picture: string,
    lastMessage: string,
    lastMessageDate: string,
    isRead: boolean,
    onPress: () => void
}

export default function ConversationHeading(props: Props) {

    return (
        <TouchableOpacity
            style={[styles.container, { borderWidth: props.isRead ? 0 : 1 }]}
            onPress={props.onPress}
        >
            <Octicons name="dot-fill" size={24}
                color={props.isRead ? Colors.lightGrey : Colors.mainBlue} />
            <Image
                source={
                    //uri: props.picture 
                    require('../../../assets/img/profile.jpg')
                }
                style={styles.picture} />
            <View>
                <Title2 title={props.name} isLeft color={
                    props.isRead ? Colors.darkGrey : Colors.black
                } />
                <BodyText text={props.lastMessage}
                    color={props.isRead ? Colors.darkGrey : Colors.black}
                    style={props.isRead ? '' : 'bold'}
                />
            </View>
            <View style={styles.date}>
                <SmallText text={props.lastMessageDate}
                    color={props.isRead ? Colors.darkGrey : Colors.black}
                    isBold={props.isRead ? false : true}
                />
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        backgroundColor: Colors.white,
        padding: 10,
        borderColor: Colors.mainBlue,
        borderRadius: 16,
    },
    picture: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Colors.mainBlue,
        objectFit: 'cover',
    },
    date: {
        marginLeft: 'auto',
        marginTop: -20
    }
})