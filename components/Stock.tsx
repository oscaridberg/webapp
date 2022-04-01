import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";

export default function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => <Text style={styles.productList} key={index}>{ product.name } {product.stock}</Text>);

    return (
        <View>
            <Text style={styles.productHeader}>Inventory</Text>
            {list}
        </View>
    );
}

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
