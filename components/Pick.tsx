import { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles/';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PickList from './Details.tsx';
import OrderList from './OrderList.tsx';

const Stack = createNativeStackNavigator();

export default function Pick():Object {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Pick Orders" component={OrderList}/>
            <Stack.Screen name="Details" component={PickList}/>
        </Stack.Navigator>
    );
}
