import { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles/';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShipList from './ShipList.tsx';
import ShipOrder from './ShipOrder.tsx';
// import OrderList from './OrderList.tsx';

const Stack = createNativeStackNavigator();

export default function Pick():Object {
    return (
        <Stack.Navigator initialRouteName="Ship">
            <Stack.Screen name="Ship List" component={ShipList}/>
            <Stack.Screen name="Ship Order" component={ShipOrder}/>

        </Stack.Navigator>
    );
}
