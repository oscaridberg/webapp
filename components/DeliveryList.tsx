import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, Alert } from 'react-native';
import config from "../config/config.json";
import { Base, Typography, Forms } from '../styles/';
import deliveryModel from '../models/delivery.ts';

export default function DeliveryList({ route, navigation }): Object {
    const { reload } = route.params || false;
    const [deliveries, setDeliveries] = useState([]);
    let deliveryStatus:Str = '';

    if (reload) {
        reloadDelivers();
    };

    async function reloadDelivers(): Void {
        setDeliveries(await deliveryModel.getDeliveries());
    };

    useEffect(() => {
        fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setDeliveries(result.data));
    }, []);

    const list = checkDeliveries({ navigation }, deliveries);

    if (list.length > 0) {
        deliveryStatus = 'Incoming Deliveries';
    } else {
        deliveryStatus = 'No incoming deliveries';
    }
    return (
    <ScrollView>
        <View style={Base.buttonContainer}>
        <Text style={Base.listTitle}>{deliveryStatus}</Text>
        {list}
        <Pressable style={Base.pressable} onPress={() => navigation.navigate('DeliveryForm')}><Text style={Base.button_text}>Create new delivery</Text></Pressable>
        </View>
    </ScrollView>
    );
}

function checkDeliveries({ navigation }, deliveries): List {
    let list:List = [];

    for (const delivery of deliveries) {
        list.push(<View style={Base.delivery} key={delivery.id}><Text style={Base.deliveryContent}>{delivery.amount} pcs. {delivery.product_name}</Text><Text>Date: {delivery.delivery_date}</Text><Text>Comment: {delivery.comment}</Text></View>);
    };

    return list;
}
