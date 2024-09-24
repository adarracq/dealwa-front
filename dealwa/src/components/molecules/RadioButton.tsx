import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Title2 from '../atoms/Title2';
import Colors from '../../constants/Colors';
import Fontisto from '@expo/vector-icons/Fontisto';
import BodyText from '../atoms/BodyText';

type RadioButtonProps = {
  title: string;
  onPress: () => void;
  selected: boolean;
}

export default function RadioButton(props: RadioButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress}
      style={props.selected ? styles.containerSelected : styles.container}>

      <BodyText text={props.title} />
      {
        props.selected ?
          <Fontisto name="radio-btn-active" size={16} color={Colors.lightBlue} />
          :
          <Fontisto name="radio-btn-passive" size={16} color={Colors.lightGrey} />

      }

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    height: 50,
    borderRadius: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
  containerSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    height: 50,
    borderRadius: 16,
    backgroundColor: Colors.white,
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.lightBlue,

  }

})