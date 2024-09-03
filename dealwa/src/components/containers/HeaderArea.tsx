import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import Title2 from '../atoms/Title2';

type HeaderAreaProps = {
    children: any;
    title: string;
    titleColor?: string;
}

export default function HeaderArea(props: HeaderAreaProps) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: Colors.white,
            width: '100%',
            borderRadius: 24,
            marginTop: 10,
        }}>
            <View style={{
                position: 'absolute',
                top: -12,
                left: 16,
                zIndex: 3,
            }}>
                <Title2
                    title={props.title}
                    color={props.titleColor}
                />
            </View>
            {props.children}
        </View>
    )
}