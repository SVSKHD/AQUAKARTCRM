import { ref, computed } from "vue";
import TaskApiOperations from "../../Services/TaskManagment/TaskManagement";
import NotificationHelper from "@/helpers/notificationHelpers/notificationHelper";
import { useStore } from "vuex";
import Store from "@/store";

let groupOrUserTaskForDragAndDrop = ref(false);

let DrawerStatus = ref(false);
let ReloadTasks = ref(false);
let loadingStatus = ref(false);
let filterChangeStatus = ref(false);
let createChangeStatus = ref(false);
let ReloadTasksByGroup = ref(false);
let GroupById = ref(false);
let CommonUserById = ref(false);
let RoleHideStatus = ref(false);
let groupChangeToggle = ref(false);
let groupChangeValue = ref("");
let updateData = ref("");
let userHide = ref(false);
const ID = ref("");
const userId = ref("");
const groupId = ref("");
let dragId = ref("");
let localToken = computed(() => Store.getters.token);


const {
  getAllTasks,
  getTaskType,
  getTaskStatus,
  getCommonUser,
  getGroupUser,
  getGroupUserForCaseSupervisor,
  getTaskById,
  getTaskPriority,
  getTaskReporter,
  createTask,
  updateTask,
  getCommonUserTasksById,
  getGroupTasksById,
} = TaskApiOperations();

const { createErrorNotification, createSuccessNotification } =
  NotificationHelper;

const getAllTypesOfColumns = (token, fetchedDataInArray) =>
  getAllTasks(token).then((data) => {
    const apiData = data.data;
    fetchedDataInArray.push({});
  });

const userManiupulations = (role) => {
  if (role === "Case Supervisor") {
    userHide.value = false;
    console.log("case-supervisor", userHide.value);
  } else if (role === "Case Worker") {
    userHide.value = true;
    console.log("case-worker user", userHide.value);
  } else if (role === "System User") {
    userHide.value = true;
    console.log("system user", userHide.value);
  } else {
    userHide.value = true;
  }
};

const getAllTypesOfTasks = (token, fetchedDataInArray) =>
  getTaskType(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      fetchedDataInArray.push({
        id: data.taskTypeId,
        label: data.name,
      });
    });
  });

const getAllPriorityList = (token, fetchedDataInArray) => {
  getTaskPriority(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      fetchedDataInArray.push({
        id: data.priorityId,
        label: data.name,
      });
    });
  });
};

const getAllRepoterList = (token, fetchedDataInArray) => {
  getTaskReporter(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      fetchedDataInArray.push({
        label: data.cusUserTxt,
        id: data.cusId,
      });
    });
  });
};

const getCommonUsersList = (token, dataFetchArray) =>
  getCommonUser(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      dataFetchArray.push({
        id: data.cusId,
        label: data.cusUserTxt,
      });
    });
  });

const getGroupUsersList = (token, dataFetchArray) => {
  const Store = useStore();
  if (Store.getters.role === "Case Supervisor") {
    getGroupUserForCaseSupervisor(token).then((data) => {
      let apiData = data.data;
      apiData.map((data) => {
        dataFetchArray.push({
          id: data.groupId,
          label: data.name,
        });
      });
    });
  } else {
    getGroupUser(token).then((data) => {
      let apiData = data.data;
      apiData.map((data) => {
        dataFetchArray.push({
          id: data.groupId,
          label: data.name,
        });
      });
    });
  }
};

const getGroupUsers = (token, dataFetchArray) =>
  getGroupUserForCaseSupervisor(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      dataFetchArray.push({
        id: data.groupId,
        label: data.name,
      });
    });
  });

const getAllTaskStatus = async (
  token,
  fetchedDataInArray,
  fetchedDataInArray2
) =>
  await getTaskStatus(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      fetchedDataInArray.push({
        id: data.taskStatusId,
        name: data.name,
      });
      fetchedDataInArray2.push({
        id: data.taskStatusId,
        label: data.name,
      });
    });
  });

