import { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert, Button } from 'react-native';
import config from "../../config/config.json";
import { Base, Typography } from '../../styles/';
import invoiceModel from '../../models/invoices.ts';
import orderModel from '../../models/order.ts';
import authModel from '../../models/auth.ts';
import { NativeModules } from "react-native";
import { DataTable } from "react-native-paper";
import storage from "../../models/storage.ts";

export default function InvoicesHome({route, navigation, isLoggedIn}): Object {
    const [deliveries, setDeliveries] = useState([]);
    const [table, setTable] = useState([]);

    let invoices;

    useEffect (async () => {
        const token = await storage.readToken();

        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token.token
            }
        });

        const result = await response.json();
        invoices = await result

        setTable(invoicesTable(invoices));
    }, []);

    async function reloadInvoices() {
        setInvoices(await invoiceModel.getInvoices());
        invoicesTable(invoices);
    }

    function invoicesTable(data) {
        const invoices = data.data;

        const invoiceTable = [];

        invoices.map(invoice => {
            invoiceTable.push({name: invoice.name, price: invoice.total_price, due: invoice.due_date})
        });

        const table = invoiceTable.map((invoice, index) => {
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{invoice.name}</DataTable.Cell>
                    <DataTable.Cell>{invoice.price}</DataTable.Cell>
                    <DataTable.Cell>{invoice.due}</DataTable.Cell>
                </DataTable.Row>
            )
        });

        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Price</DataTable.Title>
                    <DataTable.Title>Due Date</DataTable.Title>
                </DataTable.Header>
                {table}
            </DataTable>

        );
    };
    return (
        <View style={Base.buttonContainer}>
            <Text style={Base.listTitle}>Sent invoices</Text>
            {table}
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
