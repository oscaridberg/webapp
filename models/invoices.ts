import config from '../config/config.json';
import orderModel from './order.ts';
import storage from "./storage";

const invoices = {
    getInvoices: async function getInvoices() {
        const token = await storage.readToken();

        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token.token
            }
        });
        const result = await response.json();

        return result.data;
    },

    addInvoice: async function addInvoice(invoice:Object) {
        const token = await storage.readToken();

        const order = await orderModel.getOrder(invoice.order_id);

        const total = invoices.totalPrice(order);

        const dueDate = invoices.getDueDate(invoice.invoice_date);

        const invoiceObject = {
            order_id: invoice.order_id,
            total_price: total,
            api_key: config.api_key,
            creation_date: invoice.invoice_date,
            due_date: dueDate
        };

        fetch(`${config.base_url}/invoices`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token.token,

            },
            body: JSON.stringify(invoiceObject)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);

        })
        orderModel.updateOrderStatus(order, 600);
    },

    totalPrice: function totalPrice(order:Object) {
        const total = [];

        order.order_items.map(product => total.push(product.price * product.amount));

        const sum = total.reduce((previousValue, currentValue) => previousValue + currentValue);

        return sum;
    },

    getDueDate: function getDueDate(date:string) {
        const stringToDate = Date.parse(date);

        const initialDate = new Date(stringToDate);

        const endDate = initialDate.setMonth(initialDate.getMonth() + 1);

        return new Date(endDate).toISOString().split('T')[0];
    }

}
export default invoices;
