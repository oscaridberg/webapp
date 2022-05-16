import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, Alert, StyleSheet } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles/';
import MapView, { Marker } from 'react-native-maps';
import getCoordinates from '../models/nominatim.ts';
import * as Location from 'expo-location';

export default function ShipOrder({ route }) {
    const {order} = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
    (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});

        setLocationMarker(<Marker
            coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            }}
            title="Min plats"
            pinColor="blue"
        />);
    })();
    }, []);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);


            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    return (
        <View style={Base.base}>
            <Text style={Base.mapTitle}>{order.name}</Text>
            <Text style={Base.mapInfo}>{order.address}</Text>
            <Text style={Base.mapInfo}>{order.zip} {order.city}</Text>


            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.17024,
                        longitude: 14.86300,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
