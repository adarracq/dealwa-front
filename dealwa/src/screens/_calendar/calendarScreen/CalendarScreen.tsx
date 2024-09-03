import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CalendarNavParams } from '../../../navigations/CalendarNav';
import TopMenu from '../../../components/molecules/TopMenu';
import Colors from '../../../constants/Colors';
import AllDaysEvents from './components/AllDaysEvents';
import Event from '../../../models/Event';
import CalendarPage from './components/CalendarPage';
import IconButton from '../../../components/molecules/IconButton';
import User from '../../../models/User';

type Props = NativeStackScreenProps<CalendarNavParams, 'Home'>;

export default function CalendarScreen({ navigation, route }: Props) {

    const [isList, setIsList] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);

    function getEvents() {
        // TODO: Get events from API
        const users = [
            new User('Thomas', 'Doe', 'test'),
        ];

        let _events: Event[] = [
            {
                _id: '1',
                date: new Date(),
                type: 1,
                asker: users[0],
                guests: users,
                title: 'Visite Appartement',
                description: 'Description 1',
                hourStart: '10:00',
                hourEnd: '11:00',
                status: 'pending'
            },
            {
                _id: '2',
                date: new Date(),
                type: 2,
                asker: users[0],
                guests: users,
                title: 'Déjeuner au Val D’été',
                description: 'Description 2',
                hourStart: '12:00',
                hourEnd: '13:00',
                status: 'pending'
            },
            // new event for tommorow
            {
                _id: '5',
                date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                type: 1,
                asker: users[0],
                guests: users,
                title: 'Visite Appartement',
                description: 'Description 5',
                hourStart: '10:00',
                hourEnd: '11:00',
                status: 'pending'
            },
            {
                _id: '6',
                date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                type: 2,
                asker: users[0],
                guests: users,
                title: 'Visite Appartement',
                description: 'Description 6',
                hourStart: '12:00',
                hourEnd: '13:00',
                status: 'pending'
            },
            {
                _id: '7',
                date: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
                type: 1,
                asker: users[0],
                guests: users,
                title: 'Visite Appartement',
                description: 'Description 7',
                hourStart: '14:00',
                hourEnd: '15:00',
                status: 'pending'
            },
            {
                _id: '8',
                date: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
                type: 2,
                asker: users[0],
                guests: users,
                title: 'Visite Appartement',
                description: 'Description 8',
                hourStart: '16:00',
                hourEnd: '17:00',
                status: 'pending'
            },
        ];

        setEvents(_events);
    }

    useEffect(() => {
        getEvents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.topMenus}>
                <TopMenu
                    text="Calendrier"
                    selected={!isList}
                    onPress={() => setIsList(false)}
                />
                <TopMenu
                    text="Liste"
                    selected={isList}
                    onPress={() => setIsList(true)}
                    keepIconColor={true}
                />
            </View>
            {
                isList ?
                    <AllDaysEvents events={events} />
                    :
                    <CalendarPage events={events} />
            }
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <IconButton
                    icon='plus'
                    backgroundColor={Colors.mainBlue}
                    iconColor={Colors.white}
                    onPress={() => navigation.navigate('AddEvent')}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 70,
    },
    topMenus: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
    }
})