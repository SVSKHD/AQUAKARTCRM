import { ref } from "vue";
import useSchedulerFunctions from "../../Services/Schedular/SchedularService";
import notificationHelper from "@/helpers/notificationHelpers/notificationHelper";
import { async } from "@firebase/util";
const {
  createAppointment, // Create Appointments on the calender
  updateAppointment, // Update Appointments on the calender
  deleteAppointment, // Delete Appointments on the calender
  getAppointmentsByDate, // Get the filtered appointments by a specific selected date
  getAppointmentType, // Get the filtered appointments by a specific selected type example:{Court Hearing, Intake, Break}
  getLocationsType, // Get the filtered appointments by a specific selected location
  getCaseListType,
  getParticipantsByCaseId,
  getCaseWorkerByCaseId,
  getAssignees,
  getInvitees,
  getAppointmentById, //Appoinment by Id
} = useSchedulerFunctions();

//Notifications
const { createSuccessNotification, createErrorNotification } =
  notificationHelper;

let drawerStatus = ref(false);
let loadingStatus = ref(false);
let deleteFinalDialog = ref(false);
//get appoinmtnets by date
const AppointmentsAccordingToDateChange = async (
  token,
  dates,
  appointmentsDataFetch,
  _Loading
) =>
  await getAppointmentsByDate(token, dates)
    .then((data) => {
      appointmentsDataFetch.splice(0, appointmentsDataFetch.length);
      let apiData = data.data;
      console.log("Appoinmtnets", apiData);
      apiData.map((data) => {
        appointmentsDataFetch.push({
          id: data.appointmentId,
          title: data.title,
          description: data.description,
          start: data.startDate,
          end: data.endDate,
        });
      });
    })
    .catch(() => {});

const AppointmentById = (
  token,
  Id,
  fillingdata,
  appointmentType,
  LocationType,
  caseType
) => {
  getAppointmentById(token, Id).then((data) => {
    console.log("edit data", data.data);
    let apiData = data.data;
    fillingdata.title = apiData.title;
    fillingdata.description = apiData.description;
    fillingdata.startDate = apiData.startDate;
    fillingdata.endDate = apiData.endDate;
  });
};

//common feature
//location dropdown
const LocationsApiHelper = (token, location, locationDataFetch) =>
  getLocationsType(token, location).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      locationDataFetch.push({
        id: data.tplId,
        label: data.tplElementNm,
      });
    });
  });

//get appointmnets by type
const getAppointmentsTypeHelper = (token, appointmentdDataFtech) =>
  getAppointmentType(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      appointmentdDataFtech.push({
        label: data.typeName,
        id: data.typeId,
      });
    });
  });

//crud operations
const handleSubmissions = (
  token,
  createStatus,
  updateStatus,
  schedulingdata,
  fillingData
) => {
  if (createStatus === true) {
    loadingStatus.value = true;
    createAppointment(token, schedulingdata)
      .then((data) => {
        let apiData = data.data;
        createSuccessNotification("Successfully Created Appointment");
        fillingData.push({
          id: apiData.appointmentId,
          title: apiData.title,
          description: apiData.description,
          start: apiData.startDate,
          end: apiData.endDate,
        });
        drawerStatus.value = true;
        loadingStatus.value = setTimeout(3000, false);
      })
      .catch(() => {
        createErrorNotification("Please try Again");
      });
    loadingStatus.value = false;
  } else if (updateStatus === true) {
    updateAppointment(token, schedulingdata)
      .then(() => {
        createSuccessNotification("Appointment Updated Successfully");
        drawerStatus.value = true;
        loadingStatus.value = true;
      })
      .catch(() => {
        createErrorNotification("Please try Again");
      });
  }
  loadingStatus.value = false;
};

const handleUpdate = async (token, fillingData) =>
  await updateAppointment(token, fillingData)
    .then((data) => {
      createSuccessNotification("Appointment Updated Successfully");
      drawerStatus.value = true;
    })
    .catch(() => {
      createErrorNotification("Please try Again");
    });

const handleDelete = async (token, Id) =>
  deleteAppointment(token, Id)
    .then(() => {
      loadingStatus.value = true;
      createSuccessNotification("Successfully Deleted");
      loadingStatus.value = false;
    })
    .catch(() => {
      createErrorNotification("Something went wrong");
    });

