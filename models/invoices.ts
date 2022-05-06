import config from '../../config/config.json';

const invoices = {
    getInvoices: async function getInvoices() {
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    };


}
