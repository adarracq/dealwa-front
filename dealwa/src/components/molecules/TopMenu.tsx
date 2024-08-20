import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import BodyText from '../atoms/BodyText';
import { functions } from '../../utils/Functions';
import Title2 from '../atoms/Title2';
import Title1 from '../atoms/Title1';
import Colors from '../../constants/Colors';
import SmallText from '../atoms/SmallText';

type TopMenuProps = {
    text: string;
    icon?: any;
    selected?: boolean;
    topInfo?: string;
    keepIconColor?: boolean;
    onPress: () => void;
}

export default function TopMenu(props: TopMenuProps) {
    return (
        <View style={{ flex: 1 }}>
            {
                props.topInfo &&
                <View style={{
                    position: 'absolute',
                    top: -10,
                    height: 20,
                    alignSelf: 'center',
                    backgroundColor: Colors.lightGreen,
                    borderRadius: 16,
                    paddingLeft: 10,
                    paddingRight: 10,
                    zIndex: 1,
                    opacity: props.selected ? 1 : 0.5
                }}>
                    <SmallText text={props.topInfo}
                        color={props.selected ? Colors.black : Colors.darkGrey}
                    />
                </View>
            }
            <TouchableOpacity onPress={props.onPress}
                style={props.selected ? styles.containerSelected : styles.container}>
                {
                    props.icon &&
                        props.keepIconColor ?
                        <Image
                            source={functions.getIconSource(props.icon)}
                            style={{
                                width: 24,
                                height: 24,
                            }} />
                        :
                        <Image
                            source={functions.getIconSource(props.icon)}
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: props.selected ? Colors.white : Colors.darkGrey
                            }} />

                }

                <Title1
                    title={props.text}
                    color={props.selected ? Colors.white : Colors.darkGrey} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        height: 50,
        flex: 1,
        borderRadius: 16,
        backgroundColor: Colors.white,
    },
    containerSelected: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        height: 50,
        flex: 1,
        borderRadius: 16,
        backgroundColor: Colors.black,
        borderWidth: 2,
        borderColor: Colors.lightBlue,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
})