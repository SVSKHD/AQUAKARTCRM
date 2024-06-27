import axios from "axios";

const BASE = process.env.VUE_APP_API_ECOM;

const getAllSubCategories = async () => await axios.get(`${BASE}/all-subcategories`);

const getSubCategory = (id) => axios.get(`${BASE}/subcategory/${id}`);


const EditSubCategory = (id, token , data) => axios.post(`${BASE}/subcategory-add/${id}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
},data);

const CreateSubCategory = (id, token , data) => axios.put(`${BASE}/subcategory-update/${id}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
}, data);

const DeleteSubCategory = (id, token) => axios.get(`${BASE}/subcategory/delete/${id}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
});


const SubCategoryServiceOperarations = {
  getAllSubCategories,
  getSubCategory,
  EditSubCategory,
  CreateSubCategory,
  DeleteSubCategory
};

export default SubCategoryServiceOperarations;
