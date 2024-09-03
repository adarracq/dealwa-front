import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../../constants/Colors'
import User from '../../../../models/User'
import { functions } from '../../../../utils/Functions'
import BodyText from '../../../../components/atoms/BodyText'
import Title1 from '../../../../components/atoms/Title1'
import IconTextButton from '../../../../components/molecules/IconTextButton'
import * as ImagePicker from 'expo-image-picker';
import { userService } from '../../../../services/user.service'

type ProfileHeaderProps = {
    user: User;
    onSeePublicProfile: () => void;
}

export default function ProfileHeader(props: ProfileHeaderProps) {

    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);

            let uri = result.assets[0].uri;
            const formData = new FormData();
            const response = await fetch(uri);
            const blob = await response.blob();
            formData.append('image', blob);


            await userService.uploadPicture(props.user.email, formData)
                .then(() => {
                    console.log('Image updated');
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    };



    function getFirstNameAndAge() {
        let res = '';
        if (props.user.firstname) {
            res += props.user.firstname;
        }
        if (props.user.birthdate) {
            res += `, ${functions.getAgeFromBirthdate(props.user.birthdate)}`;
        }
        return res;
    }

    return (
        <View style={styles.container}>
            {
                props.user.imageUrl ?
                    <Image
                        source={{ uri: props.user.imageUrl ?? '' }}
                        style={styles.image} />
                    :
                    <View style={styles.image} />
            }
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity onPress={pickImage}
                style={styles.editBtn}>

                <Image
                    source={functions.getIconSource('camera')}
                    style={{
                        width: 16,
                        height: 16,
                        tintColor: Colors.mainBlue,
                        alignSelf: 'center'
                    }} />
                <BodyText
                    text={props.user.imageUrl ? 'Modifier' : 'Ajouter'}
                    color={Colors.mainBlue}
                />
            </TouchableOpacity>
            <Title1
                title={getFirstNameAndAge()}
                color={Colors.black}
            />
            <IconTextButton
                onPress={props.onSeePublicProfile}
                backgroundColor={Colors.mainBlue}
                icon='profile'
                text='Voir profil public'
                color={Colors.white}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 24,
        gap: 16
    },
    editBtn: {
        borderRadius: 16,
        backgroundColor: Colors.lightGrey,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: -36,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    image: {
        width: 128,
        height: 128,
        borderRadius: 100,
        marginTop: -50,
        backgroundColor: Colors.darkGrey,
        borderColor: Colors.mainBlue,
        borderWidth: 2
    }
})