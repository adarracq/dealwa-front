import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import Title0 from '../atoms/Title0';
import SmallText from '../atoms/SmallText';
import Title2 from '../atoms/Title2';
import Title1 from '../atoms/Title1';

type PlusMinusInputProps = {
    value: string;
    onChangeValue: (text: string) => void;
}

export default function PlusMinusInput(props: PlusMinusInputProps) {

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 16,
                paddingRight: 8,
                height: 50,
                borderRadius: 16,
                backgroundColor: Colors.white,
            }}
        >
            <Title1 title={props.value} />
            <View style={{
                flexDirection: 'row',
                gap: 1,
            }}>
                <View style={{
                    backgroundColor: Colors.lightGrey,
                    borderTopStartRadius: 16,
                    borderBottomStartRadius: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 5,
                    paddingBottom: 5,
                }}>
                    <Entypo name="minus" size={24} color={Colors.black}
                        onPress={() => props.onChangeValue((parseInt(props.value) - 1).toString())} />
                </View>
                <View style={{
                    backgroundColor: Colors.lightGrey,
                    borderTopEndRadius: 16,
                    borderBottomEndRadius: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 5,
                    paddingBottom: 5,
                }}>
                    <Entypo name="plus" size={24} color={Colors.black}
                        onPress={() => props.onChangeValue((parseInt(props.value) + 1).toString())} />
                </View>
            </View>
        </View>
    )
}