import axios from "axios";

const BASE = process.env.VUE_APP_API_ECOM;

const getAllcategories = async () => await axios.get(`${BASE}/allcategories`);

const getCategory = (id) => axios.get(`${BASE}/category/${id}`);

const CategoryServiceOperarations = {
  getAllcategories,
  getCategory,
};

export default CategoryServiceOperarations;
