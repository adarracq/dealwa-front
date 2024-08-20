import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { functions } from '../../../../utils/Functions'
import Colors from '../../../../constants/Colors'
import BodyText from '../../../../components/atoms/BodyText'
import { showMessage } from 'react-native-flash-message'

type Props = {
    list: { title: string, info: string, icon: string }[]
}

export default function Benefits(props: Props) {

    function showInfo(info: string) {
        showMessage({
            message: info,
            type: 'info',
            icon: 'info',
            duration: 5000
        });
    }

    return (
        <View style={styles.container}>
            {
                props.list.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image
                            source={functions.getIconSource(item.icon)}
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: Colors.lightBlue
                            }} />
                        <BodyText text={item.title} style='italic' />
                        <TouchableOpacity
                            onPress={() => showInfo(item.info)}
                        >
                            <Image
                                source={functions.getIconSource('info')}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: Colors.lightBlue
                                }} />
                        </TouchableOpacity>
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
    }
})