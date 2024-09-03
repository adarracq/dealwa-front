import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileNavParams } from '../../../navigations/ProfileNav';
import Colors from '../../../constants/Colors';
import ProfileHeader from './components/ProfileHeader';
import User from '../../../models/User';
import { userService } from '../../../services/user.service';
import { UserContext } from '../../../contexts/UserContext';
import HeaderArea from '../../../components/containers/HeaderArea';
import MenuArrow from '../../../components/molecules/MenuArrow';
import AsyncStorageUser from '../../../utils/AsyncStorageUser';
import { useIsFocused } from '@react-navigation/native';
import Title1 from '../../../components/atoms/Title1';
import BuyBoost from './components/BuyBoost';
import SmallText from '../../../components/atoms/SmallText';

type Props = NativeStackScreenProps<ProfileNavParams, 'Home'>;

export default function ProfileScreen({ navigation, route }: Props) {

    const isFocused = useIsFocused();

    const [user, setUser] = useState<User>();
    const [userData, setUserData] = useContext(UserContext);

    function getUser() {
        userService.getUserByEmail(userData.email)
            .then((user: User) => {
                setUser(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function logout() {
        Alert.alert(
            'Déconnexion',
            'Voulez-vous vraiment vous déconnecter ?',
            [
                {
                    text: 'Annuler',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Oui', onPress: () => {
                        AsyncStorageUser.Logout();
                        setUserData(null);
                    }
                }
            ]
        );
    }


    useEffect(() => {
        if (!userData)
            return;
        getUser();
    }, [userData, isFocused]);


    return (
        user &&
        <ScrollView>
            <View style={styles.container}>
                <ProfileHeader
                    user={user}
                    onSeePublicProfile={() => navigation.navigate(
                        user.type == 'agent' ? 'PublicAgent' : 'PublicUser',
                        { user: user })}
                />
                <HeaderArea
                    title='Compte et paramètres'
                    titleColor={Colors.darkGrey}>
                    <MenuArrow
                        text='Renseignements personnels'
                        onPress={() => navigation.navigate('EditPerso', { user: user })} />
                    {
                        user.type == 'agent' &&
                        <MenuArrow
                            text='Informations professionnelles'
                            onPress={() => navigation.navigate('EditAgent', { user: user })} />
                    }
                    <MenuArrow
                        text='Compte'
                        onPress={() => console.log('compte')} />
                    <MenuArrow
                        text='Paramètres supplémentaires'
                        onPress={() => console.log('params')} />
                    <MenuArrow
                        text='Déconnexion'
                        onPress={logout} />
                </HeaderArea>
                {
                    user.type == 'agent' &&
                    <>
                        <HeaderArea
                            title='Votre abonnement'
                            titleColor={Colors.darkGrey}>
                            <View style={styles.headerText}>
                                <Title1
                                    title={user.plan == 0 ? 'Basic' : 'Premium'}
                                    color={Colors.mainBlue}
                                    centered
                                />
                            </View>
                            <View style={styles.bottomBorder} />
                            <MenuArrow
                                text='Mise à jour'
                                onPress={() => console.log('annonces')} />
                            <MenuArrow
                                text='Résilier'
                                onPress={() => console.log('avis')} />
                        </HeaderArea>

                        <HeaderArea
                            title='Vos boosts'
                            titleColor={Colors.darkGrey}>
                            <View style={styles.headerText}>
                                <Title1
                                    title={`${user.boosts ? user.boosts.length : '0'} boosts restants`}
                                    color={user.boosts ? Colors.mainBlue : Colors.darkGrey}
                                    centered
                                />
                            </View>
                            <View style={styles.bottomBorder} />
                            <View style={{ padding: 8 }}>
                                <SmallText
                                    text='Un boost augmente votre visibilité et vous fait apparaître en tête de liste pendant 24 heures.'
                                    color={Colors.darkGrey}
                                />
                            </View>
                            <View style={styles.boostsContainer}>
                                <BuyBoost
                                    title='1 Boost'
                                    price='2,49€'
                                    validity='Valable 7 jours'
                                    onPress={() => console.log('boost')} />
                                <BuyBoost
                                    title='5 Boosts'
                                    price='9,90€'
                                    discount='12,45€'
                                    validity='Valable 1 mois'
                                    topInfo='Economisez 25%'
                                    onPress={() => console.log('boost')} />
                                <BuyBoost
                                    title='12 Boosts'
                                    price='19,90€'
                                    discount='29,90€'
                                    validity='Valable 3 mois'
                                    topInfo='Economisez 10 €'
                                    isImportant
                                    onPress={() => console.log('boost')} />
                            </View>

                        </HeaderArea>
                        <HeaderArea
                            title='Vos Annonces'
                            titleColor={Colors.darkGrey}>
                            <MenuArrow
                                text='Mes annonces'
                                onPress={() => console.log('annonces')} />
                            <MenuArrow
                                text='Mes avis'
                                onPress={() => console.log('avis')} />
                        </HeaderArea>
                    </>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        flex: 1,
        backgroundColor: Colors.lightGrey,
        padding: 20,
        paddingTop: 70,
    },
    boostsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        justifyContent: 'space-between',
        padding: 16,
    },
    headerText: {
        padding: 16,
    },
    bottomBorder: {
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
    }
})