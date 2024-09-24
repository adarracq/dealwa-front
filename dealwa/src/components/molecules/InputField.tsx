import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import SmallText from '../atoms/SmallText';
import Title2 from '../atoms/Title2';
import Entypo from '@expo/vector-icons/Entypo';

type InputFieldProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    errorText?: string | null;
    isPassword?: boolean;
    keyBoardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad';
    flex?: number;
    isMultiline?: boolean;
    height?: number;
    title?: string;
}

export default function InputField(props: InputFieldProps) {

    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onFocus = () => {
        setIsFocused(true);
        if (props.onFocus) {
            props.onFocus();
        }
    }

    const onBlur = () => {
        setIsFocused(false);
        if (props.onBlur) {
            props.onBlur();
        }
    }

    const onShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <View style={{ flex: props.flex }}>
            <TextInput
                style={{
                    height: props.height ? props.height : props.isMultiline ? 100 : 50,
                    width: '100%',
                    borderColor: props.errorText ? Colors.mainRed : isFocused ? Colors.mainBlue : Colors.lightGrey,
                    borderWidth: isFocused || props.errorText ? 2 : 1,
                    borderRadius: 16,
                    paddingLeft: 16,
                    backgroundColor: Colors.white,
                    fontFamily: 'brother',
                    textAlignVertical: props.isMultiline ? 'top' : 'center',
                    paddingTop: props.isMultiline ? 16 : 0
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                secureTextEntry={props.isPassword && !showPassword}
                keyboardType={props.keyBoardType || 'default'}
                multiline={props.isMultiline}
            />
            {props.errorText && <SmallText text={props.errorText} color={Colors.mainRed} />}
            {
                props.title &&
                <View style={{
                    position: 'absolute',
                    top: -10,
                    left: 20,
                    paddingHorizontal: 5,
                    zIndex: 100,
                    backgroundColor: isFocused ? Colors.white : 'transparent',
                    borderRadius: 8,
                }}>
                    <Title2
                        title={props.title}
                        color={isFocused ? Colors.mainBlue : Colors.darkGrey}
                    />
                </View>
            }
            {
                props.isPassword &&
                <Entypo
                    onPress={onShowPassword}
                    style={{ position: 'absolute', right: 20, top: 13 }}
                    name={showPassword ? 'eye' : 'eye-with-line'}
                    size={24}
                    color={Colors.mainBlue} />
            }
        </View>
    )
}