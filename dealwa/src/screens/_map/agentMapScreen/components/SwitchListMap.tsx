import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../../constants/Colors';
import { functions } from '../../../../utils/Functions';

type Props = {
    isList: boolean;
    onSwitch: () => void;
}

export default function SwitchListMap(props: Props) {

    const [isList, setIsList] = React.useState(props.isList);

    return (
        <View style={{
            position: 'absolute',
            top: 48,
            right: 24,
            backgroundColor: Colors.lightGrey,
            padding: 2,
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            zIndex: 1000
        }}>
            <TouchableOpacity
                onPress={() => {
                    if (!isList) {
                        setIsList(true);
                        props.onSwitch();
                    }
                }}
                style={{
                    backgroundColor: isList ? Colors.mainBlue : Colors.lightGrey,
                    padding: 12,
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 4
                }}>
                <Image
                    source={functions.getIconSource('list')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: isList ? Colors.white : Colors.darkGrey
                    }} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    if (isList) {
                        setIsList(false);
                        props.onSwitch();
                    }
                }}
                style={{
                    backgroundColor: !isList ? Colors.mainBlue : Colors.lightGrey,
                    padding: 12,
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image
                    source={functions.getIconSource('map3')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: !isList ? Colors.white : Colors.darkGrey
                    }} />
            </TouchableOpacity>
        </View>
    )
}