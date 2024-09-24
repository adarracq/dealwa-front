import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import BodyText from '../atoms/BodyText';
import Colors from '../../constants/Colors';

type TagProps = {
    title: string;
    color: string;
    selected: boolean;
    onPress: () => void;
}

export default function Tag(props: TagProps) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                backgroundColor: props.selected ? props.color : 'white',
                borderRadius: 16,
                padding: 8,
                marginRight: 8,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: Colors.lightGrey,
                flex: 1,
                alignItems: 'center',
            }}>
            <BodyText text={props.title}
                style={props.selected ? 'bold' : 'normal'}
                color={props.selected ? 'white' : Colors.darkGrey}
            />
        </TouchableOpacity>
    )
}