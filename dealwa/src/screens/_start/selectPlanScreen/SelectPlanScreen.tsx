import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParams } from '../../../navigations/Nav';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../../constants/Colors';
import BodyText from '../../../components/atoms/BodyText';
import Button from '../../../components/molecules/Button';
import Title1 from '../../../components/atoms/Title1';
import SmallText from '../../../components/atoms/SmallText';
import TopMenu from '../../../components/molecules/TopMenu';
import Benefits from './components/Benefits';
import Plan from './components/Plan';

type Props = NativeStackScreenProps<NavParams, 'SelectPlan'>;

export default function SelectPlanScreen({ navigation, route }: Props) {

    const params = route.params;

    const [plan, setPlan] = useState(1);
    const [bill, setBill] = useState(0);

    const benefits0 = [
        {
            title: 'Fonctionnalités classiques',
            info: 'Personnalisation du profil.',
            icon: 'check',
        },
        {
            title: '1 zone de chalandise',
            info: 'Une zone de 2 kilomètres de diamètre sur le secteur de votre choix.',
            icon: 'marker',
        },
        {
            title: 'Jusqu’à 3 leads par mois',
            info: 'Vous pouvea voir jusqu’à 3 contacts maximum par mois.',
            icon: 'profile',
        },
    ];

    const benefits1 = [
        {
            title: 'Fonctionnalités avancées',
            info: 'Outils de personnalisation de votre profil, des options de personnalisation de l\'interface, choix des avis et des badges visibles sur le profil.',
            icon: 'check',
        },
        {
            title: '3 zone de chalandise',
            info: 'Choix de 3 zones de 2km ou 1 zone de 6km de diamètre sur le secteur de votre choix.',
            icon: 'marker',
        },
        {
            title: 'Leads illimités',
            info: 'Vous pouvez avoir des contacts illimités.',
            icon: 'profile',
        },
        {
            title: 'Jusqu\à 5 boosts par mois',
            info: 'Un boost augmente votre visibilité et vous fait apparaître en tête de liste pendant 24 heures.',
            icon: 'flash',
        },
    ];

    const plans0 = [
        {
            title: 'A l\'année',
            price: '7,49 € / mois',
            discount: '9,90 €',
            topInfo: 'Economisez 25%',
            bottomInfo: 'Soit 89,90 € facturé annuellement '
        },
        {
            title: 'Au mois',
            price: '9,90 € / mois',
            discount: undefined,
            topInfo: undefined,
            bottomInfo: 'Facturé mensuellement'
        },
    ];

    const plans1 = [
        {
            title: 'A l\'année',
            price: '14,99 € / mois',
            discount: '19,90 €',
            topInfo: 'Economisez 60 €',
            bottomInfo: 'Soit 179,90 € facturé annuellement '
        },
        {
            title: 'Au mois',
            price: '19,90 € / mois',
            discount: undefined,
            topInfo: undefined,
            bottomInfo: 'Facturé mensuellement'
        },
    ];

    function next() {
        navigation.navigate('Paiement', {
            plan: plan,
            bill: bill,
            email: params.email
        });

    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 20 }}>
                <Title1 title="Choisissez votre abonnement" />
                <SmallText text="Vous pourrez changer d’abonnement dans votre profil après votre inscription." isLeft />
                <View style={styles.topMenus}>
                    <TopMenu
                        text="Classique"
                        selected={plan === 0}
                        onPress={() => setPlan(0)}
                    />
                    <TopMenu
                        text="Premium"
                        selected={plan === 1}
                        topInfo='Le plus populaire'
                        onPress={() => setPlan(1)}
                    />
                </View>

                <Benefits list={plan === 0 ? benefits0 : benefits1} />

                <Plan
                    title={plan === 0 ? plans0[0].title : plans1[0].title}
                    price={plan === 0 ? plans0[0].price : plans1[0].price}
                    discount={plan === 0 ? plans0[0].discount : plans1[0].discount}
                    topInfo={plan === 0 ? plans0[0].topInfo : plans1[0].topInfo}
                    bottomInfo={plan === 0 ? plans0[0].bottomInfo : plans1[0].bottomInfo}
                    selected={bill === 0}
                    onPress={() => setBill(0)}
                />

                <Plan
                    title={plan === 0 ? plans0[1].title : plans1[1].title}
                    price={plan === 0 ? plans0[1].price : plans1[1].price}
                    discount={plan === 0 ? plans0[1].discount : plans1[1].discount}
                    topInfo={plan === 0 ? plans0[1].topInfo : plans1[1].topInfo}
                    bottomInfo={plan === 0 ? plans0[1].bottomInfo : plans1[1].bottomInfo}
                    selected={bill === 1}
                    onPress={() => setBill(1)}
                />

            </ScrollView>

            <Button
                title="Sélectionner cet abonnement"
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