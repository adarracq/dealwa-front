import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../../../constants/Colors'
import SmallText from '../../../../components/atoms/SmallText'
import Title1 from '../../../../components/atoms/Title1'
import Title2 from '../../../../components/atoms/Title2'
import Title0 from '../../../../components/atoms/Title0'

type Props = {
    title: string,
    price: string,
    discount?: string,
    topInfo?: string,
    validity: string,
    isImportant?: boolean,
    onPress: () => void
}

export default function BuyBoost(props: Props) {
    return (
        <View style={{ flex: 1 }}>
            {
                props.topInfo &&
                <View style={{
                    position: 'absolute',
                    top: -10,
                    right: 16,
                    height: 20,
                    backgroundColor: Colors.lightGreen,
                    borderRadius: 16,
                    paddingLeft: 10,
                    paddingRight: 10,
                    zIndex: 1,
                }}>
                    <SmallText text={props.topInfo}
                        color={Colors.black}
                    />
                </View>
            }
            <View style={{
                position: 'absolute',
                top: -16,
                left: 16,
                zIndex: 10
            }}>
                <Title0
                    title={props.title}
                    color={Colors.mainBlue} />
            </View>
            <TouchableOpacity onPress={props.onPress}
                style={styles.container}>

                <View >
                    <Text></Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        justifyContent: 'center',
                    }}>
                        <Title0
                            title={props.price}
                            color={Colors.black} />
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
                        text={props.validity}
                        color={Colors.darkGrey} isLeft />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10,
        justifyContent: 'space-between',
        padding: 8,
        flex: 1,
        borderRadius: 16,
        backgroundColor: Colors.lightGrey,
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