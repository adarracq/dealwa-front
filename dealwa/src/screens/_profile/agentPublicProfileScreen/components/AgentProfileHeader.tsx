import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../../constants/Colors'
import User from '../../../../models/User'
import IconButton from '../../../../components/molecules/IconButton'
import { functions } from '../../../../utils/Functions'
import SmallText from '../../../../components/atoms/SmallText'
import BodyText from '../../../../components/atoms/BodyText'
import Title1 from '../../../../components/atoms/Title1'
import IconTextButton from '../../../../components/molecules/IconTextButton'

type ProfileHeaderProps = {
    user: User;
    onSendMessage: () => void;
}

export default function AgentProfileHeader(props: ProfileHeaderProps) {


    function getFirstNameAndAge() {
        let res = '';
        if (props.user.firstname) {
            res += props.user.firstname;
        }
        if (props.user.birthdate) {
            res += `, ${functions.getAgeFromBirthdate(props.user.birthdate)} ans`;
        }
        return res;
    }

    return (
        <View style={styles.container}>
            {
                props.user.imageUrl ?
                    <Image
                        source={{ uri: props.user.imageUrl ?? '' }}
                        style={styles.image} />
                    :
                    <View style={styles.image} />
            }
            <Title1
                title={getFirstNameAndAge()}
                color={Colors.black}
            />
            <BodyText
                text={'Consultant immobilier depuis 2019'}
                color={Colors.mainBlue}
            />
            <IconTextButton
                onPress={props.onSendMessage}
                backgroundColor={Colors.mainBlue}
                icon='message'
                text='Message'
                color={Colors.white}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 24,
        gap: 16,
    },
    image: {
        width: 128,
        height: 128,
        borderRadius: 200,
        marginTop: -50,
        backgroundColor: Colors.darkGrey,
        borderColor: Colors.mainBlue,
        borderWidth: 2
    }
})