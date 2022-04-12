import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";
<<<<<<< HEAD

export default function StockList() {
=======
import { Base, Typography } from '../styles/index.js';


export default function StockList():Object {
>>>>>>> a8aeca5 (finished for kmom02)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

<<<<<<< HEAD
    const list = products.map((product, index) => <Text style={styles.productList} key={index}>{ product.name } {product.stock}</Text>);

    return (
        <View>
            <Text style={styles.productHeader}>Inventory</Text>
=======
    const list = products.map((product, index) => <Text style={Base.productList} key={index}>{ product.name } {product.stock}</Text>);

    return (
        <View>
>>>>>>> a8aeca5 (finished for kmom02)
            {list}
        </View>
    );
}
<<<<<<< HEAD

const styles = StyleSheet.create({
    productList: {
        fontSize: 28,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: 'white',
    },
    productHeader: {
        color: '#111',
        fontSize: 32,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: 'pink',
        marginBottom: 5,
    }
})
=======
>>>>>>> a8aeca5 (finished for kmom02)
