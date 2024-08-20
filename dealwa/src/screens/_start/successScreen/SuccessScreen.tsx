import { View } from 'react-native'
import React, { useEffect } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigations/Nav';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../../constants/Colors';
import BodyText from '../../../components/atoms/BodyText';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

export default function SuccessScreen({ navigation, route }: Props) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 2000);
    }, []);


    return (
        <View style={{ flex: 1, justifyContent: 'center', gap: 10 }}>
            <AntDesign name="check" size={24} color="white"
                style={{
                    padding: 16,
                    backgroundColor: Colors.mainBlue,
                    borderRadius: 50,
                    alignSelf: 'center'
                }}
            />
            <BodyText text="Terminé" centered />
        </View>
    )

}
