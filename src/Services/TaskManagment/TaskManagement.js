import Axios from "axios";

let url = process.env.VUE_APP_BASE_API;

const createTask = (token, data) =>
  Axios.post(`${url}/tasks`, JSON.stringify(data), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const updateTask = (token, data) =>
  Axios.post(`${url}/tasks`, JSON.stringify(data), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const deleteTask = (token, data) => {
  Axios.delete(`${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

const getTaskType = async (token) =>
  await Axios.get(`${url}/tasktypes`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getTaskPriority = async (token) =>
  await Axios.get(`${url}/taskpriorities`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getTaskStatus = async (token) =>
  await Axios.get(`${url}/taskstatuses`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getCommonUser = async (token) =>
  await Axios.get(`${url}/commonusers/summary`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getGroupUser = async (token) =>
  await Axios.get(`${url}/groups/loggedinuser`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getGroupUserForCaseSupervisor = async (token) =>
  await Axios.get(`${url}/groups`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getTaskReporter = async (token) =>
  await Axios.get(`${url}/commonusers/summary`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getCommonUserTasksById = async (token, id) =>
  await Axios.get(`${url}/tasks/assignee/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getGroupTasksById = async (token, id) =>
  await Axios.get(`${url}/tasks/group/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getAllTasks = async (token) =>
  await Axios.get(`${url}/tasks`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getTaskById = async (token, id) =>
  await Axios.get(`${url}/tasks/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const TaskApiOperations = () => {
  return {
    createTask,
    updateTask,
    deleteTask,
    getTaskType,
    getTaskPriority,
    getTaskStatus,
    getCommonUser,
    getGroupUser,
    getGroupUserForCaseSupervisor,
    getTaskReporter,
    getGroupTasksById,
    getCommonUserTasksById,
    getAllTasks,
    getTaskById,
  };
};
export default TaskApiOperations;
