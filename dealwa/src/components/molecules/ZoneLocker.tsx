import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../constants/Colors';
import { functions } from '../../utils/Functions';

type Props = {
    isLock: boolean;
    onSwitch: () => void;
}

export default function ZoneLocker(props: Props) {

    const [isLock, setIsLock] = React.useState(props.isLock);

    useEffect(() => {
        setIsLock(props.isLock);
    }, [props.isLock]);

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
                    setIsLock(!isLock);
                    props.onSwitch();
                }}
                style={{
                    backgroundColor: isLock ? Colors.mainBlue : Colors.lightGrey,
                    padding: 12,
                    borderRadius: 16,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image
                    source={isLock ? functions.getIconSource('lock') : functions.getIconSource('unlock')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: isLock ? Colors.white : Colors.darkGrey
                    }} />
            </TouchableOpacity>
        </View>
    )
}