import config from '../config/config.json';

const productModel = {
    getProducts: async function getProducts(): Object {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },

    updatedProduct: async function updatedProduct(product: Object): Void {
        console.log(product);
        const productObject = {
            id: product.id,
            name: product.name,
            api_key: config.api_key,
            stock: product.stock
        }

        let json = JSON.stringify(productObject);
        let request = new XMLHttpRequest ();
        request.open("Put", `${config.base_url}/products`);
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
    }
}

export default productModel;
