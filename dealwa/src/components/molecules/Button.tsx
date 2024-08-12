import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Title2 from '../atoms/Title2';
import Colors from '../../constants/Colors';
import { functions } from '../../utils/Functions';

type ButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor: any;
  icon?: any;
  iconColor?: any;
  textColor?: any;
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress}
      style={{
        borderRadius: 16,
        height: 50,
        width: '100%',
        backgroundColor: props.backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
      }}>
      {
        props.icon &&
        <Image
          source={functions.getIconSource(props.icon)}
          style={{
            width: 24,
            height: 24,
            tintColor: props.iconColor ? props.iconColor : null,
            position: 'absolute',
            left: 20
          }} />
      }

      <Title2 title={props.title} color={props.textColor ? props.textColor : Colors.black} />

    </TouchableOpacity>
  )
}