const handleCreate = async (token, fillingData) =>
  await createAppointment(token, schedulingdata)
    .then((data) => {
      let apiData = data.data;
      createSuccessNotification("Successfully Created Appointment");
      fillingData.push({
        id: apiData.appointmentId,
        title: apiData.title,
        description: apiData.description,
        start: apiData.startDate,
        end: apiData.endDate,
      });
      drawerStatus.value = true;
    })
    .catch(() => {
      createErrorNotification("Please try Again");
    });

const deleteAppointmentHelper = (token, Id) => () =>
  deleteAppointment(token, Id)
    .then(() => {
      createSuccessNotification("Successfully Deleted");
    })
    .catch(() => {
      createErrorNotification("Something went wrong");
    });

const removeAppointment = (token, id) => {
  console.log("appointment deleted from js");
  deleteAppointment(token, id)
    .then(() => {
      loadingStatus.value = true;
      deleteFinalDialog.value = true;
      createSuccessNotification("Successfully Appointment deleted");
    })
    .catch(() => {
      loadingStatus.value = true;
      deleteFinalDialog.value = true;
      createErrorNotification("Something went wrong");
    });
  loadingStatus.value = false;
  deleteFinalDialog.value = false;
};

//case select common function

//dropdown common function
const dropDownCommonFunction = (token, fillingArray, typFunction) =>
  typFunction(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      fillingArray.push({
        label: data.typeName,
        id: data.typeId,
      });
    });
  });

const LocationsDropdown = (token, location, locationDataFetch) =>
  getLocationsType(token, location).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      locationDataFetch.push({
        id: data.tplId,
        label: data.tplElementNm,
      });
    });
  });

const caseDropdown = (token, fillingArray) =>
  getCaseListType(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      fillingArray.push({
        id: data.caseId,
        label: data.name,
      });
    });
  });

const ParticipantDropDown = (token, fillingArray) =>
  getAssignees(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      fillingArray.push({
        label: data.cusUserTxt,
        id: data.cusId,
      });
    });
  });

const inviteeDropdown = (token, fillingArray) =>
  getInvitees(token).then((data) => {
    let apiData = data.data;
    apiData.map((data) => {
      fillingArray.push({
        label: data.firstName,
        id: data.personId,
      });
    });
  });

const getInviteesandParticipantsByCase = (
  token,
  id,
  fillData,
  fillData2,
  fillData3
) => {
  fillData.splice(0, fillData.length);
  fillData2.splice(0, fillData2.length);
  getCaseWorkerByCaseId(token, id).then((data) => {
    let apiData = ref([]);
    apiData.value = data.data;
    console.log("case worker data", data.data);
    apiData.value.map((data) => {
      fillData.push({
        label: data.cusUserTxt,
        id: data.cusId,
      });
    });
  });
  getParticipantsByCaseId(token, id).then((data) => {
    let apiData = ref([]);
    apiData.value = data.data;
    console.log("case parti", apiData.value);
    apiData.value.map((data) => {
      fillData2.push({
        label: data.firstName,
        id: data.personId,
      });
      fillData3.push({
        firstName: data.firstName,
        personId: data.personId,
      });
    });
  });
};

//common functions
const manipulateUpdateDrawer = (drawer, _drawerTitle, _drawerSubTitle) => {
  if (drawer === true) {
    _drawerTitle = "update Appointments";
    _drawerSubTitle = "Update your appointments here";
  } else if (drawer === false) {
    _drawerTitle = "update Appointments";
    _drawerSubTitle = "Update your appointments here";
  }
};

const manipulateDataDropDown = (val, data1, data2) => {
  data1 = val.id;
  data2 = val.label;
  console.log("respective data", val, data1, data2);
};

const useSchedulerOperations = () => {
  return {
    //variables
    drawerStatus,
    loadingStatus,
    deleteFinalDialog,
    //functions
    AppointmentsAccordingToDateChange,
    AppointmentById,
    handleSubmissions,
    handleCreate,
    handleUpdate,
    handleDelete,
    deleteAppointmentHelper, // Delete appointment//
    removeAppointment,
    //dropdowns
    LocationsApiHelper,
    //common functions
    manipulateDataDropDown,
    dropDownCommonFunction,
    manipulateUpdateDrawer,
    LocationsDropdown,
    caseDropdown,
    inviteeDropdown,
    ParticipantDropDown,
    getInviteesandParticipantsByCase,
    //scheduler operations
  };
};
export default useSchedulerOperations;
