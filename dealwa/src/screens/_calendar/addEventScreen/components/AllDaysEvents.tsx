import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../../../constants/Colors'
import Event from '../../../../models/Event'
import DayEvents from './DayEvents'
import { functions } from '../../../../utils/Functions'

type Props = {
    events: Event[]
}

export default function AllDaysEvents(props: Props) {

    const [daysEvents, setDaysEvents] = React.useState<Event[][]>([]);

    function groupEventsByDay() {
        let _daysEvents: Event[][] = [];
        props.events.forEach(event => {
            let index = _daysEvents.findIndex(dayEvents => dayEvents[0].date.toDateString() === event.date.toDateString());
            if (index === -1) {
                _daysEvents.push([event]);
            } else {
                _daysEvents[index].push(event);
            }
        });
        setDaysEvents(_daysEvents);
    }

    useEffect(() => {
        groupEventsByDay();
    }, [props.events]);


    return (
        <ScrollView style={styles.container}>
            {
                daysEvents.map((dayEvents, index) => (
                    <DayEvents key={index} date={functions.dateToStringWithDayOfWeek(dayEvents[0].date)} events={dayEvents} />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Colors.lightGrey,
    },
})