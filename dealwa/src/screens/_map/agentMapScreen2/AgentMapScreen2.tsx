import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserContext } from '../../../contexts/UserContext';
import { AgentMapNavParams } from '../../../navigations/AgentMapNav';
import MyMap from '../../../components/organisms/MyMap';
import Coordinates from '../../../models/Coordinates';
import MyMapMarker from '../../../models/MyMapMarker';
import MyMapCircle from '../../../models/MyMapCircle';
import BottomArea from '../../../components/containers/BottomArea';
import MyGeoSearch from '../../../components/organisms/MyGeoSearch';
import { userService } from '../../../services/user.service';
import User from '../../../models/User';
import { showMessage } from 'react-native-flash-message';
import { projectService } from '../../../services/project.service';
import Project from '../../../models/Project';
import SwitchListMap from '../agentMapScreen/components/SwitchListMap';
import ProjectView from '../agentMapScreen/components/ProjectView';
import ProjectsList from '../agentMapScreen/components/ProjectsList';
import SelectZoneMap from '../../../components/organisms/SelectZoneMap';
import { geoApiGouvService } from '../../../services/geoApiGouv';
import Zone from '../../../models/Zone';

type Props = NativeStackScreenProps<AgentMapNavParams, 'HomeAgentMap2'>;

export default function AgentMapScreen2({ navigation, route }: Props) {

    const [userData, setUserData] = useContext(UserContext);
    const [isSelectingZone, setIsSelectingZone] = useState(false);

    const [center, setCenter] = useState({ latitude: 48.8588443, longitude: 2.2943506 });
    const [centerChanged, setCenterChanged] = useState<Coordinates>();
    const [marker, setMarker] = useState<MyMapMarker>();
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectSelected, setProjectSelected] = useState<Project>();
    const [projectMarkers, setProjectMarkers] = useState<MyMapMarker[]>([]);
    const [isList, setIsList] = useState(false);
    const [currentZone, setCurrentZone] = useState<Zone>();

    function getUser() {
        if (!userData)
            return;
        userService.getUserByEmail(userData.email)
            .then((user) => {
                getScreenToDisplay(user);
                setCirclesFromZones(user);
                loadProjects(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function loadProjects(user: User) {
        if (!user.zones || user.zones.length == 0)
            return;

        projectService.getProjectsInZones(user.zones)
            .then((projects) => {
                setProjects(projects);
                let _markers: MyMapMarker[] = [];
                projects.forEach((project: any) => {
                    _markers.push(new MyMapMarker(
                        new Coordinates(project.coord[1], project.coord[0]),
                        project.user_firstname,
                        project.type == 0 ? "Projet d'achat" : 'Projet de vente',
                        project.type == 0 ? 'project_buy' : 'project_sell'
                    ));
                });
                setProjectMarkers(_markers);
            })
            .catch((error) => {
                console.log(error);
            });
    }



    function getScreenToDisplay(user: any) {
        // Une seule ville
        if (user.plan == 0) {
            if (user.zones && user.zones.length == 1) {
                setIsSelectingZone(false);
            }
            else {
                Alert.alert('Aucune zone définie', 'Veuillez définir une zone pour continuer');
                setIsSelectingZone(true);
            }
        }
        // Trois villes
        else {
            if (user.zones && user.zones.length == 3) {
                setIsSelectingZone(false);
            }
            else {
                let nbZones = user.zones ? user.zones.length : 0;

                Alert.alert(
                    'Zone de chalandise',
                    'Il vous reste ' + (3 - nbZones) + ' zones à définir',
                );
                setIsSelectingZone(true);

            }
        }
    }

    function setCirclesFromZones(user: User) {
        if (!user.zones)
            return;

        let _circles: MyMapCircle[] = [];
        user.zones.forEach(zone => {
            _circles.push(zone);
        });

        let _zoneMarkers: MyMapMarker[] = [];
        user.zones.forEach(zone => {
            _zoneMarkers.push(new MyMapMarker(
                zone.center,
                'Zone de chalandise',
                'rayon: ' + zone.radius + 'm',
                'zone'
            ));
        });
        //setZoneMarkers(_zoneMarkers);

        // set center to zone center
        if (user.zones.length > 0) {
            setCenterChanged(user.zones[0].center);
        }
    }

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

    function onClickProjectMarker(marker: MyMapMarker) {
        // get project from marker
        let project = projects.find((p) => {
            return p.coord[1] == marker.coordinates.latitude && p.coord[0] == marker.coordinates.longitude;
        });
        setProjectSelected(project);
    }

    function onValidate() {
        Alert.alert(
            'Zone de chalandise',
            'Voulez-vous valider cette zone de chalandise ?',
            [
                {
                    text: 'Annuler',
                    onPress: () => { }
                },
                {
                    text: 'Valider',
                    onPress: () => {
                        let _center = center;
                        /*let newZone = new MyMapCircle(
                            new Coordinates(_center.latitude, _center.longitude),
                            'Zone de recherche',
                            'rgba(0, 0, 0, 0.2)',
                        );
                        userService.addZone(userData.email, newZone)
                            .then((result) => {
                                setIsZoneLock(false);
                                getUser();
                                showMessage({
                                    message: 'Zone de chalandise enregistrée',
                                    type: 'success'
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                                Alert.alert('Erreur', 'Une erreur est survenue lors de la sauvegarde de la zone');
                            });*/
                    }
                }
            ]
        );
    }

    // get the city from the center
    useEffect(() => {
        geoApiGouvService.getByCoords(center.latitude, center.longitude)
            .then((result) => {
                setCurrentZone(result[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [center]);



    useEffect(() => {
        if (!userData)
            return;
        getUser();
    }, [userData]);

    if (isSelectingZone) {
        return (
            <View style={styles.container}>
                <SelectZoneMap
                    center={center}
                    setCenter={setCenter}
                    onChangeCenter={centerChanged}
                    geolocationMarker={marker}
                    currentZone={currentZone}
                />

                <View style={{ zIndex: 1000 }}>
                    <BottomArea>
                        <MyGeoSearch
                            onGeolocation={onGeolocation}
                            onSelectAddress={onSelectAddress}
                            onValidate={onValidate}
                        />
                    </BottomArea>
                </View>
            </View>
        );
    }
    else {



        return (
            <View style={styles.container}>
                {
                    !isSelectingZone &&
                    <SwitchListMap
                        isList={isList}
                        onSwitch={() => setIsList(!isList)}
                    />
                }
                {
                    !isList ?
                        <>
                            <SelectZoneMap
                                center={center}
                                setCenter={setCenter}
                                onChangeCenter={centerChanged}
                                geolocationMarker={marker}
                            />
                            {
                                isSelectingZone ?
                                    <View style={{ zIndex: 1000 }}>
                                        <BottomArea>
                                            <MyGeoSearch
                                                onGeolocation={onGeolocation}
                                                onSelectAddress={onSelectAddress}
                                                onValidate={onValidate}
                                            />
                                        </BottomArea>
                                    </View>
                                    :
                                    projectSelected &&
                                    <ProjectView
                                        project={projectSelected}
                                        onClose={() => setProjectSelected(undefined)}
                                        onSeeProject={(project) => navigation.navigate('Project', { project: project })}
                                    />
                            }
                        </>
                        :
                        <ProjectsList
                            projects={projects}
                            onSeeProject={(project) => {
                                navigation.navigate('Project', { project: project });
                            }}
                        />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})