//Alltasks
const pushTasks = (data, fillingArray) => {
  fillingArray.push({
    id: data.taskId,
    name: data.subject,
    description: data.description,
    priority: data.priority ? data.priority.priorityId : "",
    priorityName: data.priority ? data.priority.name : "no priority",
    taskStatusId:data.taskStatus.taskStatusId
  });
  fillingArray.sort((a, b) => b.priority - a.priority);
};
const LoadAlltasks = async (
  token,
  tasktypeArray,
  data1,
  data2,
  data3,
  data4,
  data5
) =>
  await getAllTasks(token).then((data) => {
    data1.splice(0, data1.length);
    data2.splice(0, data2.length);
    data3.splice(0, data3.length);
    data4.splice(0, data4.length);
    data5.splice(0, data5.length);
    let apiData = data.data;
    apiData.map((data) => {
      let status = data.taskStatus;
      if (status === null) {
      } else if (status.name === tasktypeArray[0].name) {
        pushTasks(data, data1);
      } else if (status.name === tasktypeArray[1].name) {
        pushTasks(data, data2);
      } else if (status.name === tasktypeArray[2].name) {
        pushTasks(data, data3);
      } else if (status.name === tasktypeArray[3].name) {
        pushTasks(data, data4);
      } else if (status.name === tasktypeArray[4].name) {
        pushTasks(data, data5);
      }
    });
  });

const updateUserTasks = (data) => {
  const id = data;
  ID.value = data;
  userId.value = data;
  // if (status === true) {
  //   GroupById.value = true;
  //   CommonUserById.value = false;
  // } else if (status == false) {
  //   GroupById.value = false;
  //   CommonUserById.value = true;
  // } else {
  //   GroupById.value = false;
  //   CommonUserById.value = false;
  // }
};

const updateGroupTasksInCaseWorker = (id) => {
  ID.value = id;
  groupId.value = id;
  GroupById.value = true;
};

const LoadTasksByGroup = (
  token,
  id,
  tasktypeArray,
  data1,
  data2,
  data3,
  data4,
  data5
) => {
  id = id ? id : (id = 1);
  getGroupTasksById(token, id).then((data) => {
    let apiData = data.data;
    data1.splice(0, data1.length);
    data2.splice(0, data2.length);
    data3.splice(0, data3.length);
    data4.splice(0, data4.length);
    data5.splice(0, data5.length);
    apiData.map((data) => {
      let status = data.taskStatus;
      if (status === null) {
      } else if (status.name === tasktypeArray[0].name) {
        pushTasks(data, data1);
      } else if (status.name === tasktypeArray[1].name) {
        pushTasks(data, data2);
      } else if (status.name === tasktypeArray[2].name) {
        pushTasks(data, data3);
      } else if (status.name === tasktypeArray[3].name) {
        pushTasks(data, data4);
      } else if (status.name === tasktypeArray[4].name) {
        pushTasks(data, data5);
      }
    });
    GroupById.value = false;
  });
};

const LoadTasksByCommonUsers = (
  token,
  id,
  tasktypeArray,
  data1,
  data2,
  data3,
  data4,
  data5
) => {
  id = id ? id : (id = 1);
  getCommonUserTasksById(token, id).then((data) => {
    let apiData = data.data;
    data1.splice(0, data1.length);
    data2.splice(0, data2.length);
    data3.splice(0, data3.length);
    data4.splice(0, data4.length);
    data5.splice(0, data5.length);
    apiData.map((data) => {
      let status = data.taskStatus;
      if (status === null) {
      } else if (status.name === tasktypeArray[0].name) {
        pushTasks(data, data1);
      } else if (status.name === tasktypeArray[1].name) {
        pushTasks(data, data2);
      } else if (status.name === tasktypeArray[2].name) {
        pushTasks(data, data3);
      } else if (status.name === tasktypeArray[3].name) {
        pushTasks(data, data4);
      } else if (status.name === tasktypeArray[4].name) {
        pushTasks(data, data5);
      }
    });
    CommonUserById.value = false;
  });
};

