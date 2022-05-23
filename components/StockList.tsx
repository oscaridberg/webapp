import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles/index.js';

export default function StockList({ navigation }, products): List {
    let list:List = [];
    list.push(products.map((product, index) => <Text style={Base.productList} key={index}>{ product.name } {product.stock}</Text>));

    return list;
}
