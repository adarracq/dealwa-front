import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import BodyText from '../atoms/BodyText'
import { functions } from '../../utils/Functions'
import IconText from './IconText'

type Props = {
  text: string,
  icon: any
  color?: any
  onPressIcon?: () => void
}
export default function DeletableField(props: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: props.color,
        backgroundColor: Colors.white,
        flex: 1
      }}
    >
      <IconText
        icon={props.icon}
        text={props.text}
        textColor={Colors.black}
        iconColor={props.color}
        onPressIcon={props.onPressIcon}
      />
    </View>
  )
}