import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type Title0Props = {
    title: string;
    color?: any;
    compressed?: boolean;
}

export default function Title0(props: Title0Props) {
    return (

        <Text style={{
            color: props.color ? props.color : Colors.black,
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'montserrat-bold',
            letterSpacing: props.compressed ? -1 : 0
        }}>{props.title}</Text>
    )
}