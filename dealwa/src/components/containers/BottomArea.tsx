import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type BottomAreaProps = {
    children: any;
    gap?: number;
    backgroundColor?: any;
}

export default function BottomArea(props: BottomAreaProps) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            gap: props.gap ? props.gap : 20,
            backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.lightGrey,
            width: '100%',
            padding: 20,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
        }}>
            {props.children}
        </View>
    )
}