import { ref } from "vue";
import useSchedulerFunctions from "../../Services/Schedular/SchedularService";

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

const AllLoading = ref(false);

const MapEvents = (token, Events, dates) => {
  AllLoading.value = true;
  getAppointmentsByDate(token, dates)
    .then((data) => {
      let apiData = data.data;
      apiData.map((data) => {
        Events.push({
          id: data.appointmentId,
          title: data.title,
          description: data.description,
          start: data.startDate,
          end: data.endDate,
        });
      });
      AllLoading.value = false;
    })
    .catch(() => {});
};
const SchedulerFunctions = () => {
  return {
    //variables
    AllLoading,
    //functions
    MapEvents,
  };
};

export default SchedulerFunctions;
