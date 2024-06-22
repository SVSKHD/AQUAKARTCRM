import Axios from "axios";

let url = process.env.VUE_APP_BASE_API;

const userLogin = async (data) =>
  await Axios.post(`${url}/register/authenticate`, data);

const userRole = async (token) =>
  Axios.get(`${url}/commonusers/roles`, {
    headers: {
      "Access-Control-Allow-Origin": `${url}/register/authenticate`,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const userOperations = () => {
  return { userLogin, userRole };
};

export default userOperations;
