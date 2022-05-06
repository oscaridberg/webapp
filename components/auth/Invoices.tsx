import { Image, StyleSheet, Text, View, ScrollView, Button, Pressable } from 'react-native';
import AuthModel from '../../models/auth';
import { NativeModules } from "react-native";
import { Base, Typography, Forms } from '../../styles/';
import CreateInvoice from './CreateInvoice';
import InvoicesHome from './InvoicesHome';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


export default function Invoices({route, navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Invoices" component={InvoicesHome} />
            <Stack.Screen name="Create Invoice" component={CreateInvoice} />
        </Stack.Navigator>
    )
}
