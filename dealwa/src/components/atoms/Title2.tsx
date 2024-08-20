import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type Title2Props = {
    title: string;
    color?: any;
    isLeft?: boolean;
    crossed?: boolean;
}

export default function Title2(props: Title2Props) {
    return (

        <Text style={{
            color: props.color ? props.color : Colors.black,
            fontSize: 16,
            textAlign: props.isLeft ? 'left' : 'center',
            fontFamily: 'montserrat-semibold',
            textDecorationLine: props.crossed ? 'line-through' : 'none'
        }}>{props.title}</Text>
    )
}