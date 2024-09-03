import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../../constants/Colors'
import Title2 from '../../../../components/atoms/Title2'
import Title0 from '../../../../components/atoms/Title0'
import BodyText from '../../../../components/atoms/BodyText'
import Title1 from '../../../../components/atoms/Title1'
import Event from '../../../../models/Event'

type Props = {
    date: string,
    events: Event[]
}

export default function DayEvents(props: Props) {
    return (
        <View style={styles.container}>

            <View style={{
                position: 'absolute',
                top: -12,
                alignSelf: 'center',
            }}>
                <Title1 title={props.date}
                    color={Colors.mainBlue}
                />
            </View>

            {
                props.events.map((event, index) => (
                    <TouchableOpacity
                        onPress={() => console.log('Event clicked')}
                        key={index}
                    >
                        <View

                            style={styles.event}
                        >
                            <View style={styles.eventHours}>
                                <Title1 title={event.hourStart} />
                                <BodyText text={event.hourEnd} color={Colors.mainRed} />
                            </View>
                            <View style={styles.eventDetails}>
                                <Title2 title={event.title} />
                                <BodyText
                                    text={'Avec ' +
                                        event.guests.map(
                                            guest => guest.firstname ? guest.firstname : guest.email
                                        ).join(', ')}
                                    color={Colors.mainRed}
                                />
                            </View>
                        </View>
                        <View style={styles.border} />
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: 16,
        marginTop: 24,
        paddingTop: 8,
    },
    event: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 8,
    },
    eventHours: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    eventDetails: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    border: {
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
        width: '100%',
    }
})