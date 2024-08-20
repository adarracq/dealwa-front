import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../../constants/Colors'
import SmallText from '../../../../components/atoms/SmallText'
import Fontisto from '@expo/vector-icons/Fontisto';
import Title1 from '../../../../components/atoms/Title1'
import Title2 from '../../../../components/atoms/Title2';

type Props = {
    title: string,
    price: string,
    discount?: string,
    topInfo?: string,
    bottomInfo: string,
    selected: boolean,
    onPress: () => void
}

export default function Plan(props: Props) {
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

                <View style={{ gap: 10 }}>
                    <Title1
                        title={props.title}
                        color={props.selected ? Colors.white : Colors.darkGrey} />
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        justifyContent: 'space-between',
                        marginBottom: 10
                    }}>
                        <Title2
                            title={props.price}
                            color={props.selected ? Colors.white : Colors.darkGrey} />
                        {
                            props.discount &&
                            <Title2
                                title={props.discount}
                                color={Colors.darkGrey}
                                crossed={true}
                            />
                        }
                    </View>
                    <SmallText
                        text={props.bottomInfo}
                        color={Colors.lightGrey} />
                </View>

                {
                    props.selected ?
                        <Fontisto name="radio-btn-active" size={16} color={Colors.lightBlue} />
                        :
                        <Fontisto name="radio-btn-passive" size={16} color={Colors.lightGrey} />

                }
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
        justifyContent: 'space-between',
        padding: 16,
        flex: 1,
        borderRadius: 16,
        backgroundColor: Colors.white,
    },
    containerSelected: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-between',
        padding: 16,
        flex: 1,
        borderRadius: 16,
        backgroundColor: Colors.black,
        borderWidth: 4,
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