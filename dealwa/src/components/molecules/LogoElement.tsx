import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Title0 from '../atoms/Title0';
import Title2 from '../atoms/Title2';
import Colors from '../../constants/Colors';

type LogoElementProps = {
    subtitle?: string;
    color: any;
}

export default function LogoElement(props: LogoElementProps) {
    return (
        <View style={styles.container}>
            <Title0 title="DEALWA" color={props.color} compressed />
            <Image
                source={require('../../assets/img/logo.png')}
                style={{
                    height: 150,
                    alignSelf: 'center',
                    tintColor: props.color,
                    objectFit: 'contain'

                }}
            />
            <Title2 title='Deal with an agent' color={props.color} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10,
        flex: 1,

    }
})