//rolebased

//crud operations
const CreateAndUpdate = async (
  token,
  data,
  status,
  createStatus,
  taskData,
  commonUsersANDGroupUsers,
  taskpriority,
  taskStatus
) => {
  if (status === true) {
    if (filterChangeStatus.value === true) {
      await updateTask(token, taskData)
        .then(() => {
          createSuccessNotification("Successfully Updated Task");
          DrawerStatus.value = true;
          ReloadTasksByGroup.value = true;
          groupChangeToggle.value = false;
        })
        .catch(() => {
          createErrorNotification("Sorry Couldn't update");
          DrawerStatus.value = true;
          ReloadTasksByGroup.value = true;
          groupChangeToggle.value = false;
        });
    } else if (filterChangeStatus.value === false) {
      await updateTask(token, taskData)
        .then(() => {
          createSuccessNotification("Successfully Updated Task");
          DrawerStatus.value = true;
          ReloadTasks.value = true;
          groupChangeToggle.value = false;
        })
        .catch(() => {
          createErrorNotification("Sorry Couldn't update");
          DrawerStatus.value = true;
          ReloadTasks.value = true;
          groupChangeToggle.value = false;
        });
    }
    //Create Task
  } else if (createStatus === true) {
    if (createChangeStatus.value === true) {
      await createTask(token, taskData)
        .then(() => {
          if (commonUsersANDGroupUsers === true) {
            console.log("Group", commonUsersANDGroupUsers);
            createSuccessNotification("Successfully Created group Task");
            DrawerStatus.value = true;
            ReloadTasksByGroup.value = true;
            ReloadTasks.value = false;
            groupChangeToggle.value = false;
            loadingStatus.value = true;
          } else if (commonUsersANDGroupUsers === false) {
            console.log("Assignee", commonUsersANDGroupUsers);
            createSuccessNotification("Successfully Created Assignee Task");
            DrawerStatus.value = true;
            ReloadTasksByGroup.value = false;
            ReloadTasks.value = true;
            groupChangeToggle.value = false;
            loadingStatus.value = true;
          }
        })
        .catch(() => {
          createErrorNotification("Please Try Again");
          DrawerStatus.value = false;
          ReloadTasksByGroup.value = false;
          groupChangeToggle.value = true;
        });
      loadingStatus.value = false;
    } else if (createChangeStatus.value === false) {
      await createTask(token, taskData)
        .then(() => {
          if (commonUsersANDGroupUsers === true) {
            console.log("Group", commonUsersANDGroupUsers);
            createSuccessNotification("Successfully Created group Task");
            DrawerStatus.value = true;
            ReloadTasksByGroup.value = true;
            ReloadTasks.value = false;
            groupChangeToggle.value = false;
            loadingStatus.value = true;
          } else if (commonUsersANDGroupUsers === false) {
            console.log("Assignee", commonUsersANDGroupUsers);
            createSuccessNotification("Successfully Created Assignee Task");
            DrawerStatus.value = true;
            ReloadTasksByGroup.value = false;
            ReloadTasks.value = true;
            groupChangeToggle.value = false;
            loadingStatus.value = true;
          }
        })
        .catch(() => {
          createErrorNotification("Please Try Again");
          DrawerStatus.value = false;
          ReloadTasks.value = false;
          groupChangeToggle.value = true;
        });
    }
    loadingStatus.value = false;
  }
};
let draggedModifiedId =ref("")
const dragUpdate = async (status, index, element) => {

  draggedModifiedId.value=index
  console.log("drag update" , draggedModifiedId.value , fetchedDragData.value)
  console.log("drag status", status,index, element);
};
let fetchedDragData = ref({})
const dragUpdateId = (id , index) => {
  dragId.value = index
  getTaskById(localToken.value , dragId.value).then((data)=>{
    fetchedDragData.value=data.data
    console.log("fetched" , fetchedDragData.value.taskStatus.taskStatusId)
  })
  console.log("token" , localToken.value)
  console.log("drag id", dragId.value);
};
const changeTaskPrority = (_data, id) => {};

