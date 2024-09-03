import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParams } from '../../../navigations/Nav';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../../constants/Colors';
import BodyText from '../../../components/atoms/BodyText';
import Button from '../../../components/molecules/Button';
import Title1 from '../../../components/atoms/Title1';
import SmallText from '../../../components/atoms/SmallText';
import TopMenu from '../../../components/molecules/TopMenu';
import Paypal from './components/Paypal';
import CreditCardForm from './components/CreditCardForm';
import { userService } from '../../../services/user.service';
import AsyncStorageUser from '../../../utils/AsyncStorageUser';
import { UserContext } from '../../../contexts/UserContext';

type Props = NativeStackScreenProps<NavParams, 'Paiement'>;

export default function PaiementScreen({ navigation, route }: Props) {

    const [userData, setUserData] = useContext(UserContext);
    const [method, setMethod] = useState(0);
    const [creditCardValues, setCreditCardValues] = useState({ cardNumber: '', cardName: '', cardDate: '', cardCvv: '' });


    function subscribePlan() {

        //TODO : complete the payment

        userService.update(route.params.email, {
            plan: route.params.plan,
            bill: route.params.bill,
            subscriptionDate: new Date(),
            expirationDate: getExpirationDate()
        }).then((response) => {
            AsyncStorageUser.setUser(response);
            setUserData(response);
            navigation.navigate('Home');
        }).catch((error) => {
            console.log('error');
        });
    }

    function getExpirationDate() {
        if (route.params.bill == 1) {
            return new Date(new Date().setMonth(new Date().getMonth() + 1));
        }
        if (route.params.bill == 0) {
            return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }
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
                onPress={subscribePlan} />
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