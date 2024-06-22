<template>
  <div>
    <c-drawer
      :title="drawerTitle"
      :subtitle="drawerSubtitle"
      v-model="Drawer"
      @getEvents="closeDrawerDirect"
    >
      <form @submit.prevent="handleAppointmentDataSubmissions">
        <c-input
          v-model="calendarData.title"
          label="Title"
          :mandatory="true"
          :rules="[(val) => val.length > 0 || 'Title is mandatory']"
        />
        <c-input
          v-model="calendarData.description"
          label="Description"
          :mandatory="true"
          :rules="[(val) => val.length > 0 || 'Description is mandatory']"
        />
        <c-select
          v-model="AppointmentTypeGrab"
          label="Select Appointment Type"
          :mandatory="true"
          fill-input
          input-debounce="0"
          use-input
          style="height: 100px"
          filled
          options-value="id"
          options-label="label"
          :options="appointmentType"
          :rules="[(val) => appointmentTypeGrabvalue(val)]"
          @update:model-value="(val) => giveValue(val)"
        />

        <div v-if="LocationHide" />

        <div v-else>
          <c-select
            v-model="LocationsTypeGrab"
            label="Select Locations"
            options-value="id"
            options-label="label"
            :options="LocationsType"
            @update:model-value="(val) => giveLocationValue(val)"
          />
        </div>

        <c-toggle label="All Day" v-model="allDay" />

        <div v-if="allDay">
          <div class="full-width">
            <c-input
              dense
              v-model="calendarData.startDate"
              label="Start Date"
              mask="####-##-## ##:##"
              :mandatory="true"
              :rules="[startDateRules]"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="calendarData.startDate"
                      mask="YYYY-MM-DD HH:mm"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Done"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="calendarData.startDate"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Done"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </c-input>
          </div>
          <div class="full-width">
            <c-input
              dense
              v-model="calendarData.endDate"
              label="End Date"
              mask="####-##-## ##:##"
              :mandatory="true"
              :rules="[endDateRules]"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="calendarData.endDate"
                      mask="YYYY-MM-DD HH:mm"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Done"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="calendarData.startDate"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Done"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </c-input>
          </div>
        </div>

        <div v-else>
          <div class="full-width">
            <c-input
              dense
              v-model="calendarData.startDate"
              label="Start Date"
              mask="####-##-## ##:##"
              :mandatory="true"
              :rules="[startDateRules]"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="calendarData.startDate"
                      mask="YYYY-MM-DD HH:mm"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Done"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="calendarData.startDate"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Done"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </c-input>
          </div>
          <div class="full-width">
            <c-input
              dense
              v-model="calendarData.endDate"
              label="End Date"
              mask="####-##-## ##:##"
              :rules="[endDateRules]"
              :mandatory="true"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="calendarData.endDate"
                      mask="YYYY-MM-DD HH:mm"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Done"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="calendarData.endDate"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Done"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </c-input>
          </div>
        </div>
        <div v-if="BreakHide"></div>

        <c-select
          v-model="caseGrab"
          label="Case Id"
          options-value="id"
          options-label="label"
          :options="caseType"
          @update:model-value="(val) => giveCaseValue(val)"
        />
        <div v-if="caseOption">
          <c-select
            v-model="inviteeGrab"
            label="Case Participant(s)"
            multiple
            :options="inviteesType"
            @update:model-value="(val) => giveInviteeValue(val)"
          />
          <c-select
            v-model="participantGrab"
            multiple
            label="Case Worker(s) | Invitee(s)"
            :options="participantType"
            @update:model-value="(val) => giveParticipantValue(val)"
          />
        </div>
        <div v-else />

        <c-btn type="submit" class="full-width" :label="drawerTitle" />
      </form>
    </c-drawer>
  </div>
  <div>
    <scheduler-tool-bar
      @triggerValue="createDrawerChange"
      @viewsChange="changeViewFunction"
      @previousYearChange="changeAppointmentsToPreviousYear"
      @nextYearChange="changeAppointmentsToNextYear"
      @PreviousDay="changeAppointmentsToPrevDay"
      @nextDay="changeAppointmentsToNextDay"
      :title="dateTitle"
    />
  </div>
  <div style="margin-top: 5px">
    <scheduler-view-tool-bar
      v-if="viewsChange"
      @hide="ManipulateViews"
      @month="changeViewMonth"
      @Day="changeViewDay"
      @Agenda="changeViewAgenda"
      @week="changeViewWeek"
      @today="changeToToday"
      @toggleWeekends="ToggleWeekend"
    />
  </div>
  <div>
    <scheduler-reusable-dialog
      v-model="confirmationModal"
      title="Confirmation"
      @close="CloseConfirmationModal"
    >
      <div class="row">
        <q-btn
          class="csf_button"
          label="Edit Appointment"
          @click="handleEditAppointment"
        />
        <q-btn
          class="csf_button"
          label="Delete Appointment"
          @click="handleDeleteConfirmation"
        />
      </div>
    </scheduler-reusable-dialog>

    <scheduler-reusable-dialog
      v-model="deleteConfirmationModal"
      title="Delete Confirmation"
      @close="CloseDeleteModal"
    >
      <div class="row justify-evenly">
        <q-btn
          class="csf_button col-5"
          label="Delete"
          @click="deleteAppointmentApi"
          color="red"
        />
        <q-btn class="csf_button col-5" label="Don't Delete" v-close-popup />
      </div>
    </scheduler-reusable-dialog>
  </div>
  <scheduler-loading v-if="loadingStatus" />
  <div v-else style="position: relative; top: 30px; overflow: hidden hidden">
    <div>
      <Full-calendar
        class="fc-scroller"
        ref="FullCalendar"
        :options="calendarOptions"
      />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed, watch, onMounted } from "vue";
