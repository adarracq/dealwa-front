import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Title2 from '../atoms/Title2';
import Colors from '../../constants/Colors';
import { functions } from '../../utils/Functions';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
  onPress: () => void;
  text: string;
}

export default function MenuArrow(props: Props) {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16
        }}>

        <Title2
          title={props.text}
          color={Colors.black}
        />

        <AntDesign name="rightcircleo" size={24} color={Colors.black} />

      </TouchableOpacity>
      <View style={{
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
      }} />
    </View>
  )
}