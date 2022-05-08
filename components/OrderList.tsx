import { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles/';
import orderModel from '../models/order.ts';

export default function OrderList({ route, navigation }): Object {
    const { reload } = route.params || false;
    const [orders, setOrders] = useState([]);

    if (reload) {
        reloadOrders();
    };

    async function reloadOrders():Void {
        setOrders(await orderModel.getOrders());
    };

    useEffect(() => {
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setOrders(result.data));
    }, []);

    console.log(orders);


    const list = checkOrderStatus({ navigation }, orders)

    return (
        <View style={Base.buttonContainer}>
            <Text style={Base.listTitle}>Ready to be picked</Text>
            {list}
        </View>
    );
}

function checkOrderStatus({ navigation }, orders):List {
    let list:List = [];

    for (const order of orders) {
        if (order.status_id === 100) {
            list.push(<Pressable style={Base.pressable} title={order.name} key={order.id} onPress={() => navigation.navigate('Details', { order: order})}><Text style={Base.button_text}>{order.name}</Text></Pressable>);
        };
    }
    return list;
}
