import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../constants/Colors'
import LogoElement from '../../../components/molecules/LogoElement'
import BottomArea from '../../../components/containers/BottomArea'
import Title1 from '../../../components/atoms/Title1'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParams } from '../../../navigations/Nav'
import IconText from '../../../components/molecules/IconText'
import Button from '../../../components/molecules/Button'


type Props = NativeStackScreenProps<NavParams, 'Landing2'>;


export default function LandingScreen2({ navigation, route }: Props) {

    const type = route.params?.type;
    const [list, setList] = useState<string[]>();

    function goToLoginScreen() {
        navigation.navigate('Login', {
            type: type
        });
    }

    useEffect(() => {
        if (type == 'agent') {
            setList([
                'Augmentez votre visibilité et développez votre notoriété.',
                'Facilitez l’expansion de votre répertoire avec de nouveaux prospects.',
                'Booster votre productivité avec des outils performants.',
                'Optimisez et fluidifiez vos échanges ainsi que votre gestion administrative.',
                'Economisez de l’argent avec un outil de travail accessible à tous.'
            ])
        }
        else {
            setList([
                'Gagnez en temps et en énergie grâce à la géolocalisation.',
                'Comparez puis choisissez l’agent immobilier qui vous correspond.',
                'Fluidifiez vos échanges et simplifiez votre organisation.',
                'Profitez d’un accompagnement transparent et sur mesure.',
            ])
        }
    }, [type]);

    return (
        <View style={styles.container}>
            <LogoElement color={Colors.mainBlue} />
            <BottomArea backgroundColor={Colors.mainBlue}>
                <Title1 color={Colors.white} marginBottom={20} marginTop={20} centered
                    title={type === 'agent' ? "Réinventez votre façon de travailler avec Dealwa." : "Réinventez vos projets immobiliers avec Dealwa."} />
                {
                    list && list.map((item, index) => {
                        return <IconText key={index} text={item} icon="check" textColor={Colors.lightGrey} iconColor={Colors.white} />
                    })
                }
                <Button
                    backgroundColor={Colors.white}
                    title="Rejoignez notre communauté !"
                    onPress={goToLoginScreen} />
            </BottomArea>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.lightGrey
    }
})