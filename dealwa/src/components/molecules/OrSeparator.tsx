import { View, Text } from 'react-native'
import React from 'react'
import SmallText from '../atoms/SmallText'
import Colors from '../../constants/Colors'

export default function OrSeparator() {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 20
            }}
        >
            <View style={{
                borderBottomColor: Colors.darkGrey,
                borderBottomWidth: 1,
                flex: 1,
                alignSelf: 'center',
            }} />
            <SmallText text="ou" />
            <View style={{
                borderBottomColor: Colors.darkGrey,
                borderBottomWidth: 1,
                flex: 1,
                alignSelf: 'center',
            }} />
        </View>
    )
}