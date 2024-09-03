import { StyleSheet, View } from 'react-native'
import { ProjectsNavParams } from '../../../navigations/ProjectsNav';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react';
import BottomArea from '../../../components/containers/BottomArea';
import Title1 from '../../../components/atoms/Title1';
import TopMenu from '../../../components/molecules/TopMenu';
import InputField from '../../../components/molecules/InputField';
import Button from '../../../components/molecules/Button';
import Colors from '../../../constants/Colors';
import { showMessage } from 'react-native-flash-message';
import Title2 from '../../../components/atoms/Title2';
import RadioButton from '../../../components/molecules/RadioButton';

type Props = NativeStackScreenProps<ProjectsNavParams, 'NewProject'>;

export default function NewProjectScreen({ navigation, route }: Props) {


    const [type, setType] = useState(0);
    const [description, setDescription] = useState('');

    function goToLocation() {
        if (description.length == 0) {
            showMessage({
                message: "Veuillez renseigner une description",
                type: "danger",
            });
            return;
        }
        navigation.navigate('NewProjectLocation', {
            type,
            description
        });
    }

    return (
        <View style={styles.container}>
            <Title1 title="Nouveau projet" centered />
            <View style={{ gap: 10 }}>
                <Title2 title="Type de projet" isLeft />
                <RadioButton
                    title="Achat"
                    selected={type == 0}
                    onPress={() => setType(0)}
                />
                <RadioButton
                    title="Vente"
                    selected={type == 1}
                    onPress={() => setType(1)}
                />
            </View>
            <InputField
                title='Déscription'
                placeholder="Décrivez votre projet en quelques mots"
                value={description}
                onChangeText={(text) => {
                    setDescription(text);
                }}
                isMultiline
                height={200}
            />
            <Button
                title="Suivant"
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={goToLocation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 70,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    topMenus: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
    }
})
