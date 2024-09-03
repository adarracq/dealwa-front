import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProjectsNavParams } from '../../../navigations/ProjectsNav';
import Title1 from '../../../components/atoms/Title1';
import Title2 from '../../../components/atoms/Title2';
import RadioButton from '../../../components/molecules/RadioButton';
import Colors from '../../../constants/Colors';
import IconButton from '../../../components/molecules/IconButton';
import { projectService } from '../../../services/project.service';
import { showMessage } from 'react-native-flash-message';
import InputField from '../../../components/molecules/InputField';

type Props = NativeStackScreenProps<ProjectsNavParams, 'EditProject'>;

export default function EditProjectScreen({ navigation, route }: Props) {

    const [project, setProject] = useState(route.params.project);
    const [type, setType] = useState(project.type);
    const [isChanged, setIsChanged] = useState(false);

    function save() {
        if (!isChanged || !project._id)
            return;

        projectService.update(project._id, {
            project: project
        }).then(() => {
            showMessage({
                message: 'Succès',
                description: 'Votre projet a été mis à jour',
                type: 'success',
            })
            setIsChanged(false);
            navigation.goBack();

        }).catch((error) => {
            showMessage({
                message: 'Erreur',
                description: 'Une erreur est survenue',
                type: 'danger',
            })
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ rowGap: 32, padding: 20, }}>
                <Title1 title="Modifier projet" centered />
                <View style={{ gap: 10 }}>
                    <Title2 title="Type de projet" isLeft />
                    <RadioButton
                        title="Achat"
                        selected={type == 0}
                        onPress={() => {
                            setType(0);
                            setProject({ ...project, type: type });
                            setIsChanged(true);
                        }}
                    />
                    <RadioButton
                        title="Vente"
                        selected={type == 1}
                        onPress={() => {
                            setType(1);
                            setProject({ ...project, type: type });
                            setIsChanged(true);
                        }}
                    />
                </View>
                <InputField
                    title='Description'
                    placeholder="Décrivez votre projet en quelques mots"
                    value={project.description}
                    onChangeText={(text) => {
                        setProject({ ...project, description: text });
                        setIsChanged(true);
                    }}
                    isMultiline
                    height={200}
                />
                <InputField
                    title='Adresse'
                    placeholder="Adresse du projet"
                    value={project.address}
                    onChangeText={(text) => {
                        setProject({ ...project, address: text });
                        setIsChanged(true);
                    }}
                    isMultiline
                />
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <IconButton
                    icon='save'
                    backgroundColor={isChanged ? Colors.mainBlue : Colors.lightGrey}
                    iconColor={isChanged ? Colors.white : Colors.darkGrey}
                    onPress={save}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        paddingTop: 70,
    }
})