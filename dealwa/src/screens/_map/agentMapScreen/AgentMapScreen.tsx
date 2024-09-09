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
import ProjectView from './components/ProjectView';
import SwitchListMap from './components/SwitchListMap';
import ProjectsList from './components/ProjectsList';
import ZoneLocker from '../../../components/molecules/ZoneLocker';

type Props = NativeStackScreenProps<AgentMapNavParams, 'HomeAgentMap'>;

export default function AgentMapScreen({ navigation, route }: Props) {

    const [userData, setUserData] = useContext(UserContext);
    const [isSelectingZone, setIsSelectingZone] = useState(false);

    const [center, setCenter] = useState({ latitude: 48.8588443, longitude: 2.2943506 });
    const [centerChanged, setCenterChanged] = useState<Coordinates>();
    const [marker, setMarker] = useState<MyMapMarker>();
    const [centerCircleRadius, setCenterCircleRadius] = useState<number>();
    const [zoneMarkers, setZoneMarkers] = useState<MyMapMarker[]>([]);
    const [circles, setCircles] = useState<MyMapCircle[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectSelected, setProjectSelected] = useState<Project>();
    const [projectMarkers, setProjectMarkers] = useState<MyMapMarker[]>([]);
    const [isList, setIsList] = useState(false);
    const [isZoneLock, setIsZoneLock] = useState(false);
    const [circleLock, setCircleLock] = useState<MyMapCircle>();

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
        // Une seule zone de 2km
        if (user.plan == 0) {
            if (user.zones && user.zones.length == 1) {
                setIsSelectingZone(false);
                setCenterCircleRadius(undefined);
            }
            else {
                Alert.alert('Aucune zone définie', 'Veuillez définir une zone pour continuer');
                setIsSelectingZone(true);
                setCenterCircleRadius(2000);
            }
        }
        // Trois zones de 2km ou une zone de 6km
        else {
            if (
                user.zones && user.zones.length > 0 && user.zones[0].radius == 6000 ||
                user.zones && user.zones.length == 3
            ) {
                setIsSelectingZone(false);
                setCenterCircleRadius(undefined);
            }
            else {
                let nbZones = user.zones ? user.zones.length : 0;
                if (nbZones == 0) {
                    // Ask for one zone of 6km or 3 zones of 2km
                    Alert.alert(
                        'Zone de chalandise',
                        'Veuillez choisir entre une zone de chalandise de 6km de rayon ou trois zones de 2km de rayon',
                        [
                            {
                                text: 'Une zone(6km)',
                                onPress: () => {
                                    setIsSelectingZone(true);
                                    setCenterCircleRadius(6000);
                                }
                            },
                            {
                                text: '3 zones(2km)',
                                onPress: () => {
                                    setIsSelectingZone(true);
                                    setCenterCircleRadius(2000);
                                }
                            },
                        ]
                    );
                }
                else {
                    Alert.alert(
                        'Zone de chalandise',
                        'Il vous reste ' + (3 - nbZones) + ' zones à définir',
                    );
                    setIsSelectingZone(true);
                }
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
        setCircles(_circles);

        let _zoneMarkers: MyMapMarker[] = [];
        user.zones.forEach(zone => {
            _zoneMarkers.push(new MyMapMarker(
                zone.center,
                'Zone de chalandise',
                'rayon: ' + zone.radius + 'm',
                'zone'
            ));
        });
        setZoneMarkers(_zoneMarkers);

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

        // lock zone
        setTimeout(() => {
            setIsZoneLock(true);
        }, 2100);
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
        // lock zone
        setTimeout(() => {
            setIsZoneLock(true);
        }, 2500);
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
                        // si zone bloquée, on rajoute les coordonnées de la zone bloquée
                        if (isZoneLock && circleLock) {
                            _center = circleLock.center;
                        }

                        let newZone = new MyMapCircle(
                            new Coordinates(_center.latitude, _center.longitude),
                            centerCircleRadius || 1000,
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
                            });
                    }
                }
            ]
        );
    }

    useEffect(() => {
        // si zone bloquée, on la bloque en la rajoutant dans les cercles
        if (isZoneLock) {
            let circle = new MyMapCircle(
                new Coordinates(center.latitude, center.longitude),
                centerCircleRadius || 1000,
                'Zone de recherche',
                'rgba(0, 0, 0, 0.2)',
            );
            setCircleLock(circle);
            let _circles = circles.slice();
            _circles.push(circle);
            setCircles(_circles);

        }
        // si zone débloquée, on la débloque en la retirant des cercles
        else {
            let _circles = circles.filter((circle) => {
                return circle != circleLock;
            });
            setCircles(_circles);
        }
    }, [isZoneLock]);


    useEffect(() => {
        if (!userData)
            return;
        getUser();
    }, [userData]);

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
                isSelectingZone &&
                <ZoneLocker
                    isLock={isZoneLock}
                    onSwitch={() => setIsZoneLock(!isZoneLock)}
                />
            }
            {
                !isList ?
                    <>
                        <MyMap
                            center={center}
                            setCenter={setCenter}
                            onChangeCenter={centerChanged}
                            geolocationMarker={marker}
                            centerCircleRadius={centerCircleRadius}
                            circles={circles}
                            zoneMarkers={zoneMarkers}
                            projectMarkers={projectMarkers}
                            onClickProjectMarker={onClickProjectMarker}
                            showCenterCircle={!isZoneLock}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})