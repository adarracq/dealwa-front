import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type Title2Props = {
    title: string;
    color?: any;
}

export default function Title2(props: Title2Props) {
    return (

        <Text style={{
            color: props.color ? props.color : Colors.black,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'montserrat-semibold',
        }}>{props.title}</Text>
    )
}