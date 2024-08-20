import { View, Text, Image } from 'react-native'
import React from 'react'
import { functions } from '../../../../utils/Functions';
import BodyText from '../../../../components/atoms/BodyText';
import Colors from '../../../../constants/Colors';

type Props = {
    email: string;
}

export default function Paypal(props: Props) {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginTop: 100
        }}>
            <Image
                source={functions.getIconSource('paypal')}
                style={{
                    width: 48,
                    height: 48,
                }} />
            <BodyText
                text="Vous allez être redirigé sur le site PayPal pour procéder au paiement"
                color={Colors.darkGrey}
                centered
            />
            <BodyText
                text={props.email}
                style='bold'
                centered
            />
        </View>
    )
}