import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import InputField from '../molecules/InputField';
import Colors from '../../constants/Colors';
import IconButton from '../molecules/IconButton';
import Slider from '@react-native-community/slider';
import Title2 from '../atoms/Title2';
import SmallText from '../atoms/SmallText';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Coordinates from '../../models/Coordinates';
import Button from '../molecules/Button';
import { functions } from '../../utils/Functions';

type Props = {
    onGeolocation: (coords: Coordinates, address: Location.LocationGeocodedAddress) => void;
    withRadius?: boolean;
    onChangeRadius?: (radius: number) => void;
    onSelectAddress?: (coords: Coordinates, address: string) => void;
    onValidate: () => void;
}

export default function MyGeoSearch(props: Props) {

    const [location, setLocation] = useState<Location.LocationObjectCoords | undefined>(undefined);
    const [address, setAddress] = useState('');
    const [radius, setRadius] = useState(1000);
    const [isFocused, setIsFocused] = useState(false);

    const getPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Please grant permission to access your location.');
        }
        else {
            getCurrentLocation();
        }
    }

    const getCurrentLocation = async () => {
        const { coords } = await Location.getCurrentPositionAsync();
        setLocation(coords);
        const { latitude, longitude } = coords;
        const results = await Location.reverseGeocodeAsync({ latitude, longitude });
        props.onGeolocation(coords, results[0]);
    }

    /*const reverseGeocodeLocation = async () => {
        if (!location) {
            console.log('Location is not set');
            return;
        }
        const { latitude, longitude } = location;
        const results = await Location.reverseGeocodeAsync({ latitude, longitude });
        console.log(`Reverse Geocoded Address: ${results[0]}`);
        console.log(results[0]);
    }*/

    function onChangeRadius(value: number) {
        props.onChangeRadius && props.onChangeRadius(value);
        setRadius(value);
    }

    async function onSearch(data: any) {
        const coords = await Location.geocodeAsync(data.description);
        props.onSelectAddress && props.onSelectAddress(coords[0], data.description);
        setAddress(data.description);
        onBack();
    }

    function onBack() {
        setIsFocused(false);
    }

    return !isFocused ?
        <View style={{
            gap: 16,
        }}>
            <View style={styles.searchRow}>
                <InputField
                    placeholder="Rechercher une adresse"
                    value={address}
                    onChangeText={setAddress}
                    flex={1}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <IconButton
                    icon="mypos"
                    onPress={getPermissions}
                    backgroundColor={Colors.mainBlue}
                    iconColor="white"
                />
            </View>
            {
                props.withRadius &&
                <View>
                    <Title2 title="Rayon de recherche" isLeft />
                    <SmallText text="Définissez un rayon entre 0 et 20km pour votre projet" isLeft />
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={10000}
                        value={radius}
                        onValueChange={onChangeRadius}
                        step={500}
                        minimumTrackTintColor={Colors.mainBlue}
                        maximumTrackTintColor={Colors.white}
                        thumbImage={functions.getIconSource('sliderbtn')}
                    />
                    <Title2 title={`${radius / 1000}km`} />
                </View>
            }
            <Button
                title="Valider la zone"
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={props.onValidate}
            />

        </View>
        :
        <View style={{
            paddingTop: 40,
            padding: 10,
            width: '100%',
            height: '100%',
        }}>
            <GooglePlacesAutocomplete
                placeholder='Rechercher une adresse'
                minLength={5} // minimum length of text to search
                onPress={(data) => {
                    onSearch(data);
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                    language: 'fr', // language of the results
                }}
                textInputProps={{
                    autoFocus: true,
                    height: 50,
                    borderRadius: 16,
                    paddingLeft: 16,
                    backgroundColor: Colors.white,
                    fontFamily: 'poppins',
                }}

                styles={{
                    textInput: {
                        fontFamily: 'poppins',
                    },
                    description: {
                        fontFamily: 'poppins',
                    },
                    poweredContainer: {
                        display: 'none',
                    },
                }}
            />
            <IconButton
                icon="leftarrow"
                onPress={onBack}
                backgroundColor={Colors.mainBlue}
                iconColor="white"
            />
        </View>
}

const styles = StyleSheet.create({
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
        marginTop: 16
    },
    slider: {
        width: '100%',
        height: 40
    },
})

{/*
        <View style={styles.searchRow}>
            <InputField
                placeholder="Rechercher une adresse"
                value={address}
                onChangeText={setAddress}
                flex={1}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                    language: 'fr',
                }}
            />
            <IconButton
                icon="search"
                onPress={onSearch}
                backgroundColor={Colors.mainBlue}
                iconColor="white"
            />
        </View>
            */}