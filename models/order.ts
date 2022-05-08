import config from '../config/config.json';

const orders = {
    getOrders: async function getOrders(): Object {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    pickOrder: async function pickOrder(order: Object): Void {
        const items = order.order_items;


        for (const item of items) {
            const amount = items.amount;
            const stockChange = item.stock - item.amount;

            const dataObject = {
                id:item.product_id,
                name:item.name,
                api_key:config.api_key,
                stock:stockChange
            };

            let json = JSON.stringify(dataObject);
            let request = new XMLHttpRequest ();
            request.open("Put", `${config.base_url}/products`);
            request.setRequestHeader('Content-type','application/json; charset=utf-8');
            request.send(json);
        }
    },

    updateOrderStatus: async function updateOrderStatus(order:Object, status:Int):Void {
        const dataObject = {
            id:order.id,
            name:order.name,
            api_key:config.api_key,
            status_id:status
        };

        let json = JSON.stringify(dataObject);
        let request = new XMLHttpRequest ();
        request.open("Put", `${config.base_url}/orders`);
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
    },

    getOrder: async function getOrder(orderId:int) {
        const response = await fetch(`${config.base_url}/orders/${orderId}?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    }
}

export default orders;
