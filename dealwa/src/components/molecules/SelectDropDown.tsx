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
    onSelectItem: (item: any) => void,
    selected?: number,
}

export default function SelectDropDown(props: Props) {
    return (
        <SelectDropdown
            data={props.items}
            defaultValue={props.selected}
            onSelect={(selectedItem, index) => {
                props.onSelectItem(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <BodyText
                            text={(selectedItem && selectedItem.label) || 'Choisir ' + props.title}
                            style={(selectedItem && selectedItem.label) ? 'regular' : 'bold'}
                            color={(selectedItem && selectedItem.label) ? Colors.black : Colors.darkGrey}
                        />
                        <AntDesign name={isOpened ? 'upcircleo' : 'downcircleo'} size={24} color={Colors.darkGrey} />
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                        <BodyText text={item.label} />
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