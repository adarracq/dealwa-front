import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import Title1 from '../atoms/Title1';
import BodyText from '../atoms/BodyText';
import SmallText from '../atoms/SmallText';
import AntDesign from '@expo/vector-icons/AntDesign';

type PlusMinusInputProps = {
    title: string;
    subtitle: string;
    value: number;
    minVal: number;
    maxVal: number;
    onChangeValue: (text: number) => void;
}

export default function PlusMinusInput2(props: PlusMinusInputProps) {

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50,
                borderRadius: 16,
            }}
        >
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}>
                <BodyText text={props.title} style='bold' />
                <SmallText text={props.subtitle} />
            </View>

            <View style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
            }}>
                <AntDesign name="minuscircleo" size={24}
                    color={props.value > props.minVal ? Colors.darkGrey : Colors.lightGrey}
                    onPress={() => {
                        if (props.value > props.minVal)
                            props.onChangeValue(props.value - 1);
                    }}
                />
                <Title1 title={props.value.toString()} />
                <AntDesign name="pluscircleo" size={24}
                    color={props.value < props.maxVal ? Colors.darkGrey : Colors.lightGrey}
                    onPress={() => {
                        if (props.value < props.maxVal)
                            props.onChangeValue(props.value + 1);
                    }}
                    // make it increase exponentially when keeping the button pressed
                    onLongPress={() => {
                        if (props.value < props.maxVal)
                            props.onChangeValue(props.value + 10);
                    }}
                />
            </View>
        </View>
    )
}