import Axios from "axios";
let url = process.env.VUE_APP_BASE_API;

const createAppointment = (token, data) =>
  Axios.post(`${url}/appointments`, JSON.stringify(data), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const updateAppointment = (token, data) =>
  Axios.post(`${url}/appointments`, JSON.stringify(data), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const deleteAppointment = async (token, id) =>
  await fetch(`${url}/appointments/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getAppointmentsByDate = (token, data) =>
  Axios.get(`${url}/appointments/${data}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getAppointments = (token) =>
  Axios.get(`${url}/appointments`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getLocationsType = (token, data) =>
  fetch(`${url}/register/searchThirdPartyLookup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));

const getAppointmentType = async (token) =>
  await Axios.get(`${url}/appointmenttype/getTypeList`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getCaseListType = (token) =>
  Axios.get(`${url}/case/getIdAndNames`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getInvitees = async (token) =>
  await Axios.get(`${url}/Person/getPersonList`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

//case-workers
const getAssignees = async (token) =>
  await Axios.get(`${url}/register/getAllUsers`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

// getparticipantsbyCaseId
const getParticipantsByCaseId = async (token, id) =>
  await Axios.get(`${url}/case/getParticipantsByCaseId?id=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

//getcaseworkerbyCaseId
const getCaseWorkerByCaseId = async (token, id) =>
  await Axios.get(`${url}/case/getCaseWorkerByCaseId?id=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

//getAppointmentbyId
const getAppointmentById = async (token, id) =>
  await Axios.get(`${url}/appointments/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const useSchedulerFunctions = () => {
  return {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentType,
    getInvitees,
    getAssignees,
    getAppointments,
    getLocationsType,
    getCaseListType,
    getParticipantsByCaseId,
    getCaseWorkerByCaseId,
    getAppointmentById,
    getAppointmentsByDate,
  };
};

export default useSchedulerFunctions;
