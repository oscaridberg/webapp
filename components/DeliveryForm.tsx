import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, View, Pressable, Alert, Button, TextInput } from 'react-native';
import config from "../config/config.json";
import { Base, Typography, Forms } from '../styles/';
import deliveryModel from '../models/delivery.ts';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products.ts";
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';
import { showMessage } from "react-native-flash-message";


export default function DeliveryForm({ navigation }): Object {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        const result = await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updatedProduct(updatedProduct);

        if (result.type === "success"){
            navigation.navigate("Deliveries", { reload: true });
        };

        showMessage({
            message: result.title,
            description: result.message,
            type: result.type,
        });
    }

    return (
        <ScrollView>
            <View style={Base.buttonContainerNoBg}>
            <Text style={Base.listTitle}>New delivery</Text>
            <Text style={Forms.inputLabel}>Product:</Text>
            <ProductDropDown
                style={Forms.input}
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={Forms.inputLabel}>Amount:</Text>
            <TextInput
            style={Forms.input}
            onChangeText={(content: string) => {
                setDelivery({...delivery, amount: parseInt(content) })
            }}
            value={delivery?.amount?.toString()}
            keyboardType="numeric"
            />

            <Text style={Forms.inputLabel}>Date:</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={Forms.inputLabel}>Comment: (Optional)</Text>
            <TextInput
            style={Forms.input}
            onChangeText={(content: string) => {
                setDelivery({...delivery, comment: content })
            }}
            value={delivery?.comment}
            />

            <Pressable
                title="Add Delivery"
                onPress={() => {
                    addDelivery();
                }}
                style={Base.pressable}
            >
            <Text style={Base.button_text}>Add delivery</Text>
            </Pressable>
            </View>
        </ScrollView>
    )
}

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            style={Forms.input}
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemList}
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

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toISOString().split('T')[0],
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}
