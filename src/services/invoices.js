import axios from "axios"




const BASE = process.env.VUE_APP_API

  const getAllInvoices = async(token) => await axios.get(`${BASE}/all-invoices`, {
    headers: {
        'Authorization': `Bearer ${token}` // Set the authorization header
    }
});

const getInvoice = (id) => axios.get(`${BASE}/invoice${id}`)



const invoiceServiceOperarations = {
getAllInvoices,
getInvoice
}

export default invoiceServiceOperarations


