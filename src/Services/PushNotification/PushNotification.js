import Axios from "axios";
let url = process.env.VUE_APP_BASE_API;

const getNotificationsType = (token) =>
  Axios.get(`${url}/notificationtypes`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
const getNotificationscount = (token) =>
  Axios.get(`${url}/notifications/count`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
const getNotificationByTypeId = async (token, notificationTypeId) =>
  await Axios.get(
    `${url}/notifications/notificationType/${notificationTypeId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

const pushNotificationServices = () => {
  return {
    getNotificationsType,
    getNotificationByTypeId,
    getNotificationscount,
  };
};

export default pushNotificationServices;
