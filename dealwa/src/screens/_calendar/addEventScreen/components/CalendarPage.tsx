import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Colors from '../../../../constants/Colors';
import DayEvents from './DayEvents';
import { functions } from '../../../../utils/Functions';
import SmallText from '../../../../components/atoms/SmallText';
import Event from '../../../../models/Event';

type Props = {
    events: Event[]
}

export default function CalendarPage(props: Props) {

    const [selected, setSelected] = useState('');
    const [markedDates, setMarkedDates] = useState<any>({});
    const [eventsOnSelectedDay, setEventsOnSelectedDay] = useState<Event[]>([]);

    LocaleConfig.locales['fr'] = {
        monthNames: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        today: "Aujourd'hui"
    };

    LocaleConfig.defaultLocale = 'fr';

    function addMarkedDates() {
        let markedDates: any = {};
        props.events.forEach(event => {
            // transform event.date (Date) to string AAAA-MM-JJ
            let date = event.date.toISOString().split('T')[0];
            markedDates[date] = { marked: true, dotColor: Colors.mainRed };
        });
        setMarkedDates(markedDates);
    }

    function onDayPress(day: any) {
        setSelected(day.dateString);
        // if there is event on this day, show them
        let eventsOnSelectedDay = props.events.filter(event => event.date.toISOString().split('T')[0] === day.dateString);

        setEventsOnSelectedDay(eventsOnSelectedDay);
    }

    useEffect(() => {
        addMarkedDates();
    }, [props.events]);


    return (
        <View style={styles.container}>
            <Calendar
                style={styles.calendar}
                onDayPress={(day: any) => {
                    onDayPress(day);
                }}
                markedDates={{
                    ...markedDates,
                    [selected]: { selected: true, selectedColor: Colors.mainBlue }
                }}
                theme={{
                    textSectionTitleColor: Colors.black,
                    selectedDayBackgroundColor: Colors.mainBlue,
                    selectedDayTextColor: Colors.white,
                    todayTextColor: Colors.lightBlue,
                    dayTextColor: Colors.black,
                    textDisabledColor: '#d9e1e8',
                    dotColor: Colors.mainRed,
                    selectedDotColor: Colors.mainRed,
                    arrowColor: Colors.mainBlue,
                    disabledArrowColor: Colors.lightGrey,
                    monthTextColor: Colors.mainBlue,
                    indicatorColor: Colors.mainBlue,
                    textDayFontFamily: 'brother',
                    textMonthFontFamily: 'avantt-bold',
                    textDayHeaderFontFamily: 'brother-bold',
                    textDayFontWeight: '600',
                    textDayHeaderFontWeight: '600',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 12
                }}
            />
            {
                eventsOnSelectedDay.length === 0 ?
                    <View style={{ alignItems: 'center', marginTop: 32 }}>
                        <SmallText text='Aucun événement ce jour'></SmallText>
                    </View>
                    :
                    <ScrollView>
                        <DayEvents
                            date={functions.dateToStringWithDayOfWeek(eventsOnSelectedDay[0].date)}
                            events={eventsOnSelectedDay}
                        />
                    </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        height: '100%',
        marginBottom: 80,
    },
    calendar: {
        borderRadius: 16,
        paddingBottom: 8,
    }
})