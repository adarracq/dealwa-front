import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import Title1 from '../atoms/Title1';
import BodyText from '../atoms/BodyText';
import SmallText from '../atoms/SmallText';
import AntDesign from '@expo/vector-icons/AntDesign';
import InputField from './InputField';

type Props = {
    title: string;
    subtitle: string;
    value: number;
    minVal: number;
    maxVal: number;
    onChangeValue: (text: number) => void;
}

export default function NumberInput(props: Props) {

    function separateThousands(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

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
                width: 100,
            }}>
                <InputField
                    // sperate thousands
                    value={separateThousands(props.value)}
                    onChangeText={(text) => {
                        // remove spaces
                        let value = parseInt(text.replace(/\s/g, ''));

                        if (isNaN(value))
                            value = 0;
                        else if (value < 0)
                            value = 0;
                        else if (value > props.maxVal)
                            value = props.maxVal;

                        props.onChangeValue(value);
                    }}
                    keyBoardType='number-pad'
                    placeholder='1000'
                />
            </View>
        </View>
    )
}