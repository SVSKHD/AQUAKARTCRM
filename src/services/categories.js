import axios from "axios";

const BASE = process.env.VUE_APP_API_ECOM;

const getAllcategories = async () => await axios.get(`${BASE}/allcategories`);

const getCategory = (id) => axios.get(`${BASE}/category/${id}`);

const EditCategory = (id, token , data) => axios.post(`${BASE}/category-add/${id}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
},data);

const CreateCategory = (id, token , data) => axios.put(`${BASE}/category-update/${id}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
}, data);

const DeleteCategory = (id, token) => axios.get(`${BASE}/category/delete/${id}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
});



const CategoryServiceOperarations = {
  getAllcategories,
  getCategory,
  EditCategory,
  DeleteCategory,
  CreateCategory
};

export default CategoryServiceOperarations;
