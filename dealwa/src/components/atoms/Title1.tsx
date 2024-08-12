import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type Title1Props = {
    title: string;
    color?: any;
    marginTop?: number;
    marginBottom?: number;
    centered?: boolean;
}

export default function Title1(props: Title1Props) {
    return (
        <Text style={{
            color: props.color ? props.color : Colors.black,
            fontSize: 18,
            textAlign: props.centered ? 'center' : 'left',
            fontFamily: 'montserrat-bold',
            marginTop: props.marginTop ? props.marginTop : 0,
            marginBottom: props.marginBottom ? props.marginBottom : 0
        }}>{props.title}</Text>
    )
}