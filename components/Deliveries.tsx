import { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert, ScrollView } from 'react-native';
import config from "../config/config.json";
import { Base, Typography, Forms } from '../styles/';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PickList from './Details.tsx';
import DeliveryList from './DeliveryList.tsx';
import deliveryModel from '../models/delivery.ts';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries({deliveries, setDeliveries, navigation}): Object {

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Deliveries">
                {(screenProps) => <DeliveryList {...screenProps} deliveries={deliveries} setDeliveries={setDeliveries} />}
            </Stack.Screen>

            <Stack.Screen name="DeliveryForm" component={DeliveryForm}/>
        </Stack.Navigator>
    );
};
            // <Stack.Screen name="Deliveries" component={DeliveryList}/>
