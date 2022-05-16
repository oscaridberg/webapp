import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, Alert } from 'react-native';
import config from "../config/config.json";
import { Base, Typography, Forms } from '../styles/';


export default function ShipList({ route, navigation }): Object {
    const { reload } = route.params || false;
    const [order, setOrder] = useState([]);
    let deliveryStatus:Str = '';

    useEffect(() => {
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setOrder(result.data));
    }, []);

    const list = checkOrders({ navigation }, order);

    if (list.length > 0) {
        deliveryStatus = 'Orders ready to be shipped';
    } else {
        deliveryStatus = 'No orders are ready to be shipped';
    }

    return (
    <ScrollView style={Base.base}>
        <View style={Base.buttonContainer}>
        <Text style={Base.listTitle}>{deliveryStatus}</Text>
        {list}
        </View>
    </ScrollView>
    );
}


function checkOrders({ navigation }, orders): List {
    let list:List = [];


    for (const order of orders) {
        if (order.status_id >= 200 && order.status_id <= 600) {

            list.push(<Pressable style={Base.pressable} title={order.name} key={order.id} onPress={() => navigation.navigate('Ship Order', { order: order})}><Text style={Base.button_text}>{order.name}</Text></Pressable>);
        }
    };

    return list;
}
