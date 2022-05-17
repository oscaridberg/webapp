import config from '../config/config.json';

const deliveries = {
    getDeliveries: async function getDeliveries(): Object {
        const response = await fetch (`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    addDelivery: async function addDelivery(delivery: Object): Void {

        const deliveryObject = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            delivery_date: delivery.delivery_date,
            api_key: config.api_key,
            comment: delivery.comment ?? null
        };

        const response = await fetch(`${config.base_url}/deliveries`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deliveryObject)
        });

        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        return {
            title: "Delivery added",
            message: result.data.message,
            type: "success",
        };
    },
}

export default deliveries;
