import axios from "axios";

const BASE = process.env.VUE_APP_API_ECOM;

const getAllProducts = async () => await axios.get(`${BASE}/all-products`);

const getProduct = (id) => axios.get(`${BASE}/product/${id}`);

const ProductServiceOperarations = {
  getAllProducts,
  getProduct,
};

export default ProductServiceOperarations;
