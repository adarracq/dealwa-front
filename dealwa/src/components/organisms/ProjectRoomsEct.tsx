import { View, StyleSheet } from 'react-native'
import React from 'react'
import Project from '../../models/Project'
import IconText from '../molecules/IconText';
import Colors from '../../constants/Colors';
import Title2 from '../atoms/Title2';
import ProjectDetails from '../../constants/ProjectDetails';
import Title0 from '../atoms/Title0';
import BodyText from '../atoms/BodyText';
import Title1 from '../atoms/Title1';

type Props = {
    project: Project;
}

export default function ProjectRoomsEct(props: Props) {

    function rooms() {
        return (
            <View style={styles.fieldContainer}>
                <IconText
                    icon='room'
                    text={props.project.nbRooms.toString() + ' pièces'}
                    textColor={Colors.darkGrey}
                />
            </View>
        )
    }

    function bedrooms() {
        let text = '';
        if (props.project.type == 0 || props.project.type == 2) {
            text += '> ';
        }
        text += props.project.nbBedrooms.toString() + ' chambres';

        return (
            <IconText
                icon='bedroom'
                text={text}
                textColor={Colors.darkGrey}
            />
        )
    }

    function bathrooms() {
        let text = '';
        if (props.project.type == 0 || props.project.type == 2) {
            text += '> ';
        }
        text += props.project.nbBathrooms.toString() + ' salles de bain';
        return (
            <IconText
                icon='bathroom'
                text={text}
                textColor={Colors.darkGrey}
            />
        )
    }

    function surface() {
        return (
            <View style={styles.fieldContainer}>
                <IconText
                    icon='expand'
                    text={props.project.surface.toString() + ' m²'}
                    textColor={Colors.darkGrey}
                />
            </View>
        )
    }

    function gardenSurface() {

        let text = 'Terrain ';
        if (props.project.type == 0 || props.project.type == 2) {
            text += '> ';
        }
        text += props.project.gardenSurface.toString() + 'm²';

        return (
            <IconText
                icon='surface'
                text={text}
                textColor={Colors.darkGrey}
            />
        )
    }

    function getPrice() {
        let price = '';
        price += props.project.budget.toString() + ' €';
        // separate thousands
        price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return price;
    }

    function getTitle() {
        let title = '';
        title += ProjectDetails.categories[props.project.categorie].label + ' ';
        title += props.project.nbRooms + ' pièces ';
        if (props.project.type == 0 || props.project.type == 2)
            title += '(min), ';
        title += props.project.surface + ' m²';
        if (props.project.type == 0 || props.project.type == 2)
            title += '(min) ';
        return title;
    }

    function getPriceBySurface() {
        return Math.round(props.project.budget / props.project.surface) + ' €/m²';
    }

    function getColor(type: number) {
        return (type == 0 || type == 2) ? Colors.mainBlue : Colors.mainRed;
    }

    return (
        <View style={styles.container}>
            <Title1
                title={props.project.type == 0 ? 'Projet d\'achat' :
                    props.project.type == 1 ? 'Projet de vente' :
                        props.project.type == 2 ? 'Projet de location' :
                            props.project.type == 3 ? 'Projet de gestion locative' : ''}
                color={getColor(props.project.type)}
                centered
            />
            <View style={styles.divider} />
            <Title2
                title={getTitle()}
                color={Colors.black}
                isLeft
            />
            <View style={styles.divider} />
            <IconText
                icon='marker'
                text={props.project.address}
                textColor={Colors.black}
                iconColor={Colors.black}
                textStyle='bold'
            />
            {(props.project.type == 0 || props.project.type == 2) &&
                <>
                    <View style={styles.divider} />
                    <View style={styles.priceContainer}>
                        <Title0
                            title={'< ' + getPrice()}
                            color={Colors.black}
                        />
                        <BodyText
                            text={getPriceBySurface()}
                            color={Colors.darkGrey}
                        />
                    </View>
                </>
            }
            <View style={styles.divider} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {bedrooms()}
                {bathrooms()}
            </View>
            {
                (props.project.categorie == 1 || props.project.categorie == 2) &&
                <>
                    {gardenSurface()}
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Colors.white,
        gap: 10,
        borderRadius: 16,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fieldContainer: {
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderRadius: 16,
        padding: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        gap: 10,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
    },
})