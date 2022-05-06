import { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert, Button } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../../styles/';
import invoiceModel from '../../models/invoices.ts';
import orderModel from '../../models/order.ts';
import authModel from '../../models/auth.ts';
import { NativeModules } from "react-native";


export default function InvoicesHome({route, navigation, isLoggedIn}): Object {
    const [deliveries, setDeliveries] = useState([]);

    return (
        <View style={Base.buttonContainer}>
            <Text style={Base.listTitle}>Sent invoices</Text>
            <Pressable style={Base.pressable}
                onPress={() => {
                    navigation.navigate('Create Invoice');
                }}
            >
                <Text style={Base.button_text}>New invoice</Text>
            </Pressable>
            <Pressable
                title="Logout"
                onPress={() => {
                    authModel.logout();
                    isLoggedIn = false;
                    NativeModules.DevSettings.reload();
                    navigation.navigate('Inventory');
                }}
                style={Base.button_logout}
            >
            <Text style={Base.button_text}>Logout</Text>
            </Pressable>
        </View>
    );
}
