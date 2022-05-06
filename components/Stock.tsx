import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles/index.js';
import productModel from '../models/products.ts';
import keyboard from '../assets/keyboard.jpg';



export default function StockList({ route, navigation }):Object {
    const { reload } = route.params || false;

    const [products, setProducts] = useState([]);

    if (reload) {
        reloadProducts();
    };

    async function reloadProducts(): Void {
        setProducts(await productModel.getProducts());
    };

    reloadProducts();

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    const list = products2List({ navigation }, products);

    return (
        <View style={Base.buttonContainer}>
        <ScrollView style={Base.base}>
              <Text style={Base.listTitle}>Custom Keyboards</Text>
              <Image style={Base.image} source={keyboard} />
              {list}
        </ScrollView>
        </View>
    );
}

function products2List({ navigation }, products): List {
    let list:List = [];
    list.push(products.map((product, index) => <Text style={Base.productList} key={index}>{ product.name } {product.stock}</Text>));

    return list;
}
