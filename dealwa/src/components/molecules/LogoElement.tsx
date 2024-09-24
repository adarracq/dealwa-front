import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

type LogoElementProps = {
    subtitle?: string;
    color: any;
}

export default function LogoElement(props: LogoElementProps) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/logo_typo_white.png')}
                style={{
                    height: 200,
                    alignSelf: 'center',
                    tintColor: props.color,
                    objectFit: 'contain'

                }}
            />
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