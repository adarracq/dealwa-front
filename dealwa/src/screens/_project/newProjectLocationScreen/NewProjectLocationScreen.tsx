import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ProjectsNavParams } from '../../../navigations/ProjectsNav';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserContext } from '../../../contexts/UserContext';
import BottomArea from '../../../components/containers/BottomArea';
import MyGeoSearch from '../../../components/organisms/MyGeoSearch';
import * as Location from 'expo-location'
import MyMapMarker from '../../../models/MyMapMarker';
import Coordinates from '../../../models/Coordinates';
import { projectService } from '../../../services/project.service';
import { showMessage } from 'react-native-flash-message';
import Project from '../../../models/Project';
import MyProjectMap from '../../../components/organisms/MyProjectMap';
import { geoApiGouvService } from '../../../services/geoApiGouv';

type Props = NativeStackScreenProps<ProjectsNavParams, 'NewProjectLocation'>;

export default function NewProjectLocationScreen({ navigation, route }: Props) {

    const [userData, setUserData] = useContext(UserContext);
    const [center, setCenter] = useState({ latitude: 48.8588443, longitude: 2.2943506 });
    const [centerChanged, setCenterChanged] = useState<Coordinates>();
    const [marker, setMarker] = useState<MyMapMarker>();
    const [centerCircleRadius, setCenterCircleRadius] = useState<number>(1000);
    const [project, setProject] = useState<Project>(route.params.project);


    function onGeolocation(coords: Coordinates, address: Location.LocationGeocodedAddress) {

        setCenterChanged(coords);

        let posMarker = new MyMapMarker(
            coords,
            'Votre position',
            address.formattedAddress || '',
            'geolocation'
        );
        setMarker(posMarker);
    }

    function onSelectAddress(coords: Coordinates, address: string) {
        setTimeout(() => {
            setCenterChanged(coords);
            let posMarker = new MyMapMarker(
                coords,
                'Adresse sélectionnée',
                address,
                'selected_adress'
            );
            setMarker(posMarker);
        }, 100);
    }

    function onChangeRadius(radius: number) {
        if (radius == 0)
            radius = 50;
        setCenterCircleRadius(radius);
    }

    function onValidate() {
        geoApiGouvService.getByCoords(center.latitude, center.longitude)
            .then((response) => {
                console.log(response);
                if (response.length > 0) {
                    saveProject(response[0].nom);
                }
            })
            .catch((error) => {
                console.log('Error getting city', error);
            });
    }

    function saveProject(city: string) {
        projectService.create({
            ...project,
            coord: [center.latitude, center.longitude],
            radius: centerCircleRadius,
            address: city
        })
            .then((result) => {
                showMessage({
                    message: "Projet créé avec succès",
                    type: "success",
                });
                navigation.navigate('Home');
            }
            )
            .catch((error) => {
                console.log('Error creating project', error);
            });
    }

    useEffect(() => {
        onChangeRadius(1000);
    }, []);

    return (
        <View style={styles.container}>
            <MyProjectMap
                center={center}
                setCenter={setCenter}
                onChangeCenter={centerChanged}
                geolocationMarker={marker}
                centerCircleRadius={centerCircleRadius}
                showCenterCircle
            />
            <BottomArea>
                <MyGeoSearch
                    onGeolocation={onGeolocation}
                    withRadius
                    onChangeRadius={onChangeRadius}
                    onSelectAddress={onSelectAddress}
                    onValidate={onValidate}
                />
            </BottomArea>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})