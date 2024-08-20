import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Title2 from '../../../../components/atoms/Title2'
import InputField from '../../../../components/molecules/InputField'

type CreditCardFormProps = {
    setValues: (values: { cardNumber: string, cardName: string, cardDate: string, cardCvv: string }) => void;
}


export default function CreditCardForm(props: CreditCardFormProps) {

    const [cardNumber, setCardNumber] = React.useState('');
    const [cardName, setCardName] = React.useState('');
    const [cardDate, setCardDate] = React.useState('');
    const [cardCvv, setCardCvv] = React.useState('');

    const onChangeCardDate = (text: string) => {
        if (text.length === 2 && !text.includes('/')) {
            text = text + '/'
        }
        setCardDate(text)
    }

    const onChangeCardCvv = (text: string) => {
        if (text.length > 3) {
            return
        }
        setCardCvv(text)
    }

    useEffect(() => {
        props.setValues({
            cardNumber,
            cardName,
            cardDate,
            cardCvv
        })
    }, [cardNumber, cardName, cardDate, cardCvv])

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            gap: 10,
            marginTop: 20
        }}>
            <Title2 title="Informations de la carte" />
            <InputField
                placeholder="1234 5678 9101 1121"
                value={cardNumber}
                keyBoardType='numeric'
                onChangeText={(text) => setCardNumber(text)}
            />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
                marginBottom: 20
            }}>
                <InputField
                    placeholder="MM/YY"
                    value={cardDate}
                    keyBoardType='numeric'
                    onChangeText={(text) => onChangeCardDate(text)}
                />
                <InputField
                    placeholder="CVV"
                    value={cardCvv}
                    keyBoardType='numeric'
                    onChangeText={(text) => onChangeCardCvv(text)}
                />

            </View>

            <InputField
                placeholder="Nom sur la carte"
                value={cardName}
                onChangeText={(text) => setCardName(text)}
            />


        </View>
    )
}