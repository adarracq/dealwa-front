import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BodyText from '../atoms/BodyText';
import { functions } from '../../utils/Functions';

type IconTextProps = {
    icon: any;
    text: string;
    textColor: string;
    iconColor?: string;
    textStyle?: any;
    onPressIcon?: () => void;
}

export default function IconText(props: IconTextProps) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 20,
            gap: 10,
        }}>
            <TouchableOpacity onPress={props.onPressIcon}>
                <Image
                    source={functions.getIconSource(props.icon)}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: props.iconColor
                    }} />
            </TouchableOpacity>
            <BodyText text={props.text} color={props.textColor} style={props.textStyle} />
        </View>
    )
}