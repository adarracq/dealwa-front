import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import HeaderArea from '../containers/HeaderArea';
import PlusMinusInput from '../molecules/PlusMinusInput';
import BodyText from '../atoms/BodyText';
import Colors from '../../constants/Colors';
import PlusMinusInput2 from '../molecules/PlusMinusInput2';
import Project from '../../models/Project';
import NumberInput from '../molecules/NumberInput';

type Props = {
    project: Project;
    onChangeRooms: (value: number) => void;
    onChangeBedrooms: (value: number) => void;
    onChangeBathrooms: (value: number) => void;
    onChangeSurface: (value: number) => void;
    onChangeGardenSurface: (value: number) => void;
    onChangeBudget: (value: number) => void;
}

export default function SelectProjectDetails(props: Props) {

    return (
        <HeaderArea
            title="Détails du projet"
            titleColor={Colors.darkGrey}
        >
            <View style={{ padding: 16 }}>
                <PlusMinusInput2
                    title={(props.project.type == 1 || props.project.type == 3) ? 'Nb. Pièces' : 'Nb. Pièces Min.'}
                    subtitle='Entre 1 et 10'
                    value={props.project.nbRooms}
                    onChangeValue={props.onChangeRooms}
                    minVal={1}
                    maxVal={10}
                />
                <View style={styles.divider} />
                <PlusMinusInput2
                    title={(props.project.type == 1 || props.project.type == 3) ? 'Nb. Chambres' : 'Nb Chambres Min.'}
                    subtitle='Entre 0 et 10'
                    value={props.project.nbBedrooms}
                    onChangeValue={props.onChangeBedrooms}
                    minVal={0}
                    maxVal={10}
                />
                <View style={styles.divider} />
                <PlusMinusInput2
                    title={(props.project.type == 1 || props.project.type == 3) ? 'Nb. Salles de bain' : 'Nb Salles de bain Min.'}
                    subtitle='Entre 0 et 10'
                    value={props.project.nbBathrooms}
                    onChangeValue={props.onChangeBathrooms}
                    minVal={0}
                    maxVal={10}
                />
                <View style={styles.divider} />
                <NumberInput
                    title={(props.project.type == 1 || props.project.type == 3) ? 'Surface' : 'Surface Min.'}
                    subtitle='Entre 1 et 500m²'
                    value={props.project.surface}
                    onChangeValue={props.onChangeSurface}
                    minVal={1}
                    maxVal={500}
                />

                {
                    // if house or field, show garden surface
                    (props.project.categorie == 1 || props.project.categorie == 2) &&
                    <>
                        <View style={styles.divider} />
                        <NumberInput
                            title={props.project.type == 0 ? 'Surface jardin' : 'Surface jardin Min.'}
                            subtitle='Renseignez 0 si pas de jardin'
                            value={props.project.gardenSurface}
                            onChangeValue={props.onChangeGardenSurface}
                            minVal={0}
                            maxVal={100000}
                        />
                    </>
                }
                {
                    // if buy or rent, show budget
                    (props.project.type == 0 || props.project.type == 2) &&
                    <>
                        <View style={styles.divider} />
                        <NumberInput
                            title={'Budget Max.'}
                            subtitle={props.project.type == 0 ? 'Entre 1 000 et 2 000 000€' : 'Entre 50 et 10 000€'}
                            value={props.project.budget}
                            onChangeValue={props.onChangeBudget}
                            minVal={props.project.type == 0 ? 1000 : 50}
                            maxVal={props.project.type == 0 ? 2000000 : 10000}
                        />
                    </>
                }
            </View>
        </HeaderArea>
    )
}

const styles = StyleSheet.create({
    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
        marginTop: 10,
        marginBottom: 10,
    }
})