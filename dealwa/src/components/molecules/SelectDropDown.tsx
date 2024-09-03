import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../constants/Colors';
import SmallText from '../atoms/SmallText';
import BodyText from '../atoms/BodyText';

type Props = {
    title: string,
    items: any[],
    onSelectItem: (item: any) => void
}

export default function SelectDropDown(props: Props) {
    return (
        <SelectDropdown
            data={props.items}
            onSelect={(selectedItem, index) => {
                props.onSelectItem(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <BodyText
                            text={(selectedItem && selectedItem.title) || 'Choisir ' + props.title}
                            style='bold'
                        >
                        </BodyText>
                        <AntDesign name={isOpened ? 'upcircleo' : 'downcircleo'} size={24} color={Colors.black} />
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                        <BodyText text={item.title} style='bold' />
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    );
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownMenuStyle: {
        backgroundColor: Colors.white,
        borderRadius: 16,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
});