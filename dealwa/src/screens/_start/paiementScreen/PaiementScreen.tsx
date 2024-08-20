import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigations/Nav';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../../constants/Colors';
import BodyText from '../../../components/atoms/BodyText';
import Button from '../../../components/molecules/Button';
import Title1 from '../../../components/atoms/Title1';
import SmallText from '../../../components/atoms/SmallText';
import TopMenu from '../../../components/molecules/TopMenu';
import Paypal from './components/Paypal';
import CreditCardForm from './components/CreditCardForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Paiement'>;

export default function PaiementScreen({ navigation, route }: Props) {

    const [method, setMethod] = useState(0);
    const [creditCardValues, setCreditCardValues] = useState({ cardNumber: '', cardName: '', cardDate: '', cardCvv: '' });


    function next() {
        //TODO : complete the payment
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 20 }}>
                <Title1 title="Choisissez votre abonnement" />
                <SmallText text="Vous pourrez changer d’abonnement dans votre profil après votre inscription." isLeft />
                <View style={styles.topMenus}>
                    <TopMenu
                        text="Carte"
                        selected={method === 0}
                        icon='credit-card'
                        onPress={() => setMethod(0)}
                    />
                    <TopMenu
                        text="PayPal"
                        selected={method === 1}
                        icon='paypal'
                        onPress={() => setMethod(1)}
                        keepIconColor={true}
                    />
                </View>

                {
                    method === 0 &&
                    <CreditCardForm
                        setValues={(values) => {
                            setCreditCardValues(values)
                        }}
                    />
                }

                {
                    method === 1 &&
                    <Paypal email="votremail@email.com" />
                }

            </ScrollView>

            <Button
                title={method === 0 ? "Payer maintenant" : "Aller sur PayPal"}
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={next} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.lightGrey,
        padding: 20,
        paddingTop: 70
    },
    icon: {
        width: 48,
        height: 48,
        tintColor: Colors.darkGrey
    },
    topMenus: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center'
    }
})