import SchedulerToolBar from "./SchedulerToolBar.vue";
import SchedulerViewToolBar from "./SchedulerViewsToolBar.vue";
import SchedulerReusableDialog from "./SchedulerReusableDialog.vue";
import SchedulerLoading from "./SchedulerLoader.vue";
import moment from "moment";
import { useStore } from "vuex";
import useSchedulerOperations from "./Scheduler";
import useSchedulerFunctions from "@/Services/Schedular/SchedularService";
//full calendar
import "@fullcalendar/core/vdom"; // solve problem with Vite
import FullCalendar from "@fullcalendar/vue3";
//full calendar plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import notificationHelper from "@/helpers/notificationHelpers/notificationHelper";
import draggable from "vuedraggable";

export default {
  components: {
    SchedulerToolBar,
    SchedulerViewToolBar,
    FullCalendar,
    SchedulerReusableDialog,
    SchedulerLoading,
  },
  setup() {
    let caseOption = ref(false);
    let CaseId = ref(false);
    let createDrawer = ref(false);
    let updateDrawer = ref(false);
    let confirmationModal = ref(false);
    let deleteConfirmationModal = ref(false);
    let SchedulerLoading = ref(false);
    let view = "dayGridMonth";
    let Id = ref("");
    let Drawer = ref(false);
    let weekEnds = ref(false);
    let FullCalendar = ref("");
    let DrawerStartDate = ref("");
    let DrawerEndDate = ref("");
    let changeView = ref(false);
    let intialTimeZone = ref("UTC");
    //calendar data
    let allDay = ref(false);
    let startDate = ref("");
    let endDate = ref("");
    let presentDate = ref(moment(new Date()).format("YYYY-MM-DD hh:mm"));
    let viewsChange = ref(false);
    let dateTitle = ref("");
    let appointmentType = ref([]);
    let LocationsType = ref([]);
    let caseType = ref([]);
    let inviteesType = ref([]);
    let participantType = ref([]);
    let Events = ref([]);
    //calendar data grab
    let LocationsTypeGrab = ref([]);
    let AppointmentTypeGrab = ref([]);
    let caseGrab = ref([]);
    let participantGrab = ref([]);
    let inviteeGrab = ref([]);
    //calendar drawer hide
    let LocationHide = ref(false);
    let BreakHide = ref(false);
    let drawerTitle = ref("Create Appointment");
    let drawerSubtitle = ref("Create your Appointments Here");

    //fucntions call
    const {
      //variables
      drawerStatus,
      loadingStatus,
      deleteFinalDialog,
      //functions call
      dropDownCommonFunction,
      LocationsDropdown,
      caseDropdown,
      inviteeDropdown,
      ParticipantDropDown,
      manipulateDataDropDown,
      getInviteesandParticipantsByCase,

      AppointmentsAccordingToDateChange,
      AppointmentById,
      handleSubmissions,
      deleteAppointmentHelper,
      removeAppointment,
    } = useSchedulerOperations();
    const { getAppointmentType, getAppointmentById, updateAppointment } =
      useSchedulerFunctions();

    //notifications
    const { createSuccessNotification, createErrorNotification } =
      notificationHelper;
    //functions
    const Store = useStore();
    //token
    let token = computed(() => Store.getters.token);
    const createDrawerChange = () => {
      Drawer.value = true;
      createDrawer.value = true;
      updateDrawer.value = false;
    };
    const updateDrawerChange = () => {
      Drawer.value = true;
      createDrawer.value = true;
    };
    //Scheduler functions
    const startDateRules = (val) => {
      DrawerStartDate.value = moment(val).format("YYYY-MM-DD hh:mm");
      console.log("Start date", val, calendarData.value.startDate);
      if (!val) {
        return "Start Date is mandatory";
      }
    };

    const endDateRules = (val) => {
      let endDateFormat = moment(val).format("YYYY-MM-DD hh:mm");
      if (!val) {
        return "End Date is mandatory";
      } else if (endDateFormat < calendarData.value.startDate) {
        return "End Date Shouldn't be before Start Date";
      }
      console.log("end date", val, calendarData.startDate);
    };
    const ToggleWeekend = () => {
      weekEnds.value = !weekEnds.value;
      let Scheduler = FullCalendar.value;
      dateTitle.value = Scheduler.getApi().currentData.viewTitle;
      console.log("weekend", dateTitle.value);
    };
    const changeViewMonth = () => {
      let Scheduler = FullCalendar.value;
      Scheduler.getApi().changeView("dayGridMonth");
      dateTitle.value = Scheduler.getApi().currentData.viewTitle;
    };
    const changeViewDay = () => {
      let Scheduler = FullCalendar.value;
      Scheduler.getApi().changeView("timeGridDay");
      dateTitle.value = Scheduler.getApi().currentData.viewTitle;
    };
    const changeViewWeek = () => {
      let Scheduler = FullCalendar.value;
      Scheduler.getApi().changeView("timeGridWeek");
      dateTitle.value = Scheduler.getApi().currentData.viewTitle;
    };
    const changeViewAgenda = () => {
      let Scheduler = FullCalendar.value;
      Scheduler.getApi().changeView("listWeek");
      dateTitle.value = Scheduler.getApi().currentData.viewTitle;
    };
    const changeToToday = () => {
      let Scheduler = FullCalendar.value;
      Scheduler.getApi().changeView("timeGridDay", presentDate.value);
      dateTitle.value = Scheduler.getApi().currentData.viewTitle;
    };
    const closeDrawerDirect = () => {
      Drawer.value = false;
    };
    const changeViewFunction = () => {
      viewsChange.value = !viewsChange.value;
    };
    const ManipulateViews = () => {
      viewsChange.value = false;
    };
    const handleDateClick = (arg) => {
      console.log("handle date clicked");
      createDrawer.value = true;
      Drawer.value = true;
      calendarData.value.startDate = moment(arg.dateStr).format(
        "YYYY-MM-DD 06:00"
      );
    };
    const handleAppointmentClick = (data) => {
      Id.value = data.event._def.publicId;
      confirmationModal.value = true;
    };
    const handleEditAppointment = () => {
      updateDrawer.value = true;
      Drawer.value = true;
      confirmationModal.value = false;
      getAppointmentById(token.value, Id.value).then((data) => {
        console.log("fetched data", data.data);
        let apiData = data.data;
        calendarData.value.title = apiData.title;
        calendarData.value.description = apiData.description;
        //appointment type
        calendarData.value.type.typeId = apiData.type.typeId;
        AppointmentTypeGrab.value.id = apiData.type.typeId;
        AppointmentTypeGrab.value.label = apiData.type.typeName;
        //locations type
        calendarData.value.thirdPartyLookup.tplId =
          apiData.thirdPartyLookup.tplId;
        LocationsTypeGrab.value.id = apiData.thirdPartyLookup.tplId;
        LocationsTypeGrab.value.label = apiData.thirdPartyLookup.tplElementNm;
        //startdate and enddate
        if (apiData.allDay === true) {
          allDay.value = true;
          calendarData.value.startDate = apiData.startDate;
          calendarData.value.endDate = apiData.endDate;
        } else if (apiData.allDay === null) {
          calendarData.value.startDate = apiData.startDate;
          calendarData.value.endDate = apiData.endDate;
        } else {
          calendarData.value.startDate = apiData.startDate;
          calendarData.value.endDate = apiData.endDate;
        }
        calendarData.value.caseNumber = apiData.caseNumber;
        let caseDetails = caseType.value.filter(
          (element) => element.id === apiData.caseNumber
        );
        caseDetails.map((m) => {
          (caseGrab.value.id = m.id), (caseGrab.value.label = m.label);
        });
        let commonUsers = apiData.commonUsers;
        commonUsers.map((r) => {
          participantGrab.value.push({
            id: r.cusId,
            label: r.cusUserTxt,
          });
        });
        console.log(
          "commonuser",
          apiData.commonUsers,
          commonUsers,
          participantGrab.value
        );
      });
      //AppointmentById(token.value, Id.value, calendarData.value);
    };
    const handleDeleteConfirmation = () => {
      confirmationModal.value = false;
      deleteConfirmationModal.value = true;
    };
    const handleAppointmentDataSubmissions = () => {
      console.log("scheduler", calendarData.value);
      if (createDrawer.value === true) {
        if (!calendarData.value.title) {
          createErrorNotification("Please fill the mandatory fields");
        } else if (!calendarData.value.description) {
          createErrorNotification("Please fill the mandatory fields");
        } else if (AppointmentTypeGrab.value.length === 0) {
          createErrorNotification("Please fill the mandatory fields");
        } else if (!calendarData.value.startDate) {
          createErrorNotification("Please fill the mandatory fields");
        } else if (!calendarData.value.endDate) {
          createErrorNotification("Please fill the mandatory fields");
        } else {
          handleSubmissions(
            token.value,
            createDrawer.value,
            updateDrawer.value,
            calendarData.value,
            Events.value
          );
        }
      } else if (updateDrawer.value === true) {
        console.log("scheduler111", calendarData.value);
        //    if (!calendarData.value.title) {
        //   createErrorNotification("Please fill the mandatory fields");
        // } else if (!calendarData.value.description) {
        //   createErrorNotification("Please fill the mandatory fields");
        //  }
        // // else if (AppointmentTypeGrab.value.length === 0) {
        // //   createErrorNotification("Please fill the mandatory fields");
        // // } else if (!calendarData.value.startDate) {
        // //   createErrorNotification("Please fill the mandatory fields");
        // // } else if (!calendarData.value.endDate) {
        // //   createErrorNotification("Please fill the mandatory fields");
        // // }
        //  else {
        handleSubmissions(
          token.value,
          createDrawer.value,
          updateDrawer.value,
          calendarData.value,
          Events.value
        );
      }
    };

    let calendarData = ref({
      title: "",
      description: "",
      type: { typeId: "" },
      caseNumber: "",
      recurrenceRule: null,
      startDate: "",
      endDate: "",
      allDay: null,
      thirdPartyLookup: { tplId: "" },
      commonUsers: [],
      persons: [],
    });

    //functions call

    //dropdown Filling functions
    const AppointmentTypeFetch = onBeforeMount(() => {
      dropDownCommonFunction(
        token.value,
        appointmentType.value,
        getAppointmentType
      );
    });

    const LocationsTypeFetch = onBeforeMount(() => {
      LocationsDropdown(
        token.value,
        { tplTypeTxt: "Court" },
        LocationsType.value
      );
    });

    const caseTypeFetch = onBeforeMount(() => {
      caseDropdown(token.value, caseType.value);
    });

    const inviteeTypeFetch = onBeforeMount(() => {
      inviteeDropdown(token.value, inviteesType.value);
    });

    const participantTypeFetch = onBeforeMount(() => {
      ParticipantDropDown(token.value, participantType.value);
    });

    //watchers
    watch(allDay, () => {
      if (allDay.value === true) {
        calendarData.value.allDay = true;
        calendarData.value.endDate = calendarData.value.startDate;
        calendarData.value.startDate = moment(new Date()).format(
          "YYYY-MM-DD 06:00"
        );
        calendarData.value.endDate = moment(new Date()).format(
          "YYYY-MM-DD 23:00"
        );
      } else if (allDay.value === false) {
        calendarData.value.allDay = null;
        calendarData.value.endDate = null;
      }
    });
    watch(updateDrawer, () => {
      if (updateDrawer.value === true) {
        drawerTitle.value = "Update Appointment";
        drawerSubtitle.value = "update your apppointments here";
      }
    });

    watch(createDrawer, () => {
      if (createDrawer.value === true) {
        updateDrawer.value = false;
        drawerTitle.value = "Create Appointment";
        drawerSubtitle.value = "Create your Appointments Here";
      }
    });

    watch(drawerStatus, () => {
      if (drawerStatus.value === true) {
        Drawer.value = false;
      }
    });

    watch(loadingStatus, () => {
      loadingStatus
        ? console.log("loading:", loadingStatus.value)
        : console.log("loading:", loadingStatus.value);
    });

    watch(updateDrawer, () => {
      if (updateDrawer.value === true) {
        calendarData.value = {
          appointmentId: Id.value,
          title: "",
          description: "",
          type: { typeId: "" },
          recurrenceRule: null,
          startDate: "",
          endDate: "",
          allDay: null,
          caseNumber: "",
          createdDateTime: "",
          modifiedDateTime: "",
          persons: [],
          thirdPartyLookup: { tplId: "" },
          commonUsers: [],
        };
      } else if (updateDrawer.value === false) {
        calendarData.value = {
          title: "",
          description: "",
          type: { typeId: "" },
          caseNumber: "",
          recurrenceRule: null,
          startDate: "",
          endDate: "",
          allDay: null,
          thirdPartyLookup: { tplId: "" },
          commonUsers: [],
          persons: [],
        };
      }
    });

    watch(Drawer, () => {
      if (Drawer.value === false) {
        calendarData.value = {
          title: "",
          description: "",
          type: { typeId: "" },
          caseNumber: "",
          recurrenceRule: null,
          startDate: "",
          endDate: "",
          allDay: null,
          thirdPartyLookup: { tplId: "" },
          commonUsers: [],
          persons: [],
        };
        drawerStatus.value = false;
        createDrawer.value = false;
        updateDrawer.value = false;
        caseOption.value = false;
        loadingStatus.value = false;
        allDay.value = false;
        BreakHide.value = false;
        AppointmentTypeGrab.value = [];
        LocationsTypeGrab.value = [];
        caseGrab.value = [];
        participantGrab.value = [];
        inviteeGrab.value = [];
      }
    });

    watch(deleteFinalDialog, () => {
      deleteFinalDialog.value
        ? (deleteConfirmationModal.value = false)
        : (deleteConfirmationModal.value = false);
    });

    //Dialog Functions
    const CloseDeleteModal = () => {
      deleteConfirmationModal.value = false;
    };
    const CloseConfirmationModal = () => {
      confirmationModal.value = false;
    };

    //common guys
    const giveValue = (val) => {
      calendarData.value.type.typeId = val.id;
      if (val.id === 11) {
        BreakHide.value = true;
      } else if (val.id == 12) {
        BreakHide.value = false;
        LocationHide.value = true;
      } else {
        BreakHide.value = false;
        LocationHide.value = false;
      }
    };

    const giveCaseValue = (val) => {
      caseOption.value = true;
      calendarData.value.caseNumber = val.id;
      getInviteesandParticipantsByCase(
        token.value,
        val.id,
        participantGrab.value,
        inviteeGrab.value,
        calendarData.value.persons
      );
    };

    const giveLocationValue = (val) => {
      calendarData.value.thirdPartyLookup.tplId = val.id;
    };

    const giveParticipantValue = (val) => {
      let data = [...val];
      console.log("participant", data.length);
      let commonUser = calendarData.value.commonUsers;
      commonUser.splice(0, commonUser.length);
      data.forEach((element) => commonUser.push({ cusId: element.id }));
    };

    const giveInviteeValue = (val) => {
      let data = [...val];
      console.log("invitee", inviteeGrab.value);
      let persons = calendarData.value.persons;
      persons.splice(0, persons.length);
      data.forEach((element) => persons.push({ personId: element.id }));
    };

    const giveTitle = onMounted(() => {
      let Schedular = FullCalendar.value.getApi();
      dateTitle.value = Schedular.currentData.viewTitle;
    });
    const LoadAppointments = onBeforeMount(() => {
      startDate.value = moment()
        .clone()
        .startOf("month")
        .format("YYYY-MM-DD hh:mm");
      endDate.value = moment()
        .clone()
        .endOf("month")
        .format("YYYY-MM-DD hh:mm");
      console.log("start date and end date", startDate.value, endDate.value);
      AppointmentsAccordingToDateChange(
        token.value,
        `${startDate.value}/${endDate.value}`,
        Events.value
      );
    });

    const deleteAppointmentApi = () => {
      removeAppointment(token.value, Id.value);
      CloseDeleteModal.value = false;
    };

    const getAppointmentsByDatesChange = (data) => {
      startDate.value = moment(data.startStr).format("YYYY-MM-DD hh:mm");
      endDate.value = moment(data.endStr).format("YYYY-MM-DD hh:mm");
      console.log(
        "dates data from date change",
        data,
        startDate.value,
        endDate.value
      );
    };

    const changeAppointmentsToPreviousYear = (data) => {
      let Schedular = FullCalendar.value.getApi();
      Schedular.prevYear();
      dateTitle.value = Schedular.currentData.viewTitle;

      AppointmentsAccordingToDateChange(
        token.value,
        `${startDate.value}/${endDate.value}`,
        Events.value
      );
    };
    const changeAppointmentsToNextYear = (data) => {
      let Schedular = FullCalendar.value.getApi();
      Schedular.nextYear();
      dateTitle.value = Schedular.currentData.viewTitle;

      AppointmentsAccordingToDateChange(
        token.value,
        `${startDate.value}/${endDate.value}`,
        Events.value
      );
    };
    const changeAppointmentsToPrevDay = (data) => {
      let Schedular = FullCalendar.value.getApi();
      Schedular.prev();
      dateTitle.value = Schedular.currentData.viewTitle;

      AppointmentsAccordingToDateChange(
        token.value,
        `${startDate.value}/${endDate.value}`,
        Events.value
      );
    };
    const changeAppointmentsToNextDay = (data) => {
      let Schedular = FullCalendar.value.getApi();
      Schedular.next();
      dateTitle.value = Schedular.currentData.viewTitle;

      AppointmentsAccordingToDateChange(
        token.value,
        `${startDate.value}/${endDate.value}`,
        Events.value
      );
    };

    const handleDropEvent = (arg) => {
      console.log("handle-drop", arg);
    };

    const handleEventChange = (arg) => {
      let appointmentData = {};
      let changedStartDate = "";
      let changedEndDate = "";
      changedStartDate = moment(arg.event._instance.range.start).format(
        "YYYY-MM-DD hh:mm"
      );
      changedEndDate = moment(arg.event._instance.range.end).format(
        "YYYY-MM-DD hh:mm"
      );
      console.log(
        "change",
        arg,
        "id",
        arg.event._def.publicId,
        "changed dates",
        changedStartDate,
        changedEndDate
      );
      getAppointmentById(token.value, arg.event._def.publicId).then((data) => {
        appointmentData = data.data;
        appointmentData.startDate = moment(
          arg.event._instance.range.start
        ).format("YYYY-MM-DD hh:mm");
        appointmentData.endDate = moment(arg.event._instance.range.end).format(
          "YYYY-MM-DD hh:mm"
        );
        console.log(
          "appointment By Id",
          appointmentData.startDate,
          appointmentData.endDate,
          appointmentData
        );
        updateAppointment(token.value, appointmentData).then(() => {
          createSuccessNotification("successfully updated appointment");
        });
      });
    };

    const handleResizeEvent = (arg) =>{
      console.log("resizer" , arg)
    }

    //calendar options
    let calendarOptions = ref({
      plugins: [
        dayGridPlugin, // day theme as well
        timeGridPlugin, //to display time in the scheduler
        interactionPlugin, // needed for dateClick
        listPlugin, //Agenda view,
      ],
      timeZone: "locale",
      headerToolbar: false,
      initialView: view,
      weekends: weekEnds,
      editable: true,
      selectable: true,
      events: Events,
      eventResizableFromStart: true,
      eventResizableFromEnd: true,
      eventStartEditable: true,
      eventDurationEditable: true,
      resizable: true,

      eventResize: (arg) => handleResizeEvent(arg),
      datesSet: (arg) => getAppointmentsByDatesChange(arg),
      select: (arg) => handleDateClick(arg),
      eventClick: (arg) => handleAppointmentClick(arg),
      eventDrop: (arg) => handleDropEvent(arg),

      dateClick: (arg) => handleDateClick(arg),
      eventChange: (arg) => handleEventChange(arg),
      // eventAdd: (arg) => handleAdd(arg),
    });

    const appointmentTypeGrabvalue = (val) => {
      if (!val) {
        return "Appointment Type is mandatory";
      }
    };
    return {
      //variables
      caseOption,
      CaseId,
      createDrawer,
      updateDrawer,
      deleteConfirmationModal,
      confirmationModal,
      SchedulerLoading,
      Id,
      view,
      Drawer,
      drawerTitle,
      drawerSubtitle,
      calendarData,
      FullCalendar,
      weekEnds,
      Events,
      allDay,
      startDate,
      endDate,
      presentDate,
      DrawerStartDate,
      DrawerEndDate,
      appointmentType,
      caseType,
      inviteesType,
      participantType,
      LocationsType,
      viewsChange,
      dateTitle,
      intialTimeZone,
      //rules
      appointmentTypeGrabvalue,
      //calendar data grab
      AppointmentTypeGrab,
      LocationsTypeGrab,
      caseGrab,
      participantGrab,
      inviteeGrab,
      //grabing values changes
      giveLocationValue,
      giveCaseValue,
      giveParticipantValue,
      giveInviteeValue,
      //hides
      LocationHide,
      BreakHide,
      //functions
      createDrawerChange,
      updateDrawerChange,
      handleAppointmentDataSubmissions,
      giveValue,
      closeDrawerDirect,
      //calendar options
      calendarOptions,
      //calendar functions
      ToggleWeekend,
      changeViewFunction,
      ManipulateViews,
      AppointmentTypeFetch,
      LocationsTypeFetch,
      caseTypeFetch,
      inviteeTypeFetch,
      participantTypeFetch,
      handleAppointmentClick,
      handleDateClick,
      handleEditAppointment,
      handleDeleteConfirmation,
      handleDropEvent,
      handleEventChange,
      handleResizeEvent,
      giveTitle,
      changeViewMonth,
      changeViewDay,
      changeViewWeek,
      changeViewAgenda,
      startDateRules,
      endDateRules,
      //important cycle
      LoadAppointments,
      deleteAppointmentApi,
      getAppointmentsByDatesChange,
      changeAppointmentsToPreviousYear,
      changeToToday,
      changeAppointmentsToNextYear,
      changeAppointmentsToPrevDay,
      changeAppointmentsToNextDay,
      //Modals
      CloseConfirmationModal,
      CloseDeleteModal,
    };
  },
};
</script>

<style>
#calendar-page .custom-calendar .fc-scroller {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
  height: auto !important;
}

#calendar-page .custom-calendar .fc-scroller > .fc-day-grid {
  width: 200%;
}
</style>
