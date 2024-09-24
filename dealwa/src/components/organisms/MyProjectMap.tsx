import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Circle, Marker } from 'react-native-maps'
import Coordinates from '../../models/Coordinates'
import MyMapCircle from '../../models/MyMapCircle'
import MyMapMarker from '../../models/MyMapMarker'
import { functions } from '../../utils/Functions'
import Colors from '../../constants/Colors'

type Props = {
    center: Coordinates;
    setCenter: (center: Coordinates) => void;
    onChangeCenter?: Coordinates;
    centerCircleRadius?: number;
    geolocationMarker?: MyMapMarker;
    circles?: MyMapCircle[];
    zoneMarkers?: MyMapMarker[];
    projectMarkers?: MyMapMarker[];
    onClickProjectMarker?: (marker: MyMapMarker) => void;
    showCenterCircle?: boolean;
}

export default function MyProjectMap(props: Props) {

    const mapRef = React.useRef<MapView>(null);


    function handleRegionChange(region: { latitude: number, longitude: number }) {
        props.setCenter({
            latitude: region.latitude,
            longitude: region.longitude,
        });
    };

    // update zoom when change radius
    useEffect(() => {
        let latDelta = 0.0922;
        let longDelta = 0.0421;
        if (props.centerCircleRadius) {
            latDelta = 0.0922 * (props.centerCircleRadius / 4000);
            longDelta = 0.0421 * (props.centerCircleRadius / 4000);
        }

        mapRef.current?.animateToRegion({
            latitude: props.onChangeCenter?.latitude || props.center.latitude,
            longitude: props.onChangeCenter?.longitude || props.center.longitude,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta
        }, 2000);

    }, [props.centerCircleRadius, props.onChangeCenter]);

    function centerCircle() {
        if (props.centerCircleRadius && props.showCenterCircle) {
            return <Circle
                center={{
                    latitude: props.center.latitude,
                    longitude: props.center.longitude
                }}
                radius={props.centerCircleRadius == 0 ? 100 : props.centerCircleRadius}
                fillColor="rgba(18, 35, 196, 0.2)"
                strokeWidth={0}
            />
        }
        else return null;
    }

    return (
        <MapView style={styles.map}
            ref={mapRef}
            initialRegion={{
                latitude: props.center.latitude,
                longitude: props.center.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            zoomEnabled={true}
            zoomControlEnabled={true}
            zoomTapEnabled={true}
            onRegionChange={handleRegionChange}
        >
            {centerCircle()}
            {
                props.geolocationMarker &&
                <Marker
                    coordinate={{
                        latitude: props.geolocationMarker.coordinates.latitude,
                        longitude: props.geolocationMarker.coordinates.longitude
                    }}
                    title={props.geolocationMarker.title}
                    description={props.geolocationMarker.description}
                >
                    <Image
                        source={functions.getIconSource('epingle')}
                        style={styles.markerImage}
                    />
                </Marker>
            }
            {
                props.circles?.map((circle, index) => {
                    return (
                        <Circle
                            key={index}
                            center={{
                                latitude: circle.center.latitude,
                                longitude: circle.center.longitude
                            }}
                            radius={circle.radius}
                            fillColor="rgba(18, 35, 196, 0.2)"
                            strokeWidth={0}
                        />
                    )
                })
            }
            {
                /* props.zoneMarkers?.map((marker, index) => {
                     return (
                         <Marker
                             key={index}
                             coordinate={{
                                 latitude: marker.coordinates.latitude,
                                 longitude: marker.coordinates.longitude
                             }}
                             title={marker.title}
                             description={marker.description}
                         >
                             <Image
                                 source={functions.getIconSource('epingle')}
                                 style={styles.markerImage}
                             />
                         </Marker>
                     )
                 })*/
            }
            {
                props.projectMarkers?.map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.coordinates.latitude,
                                longitude: marker.coordinates.longitude
                            }}
                            title={marker.title}
                            description={marker.description}
                            onPress={() => props.onClickProjectMarker && props.onClickProjectMarker(marker)}
                        >
                            <Image
                                source={functions.getIconSource('marker')}
                                style={{
                                    width: 32,
                                    height: 32,
                                    tintColor: marker.type == 'project_buy' ? Colors.mainBlue : Colors.mainRed
                                }}
                            />
                        </Marker>
                    )
                })
            }

        </MapView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1,
        marginBottom: -16
    },
    markerImage: {
        width: 32,
        height: 32,
        tintColor: Colors.mainBlue
    }
})