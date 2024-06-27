import axios from "axios";

const BASE = process.env.VUE_APP_API;
const UserLogin = (data) => axios.post(`${BASE}/user/login`, data);

const userServiceOperations = {
  UserLogin,
};
export default userServiceOperations;
