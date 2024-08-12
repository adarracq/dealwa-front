import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type BodyTextProps = {
    text: string;
    color?: string;
    style?: any;
    marginLeft?: number;
}

export default function BodyText(props: BodyTextProps) {
    return (
        <Text style={{
            fontSize: 14,
            color: props.color ? props.color : Colors.black,
            marginLeft: props.marginLeft ? props.marginLeft : null,
            fontFamily: props.style == 'bold' ? 'poppins-bold'
                :
                props.style == 'italic' ? 'poppins-italic'
                    :
                    'poppins'
        }}>
            {props.text}
        </Text>
    )
}