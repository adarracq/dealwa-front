import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type SmallTextProps = {
    text: string;
    color?: any;
    onPress?: () => void;
    marginTop?: number;
    marginBottom?: number;
    isLeft?: boolean;
    isBold?: boolean;
}

export default function SmallText(props: SmallTextProps) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={{
                fontSize: 12,
                textAlign: props.isLeft ? 'left' : 'center',
                fontFamily: props.isBold ? 'poppins-bold' : 'poppins-italic',
                color: props.color ? props.color : Colors.darkGrey,
                marginTop: props.marginTop ? props.marginTop : 0,
                marginBottom: props.marginBottom ? props.marginBottom : 0
            }}>{props.text}</Text>
        </TouchableOpacity>
    )
}