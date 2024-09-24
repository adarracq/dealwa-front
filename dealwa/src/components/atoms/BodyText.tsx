import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type BodyTextProps = {
    text: string;
    color?: string;
    style?: any;
    marginLeft?: number;
    centered?: boolean;
}

export default function BodyText(props: BodyTextProps) {
    return (
        <Text style={{
            fontSize: 14,
            color: props.color ? props.color : Colors.black,
            marginLeft: props.marginLeft ? props.marginLeft : null,
            textAlign: props.centered ? 'center' : 'left',
            fontFamily: props.style == 'bold' ? 'brother-bold'
                :
                props.style == 'italic' ? 'brother-light-italic'
                    :
                    'brother'
        }}>
            {props.text}
        </Text>
    )
}