import axios from "axios";

const BASE = process.env.VUE_APP_API_ECOM;

const getAllSubCategories = async () => await axios.get(`${BASE}/all-subcategories`);

const getSubCategory = (id) => axios.get(`${BASE}/subcategory/${id}`);

const SubCategoryServiceOperarations = {
  getAllSubCategories,
  getSubCategory,
};

export default SubCategoryServiceOperarations;
