import { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert, Button } from 'react-native';
import config from "../../config/config.json";
import { Base, Typography, Forms } from '../../styles/';
import invoiceModel from '../../models/invoices.ts';
import orderModel from '../../models/order.ts'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';
import { Picker } from '@react-native-picker/picker';


export default function CreateInvoice({route, navigation}): Object {
    const [orders, setOrders] = useState([]);
    const [invoice, setInvoice] = useState<Partial<Delivery>>({});
    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

    async function addInvoice() {
        
    }

    useEffect(() => {
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setOrders(result.data));
    }, []);

    function sortOrders({navigation}, orders) {
        const list = [];


        for (const order of orders) {
            if (order.status_id === 200 || order.status_id === 300) {
                list.push(order);
            }
        }
        return list;
    };

    return (
        <View style={Base.buttonContainerNoBg}>
            <Text style={Base.listTitle}>New invoice</Text>
            <Text style={Forms.inputLabel}>Order:</Text>
            <OrderDropDown
            style={Forms.input}
            invoice={invoice}
            setInvoice={setInvoice}
            setCurrentOrder={setCurrentOrder}
            />
            <Text style={Forms.inputLabel}>Date:</Text>
            <DateDropDown
                style={Forms.input}
                invoice={invoice}
                setInvoice={setInvoice}
                setCurrentOrder={setCurrentOrder}
            />

            <Pressable style={Base.pressable}>
                <Text style={Base.button_text}>Send invoice</Text>
            </Pressable>
        </View>


    )

};


function OrderDropDown(props) {
    const [orders, setOrders] = useState<Product[]>([]);
    let ordersHash: any = {};

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    console.log(orders);



    const orderList = orders.filter(order => order.status_id === 200 || order.status_id === 300).map((order, index) => {
        ordersHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            style={Forms.input}
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.order, order_id: itemValue });
                props.setCurrentOrder(ordersHash[itemValue]);
            }}>
            {orderList}
        </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View style={Forms.date}>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Select date" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoice({
                            ...props.invoice,
                            invoice_date: date.toISOString().split('T')[0],
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}