const Reload = async (
  token,
  tasktypeArray,
  data1,
  data2,
  data3,
  data4,
  data5
) => {
  data1.splice(0, data1.length);
  data2.splice(0, data2.length);
  data3.splice(0, data3.length);
  data4.splice(0, data4.length);
  data5.splice(0, data5.length);
  await getAllTasks(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      let status = data.taskStatus;
      if (status === null) {
      } else if (status.name === tasktypeArray[0].name) {
        pushTasks(data, data1);
      } else if (status.name === tasktypeArray[1].name) {
        pushTasks(data, data2);
      } else if (status.name === tasktypeArray[2].name) {
        pushTasks(data, data3);
      } else if (status.name === tasktypeArray[3].name) {
        pushTasks(data, data4);
      } else if (status.name === tasktypeArray[4].name) {
        pushTasks(data, data5);
      }
    });
  });
};

const ReloadByGroup = async (
  token,
  tasktypeArray,
  data1,
  data2,
  data3,
  data4,
  data5
) => {
  data1.splice(0, data1.length);
  data2.splice(0, data2.length);
  data3.splice(0, data3.length);
  data4.splice(0, data4.length);
  data5.splice(0, data5.length);
  getAllTasks(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      let status = data.taskStatus;
      if (status === null) {
      } else if (status.name === tasktypeArray[0].name) {
        pushTasks(data, data1);
      } else if (status.name === tasktypeArray[1].name) {
        pushTasks(data, data2);
      } else if (status.name === tasktypeArray[2].name) {
        pushTasks(data, data3);
      } else if (status.name === tasktypeArray[3].name) {
        pushTasks(data, data4);
      } else if (status.name === tasktypeArray[4].name) {
        pushTasks(data, data5);
      }
    });
  });
};
//fetch edit data by Id
const getDataByIdinObject = (token, id) => {
  getTaskById(token, id).then((data) => {
    updateData.value = data.data;
  });
};

const emptyTasks = (data, data2, data3, data4, data5) => {
  data.splice(0, data.length);
  data2.splice(0, data2.length);
  data3.splice(0, data3.length);
  data4.splice(0, data4.length);
  data5.splice(0, data5.length);
};

const fillData = (_taskData, taskTypeFetch) => {
  if (updateData.value.taskType === null) {
    _taskData.taskType = null;
  } else if (updateData.value.taskType) {
    taskTypeFetch.id = updateData.value.taskType.id;
    taskTypeFetch.label = updateData.value.taskType.name;
    _taskData.taskType.taskTypeId = updateData.value.taskType.taskTypeId;
    _taskData.taskType.name = updateData.value.taskType.name;
  }
};

const useTaskMangerFunctions = () => {
  return {
    //variables
    fetchedDragData,
    draggedModifiedId,
    filterChangeStatus,
    DrawerStatus,
    ReloadTasks,
    loadingStatus,
    userHide,
    ReloadByGroup,
    ReloadTasksByGroup,
    GroupById,
    CommonUserById,
    RoleHideStatus,
    groupChangeToggle,
    groupChangeValue,
    ID,
    userId,
    groupId,
    groupOrUserTaskForDragAndDrop,
    //functions
    userManiupulations,
    getAllTypesOfColumns,
    getAllTaskStatus,
    LoadAlltasks,
    getCommonUsersList,
    getGroupUsersList,
    getGroupUsers,
    LoadTasksByCommonUsers,
    LoadTasksByGroup,
    getDataByIdinObject,
    //drawer
    getAllTypesOfTasks,
    getAllPriorityList,
    getAllRepoterList,
    //common functions
    updateUserTasks,
    updateGroupTasksInCaseWorker,
    Reload,
    changeTaskPrority,
    emptyTasks,
    //crud
    CreateAndUpdate,
    dragUpdate,
    dragUpdateId,
    fillData,
  };
};

export default useTaskMangerFunctions;
