import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Title2 from '../atoms/Title2';
import Colors from '../../constants/Colors';
import { functions } from '../../utils/Functions';

type IconButtonProps = {
  onPress: () => void;
  backgroundColor: any;
  icon: any;
  text: string;
  color?: any;
}

export default function IconTextButton(props: IconButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress}
      style={{
        borderRadius: 16,
        backgroundColor: props.backgroundColor,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 16,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
      }}>

      <Image
        source={functions.getIconSource(props.icon)}
        style={{
          width: 24,
          height: 24,
          tintColor: props.color ? props.color : null,
          alignSelf: 'center'
        }} />
      <Title2
        title={props.text}
        color={props.color}
      />



    </TouchableOpacity>
  )
}