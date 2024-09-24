import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Circle, Marker, Polygon } from 'react-native-maps'
import Coordinates from '../../models/Coordinates'
import MyMapMarker from '../../models/MyMapMarker'
import { functions } from '../../utils/Functions'
import Colors from '../../constants/Colors'
import Zone from '../../models/Zone'

type Props = {
    center: Coordinates;
    setCenter: (center: Coordinates) => void;
    onChangeCenter?: Coordinates;
    geolocationMarker?: MyMapMarker;
    zones?: any[];
    currentZone?: any;

}

export default function SelectZoneMap(props: Props) {

    const mapRef = React.useRef<MapView>(null);
    const [currentCenter, setCurrentCenter] = useState<Coordinates>(props.center);

    function handleRegionChange(region: { latitude: number, longitude: number }) {
        setCurrentCenter({
            latitude: region.latitude,
            longitude: region.longitude,
        });
    };


    function handleRegionChangeComplete(region: { latitude: number, longitude: number }) {
        props.setCenter({
            latitude: region.latitude,
            longitude: region.longitude,
        });
    };

    function setContour(contour: number[][]) {
        if (!contour) return [];
        let res = contour.map((c) => {
            return {
                latitude: c[1],
                longitude: c[0]
            }
        });
        console.log('res');
        return res;
    }


    // update zoom 
    useEffect(() => {
        let latDelta = 0.0922;
        let longDelta = 0.0421;

        mapRef.current?.animateToRegion({
            latitude: props.onChangeCenter?.latitude || props.center.latitude,
            longitude: props.onChangeCenter?.longitude || props.center.longitude,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta
        }, 2000);

    }, [props.onChangeCenter]);

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
            onRegionChangeComplete={handleRegionChangeComplete}
            onPress={(e) => {
                console.log('e', e.nativeEvent.coordinate);
                /*setCurrentCenter({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                });*/
            }}
        >
            <Marker
                coordinate={{
                    latitude: currentCenter.latitude,
                    longitude: currentCenter.longitude
                }}
                title="Centre de la zone"
                description="Déplacez le centre de la zone"
            >
                <Image
                    source={functions.getIconSource('epingle')}
                    style={styles.markerImage}
                />
            </Marker>
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
                        source={functions.getIconSource('mylocation')}
                        style={styles.markerImage}
                    />
                </Marker>
            }
            {
                props.currentZone &&
                <Polygon
                    coordinates={setContour(props.currentZone.contour.coordinates[0])}
                    strokeColor={Colors.mainBlue}
                    fillColor="rgba(18, 35, 196, 0.2)"
                    strokeWidth={2}
                />
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