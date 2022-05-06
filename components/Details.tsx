import { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert, Button } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles/';
import orderModel from '../models/order.ts';

export default function PickList({ route, navigation }):Object {
    const { order } = route.params;

    async function pick(): Void {
        await orderModel.pickOrder(order);
        await orderModel.updateOrderStatus(order);
        navigation.navigate("Pick Orders", { reload: true });
    };

    function checkInventory(order:Object):Object {
        const items = order.order_items;
        let inStock = true;

        for (const item of items) {
            if (item.stock - item.amount < 0) {
                inStock = false;
                break;
            }
        }
        if (inStock) {
            return (
                <Button title='Pick order' onPress={pick}/>
            )
        }
        return (
            <Text style={Base.noStock}>Not enough items in stock.</Text>
        )
    };

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text key={index}>
            {item.name} | {item.amount} | {item.location}
        </Text>
    });

    return (
        <View>
            <Text>Name: {order.name}</Text>
            <Text>Adress: {order.address}</Text>
            <Text>Zip: {order.zip}</Text>

            <Text>Products - Amount - Location: </Text>
            {orderItemsList}

            {checkInventory(order)}
        </View>
    )
};
