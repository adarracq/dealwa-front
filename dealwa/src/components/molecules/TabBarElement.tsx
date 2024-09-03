import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { functions } from '../../utils/Functions';

type TabBarElementProps = {
    title: string;
    focused: boolean;
    name: string;
}

export default function TabBarElement(props: TabBarElementProps) {
    return (

        props.focused ?
            <View style={styles.containerFocused}>
                <Image
                    source={functions.getIconSource(props.name)}
                    style={styles.iconFocused}
                />
                <Text style={styles.title}>{props.title}</Text>
            </View>
            :
            <View >

                <Image
                    source={functions.getIconSource(props.name)}
                    style={styles.iconNotFocused}
                />
            </View>

    )
}

const styles = StyleSheet.create({
    containerFocused: {
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 16,
        paddingTop: 10,
        paddingBottom: 10,
        width: 80,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    iconFocused: {
        height: 24,
        width: 24,
        tintColor: Colors.mainBlue
    },
    iconNotFocused: {
        height: 24,
        width: 24,
        tintColor: Colors.white
    },
    title: {
        color: Colors.mainBlue,
        fontFamily: 'poppins-semibold',
        fontSize: 12,
    }
})