import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { functions } from '../../../../utils/Functions';
import BodyText from '../../../../components/atoms/BodyText';
import Colors from '../../../../constants/Colors';

type Props = {
    title: string;
    icon: string;
    onDelete: () => void;
}

export default function LanguageSelected(props: Props) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            margin: 5,
            backgroundColor: Colors.lightBlue,
            borderRadius: 10,
            borderColor: Colors.lightGrey,
            borderWidth: 1,
        }}>
            <Image
                source={functions.getIconSource(props.icon)}
                style={{ width: 24, height: 24 }}
            />
            <BodyText text={props.title} color={Colors.white} />
            <TouchableOpacity onPress={props.onDelete}>
                <Image
                    source={functions.getIconSource('trash')}
                    style={{ width: 24, height: 24, tintColor: Colors.white }}
                />
            </TouchableOpacity>
        </View>
    )
}