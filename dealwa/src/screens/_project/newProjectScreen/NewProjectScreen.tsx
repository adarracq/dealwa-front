import { ScrollView, StyleSheet, View } from 'react-native'
import { ProjectsNavParams } from '../../../navigations/ProjectsNav';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useContext, useState } from 'react';
import BottomArea from '../../../components/containers/BottomArea';
import Title1 from '../../../components/atoms/Title1';
import TopMenu from '../../../components/molecules/TopMenu';
import InputField from '../../../components/molecules/InputField';
import Button from '../../../components/molecules/Button';
import Colors from '../../../constants/Colors';
import { showMessage } from 'react-native-flash-message';
import Title2 from '../../../components/atoms/Title2';
import RadioButton from '../../../components/molecules/RadioButton';
import SelectDropDown from '../../../components/molecules/SelectDropDown';
import ProjectDetails from '../../../constants/ProjectDetails';
import Project from '../../../models/Project';
import { UserContext } from '../../../contexts/UserContext';
import SelectProjectDetails from '../../../components/organisms/SelectProjectDetails';
import IconTextButton from '../../../components/molecules/IconTextButton';
import Tag from '../../../components/molecules/Tag';
import { functions } from '../../../utils/Functions';

type Props = NativeStackScreenProps<ProjectsNavParams, 'NewProject'>;

export default function NewProjectScreen({ navigation, route }: Props) {

    const [userData, setUserData] = useContext(UserContext);
    const [project, setProject] = useState<Project>({
        _id: null,
        user_id: userData._id,
        user_firstname: userData.firstname,
        date: new Date().toDateString(),
        tag: [],
        type: 0,
        categorie: -1,
        nbRooms: 1,
        nbBedrooms: 0,
        nbBathrooms: 0,
        surface: 0,
        gardenSurface: 0,
        budget: 0,
        description: '',
        coord: [],
        address: '',
        radius: 0,
        status: 0,
    });

    function goToLocation() {
        if (project.description.length == 0) {
            showMessage({
                message: "Veuillez renseigner une description",
                type: "danger",
            });
            return;
        }
        else if (project.categorie == -1) {
            showMessage({
                message: "Veuillez sélectionner une catégorie",
                type: "danger",
            });
            return;
        }

        navigation.navigate('NewProjectLocation', {
            project
        });
    }

    const pairs = [];
    for (let i = 0; i < ProjectDetails.types.length; i += 2) {
        pairs.push(ProjectDetails.types.slice(i, i + 2));
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ gap: 20, paddingLeft: 20, paddingRight: 20, }}>
                <Title1 title="Nouveau projet" centered />
                <View style={{ gap: 10 }}>
                    <Title2 title="Type de projet" isLeft />
                    {
                        pairs.map((pair, index) => (
                            <View key={index} style={{ flexDirection: 'row', gap: 10 }}>
                                {
                                    pair.map((type, subIndex) => (
                                        <RadioButton
                                            key={subIndex}
                                            title={type.label}
                                            selected={project.type == type.value}
                                            onPress={() => setProject({ ...project, type: type.value })}
                                        />
                                    ))
                                }
                            </View>
                        ))
                    }
                </View>
                <View style={styles.divider} />
                <SelectDropDown
                    title="Catégorie"
                    selected={project.categorie}
                    onSelectItem={(index) => setProject({ ...project, categorie: index.value })}
                    items={ProjectDetails.categories}
                />
                <View style={styles.divider} />
                <View style={{ flexDirection: 'row', gap: 10 }} >
                    {
                        ProjectDetails.tags.map((tag, index) => (
                            <Tag
                                key={index}
                                title={tag.label}
                                color={tag.color}
                                selected={project.tag.includes(index)}
                                onPress={() => setProject({ ...project, tag: project.tag.includes(index) ? project.tag.filter((item) => item != index) : [...project.tag, index] })}
                            />
                        ))
                    }
                </View>
                <SelectProjectDetails
                    project={project}
                    onChangeBedrooms={(value) => {
                        let nbRooms = project.nbRooms;
                        if (nbRooms < value)
                            nbRooms = value;
                        setProject({ ...project, nbBedrooms: value, nbRooms });
                    }}
                    onChangeBathrooms={(value) => setProject({ ...project, nbBathrooms: value })}
                    onChangeRooms={(value) => setProject({ ...project, nbRooms: value })}
                    onChangeSurface={(value) => setProject({ ...project, surface: value })}
                    onChangeGardenSurface={(value) => setProject({ ...project, gardenSurface: value })}
                    onChangeBudget={(value) => setProject({ ...project, budget: value })}
                />
                <InputField
                    title='Déscription'
                    placeholder="Décrivez votre projet en quelques mots"
                    value={project.description}
                    onChangeText={(text) => {
                        setProject({ ...project, description: text });
                    }}
                    isMultiline
                    height={200}
                />
                <Button
                    title="Suivant"
                    backgroundColor={Colors.mainBlue}
                    textColor={Colors.white}
                    onPress={goToLocation} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    divider: {
        height: 1,
        backgroundColor: Colors.white,
    }
})
