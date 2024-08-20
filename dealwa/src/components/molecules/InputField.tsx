import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import SmallText from '../atoms/SmallText';

type InputFieldProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onFocus?: () => void;
    errorText?: string | null;
    isPassword?: boolean;
    keyBoardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

export default function InputField(props: InputFieldProps) {

    const [isFocused, setIsFocused] = useState(false);

    const onFocus = () => {
        setIsFocused(true);
        if (props.onFocus) {
            props.onFocus();
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={{
                    height: 50,
                    width: '100%',
                    borderColor: props.errorText ? Colors.mainRed : Colors.lightBlue,
                    borderWidth: isFocused || props.errorText ? 2 : 0,
                    borderRadius: 16,
                    paddingLeft: 16,
                    backgroundColor: Colors.white,
                    fontFamily: 'poppins',
                }}
                onFocus={() => onFocus()}
                onBlur={() => setIsFocused(false)}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                secureTextEntry={props.isPassword}
                keyboardType={props.keyBoardType || 'default'}

            />
            {props.errorText && <SmallText text={props.errorText} color={Colors.mainRed} />}
        </View>
    )
}