import axios from "axios"




const BASE = process.env.VUE_APP_API

  const getAllInvoices = async(token) => await axios.get(`${BASE}/all-invoices`, {
    headers: {
        'Authorization': `Bearer ${token}` // Set the authorization header
    }
});

const getInvoice = (token,id) => axios.get(`${BASE}/invoice/${id}`,{
    headers:{
         'Authorization': `Bearer ${token}`
    }
})



const invoiceServiceOperarations = {
getAllInvoices,
getInvoice
}

export default invoiceServiceOperarations


