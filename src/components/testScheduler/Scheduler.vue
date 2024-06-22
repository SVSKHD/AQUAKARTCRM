<template>
  <div>
    <c-drawer
      v-model="Drawer"
      :title="drawerTitle"
      :subtitle="drawerSubtitle"
      @getEvents="closeDrawer"
    >
    </c-drawer>
    <SchedulerToolBar
      :title="currentDateTitle"
      @triggerValue="createDarwerManipulate"
      @viewsChange=""
      @previousYearChange="prevYear"
      @nextYearChange="nextYear"
      @PreviousDay="prevDay"
      @nextDay="nextDay"
    />
    <div v-if="SchedulerLoading">
      <q-spinner-oval color="primary" size="4em" />
    </div>
    <Full-calendar
      v-else
      class="fc-scroller"
      ref="FullCalendar"
      :options="calendarOptions"
      style="overflow: hidden hidden"
    />
  </div>
</template>

<script>
import { ref, watch, onMounted, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import SchedulerToolBar from "@/components/testScheduler/SchedulerToolBar.vue";
//full calendar
import "@fullcalendar/core/vdom"; // solve problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import SchedulerFunctions from "./Scheduler";
//full calendar plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import moment from "moment";
export default {
  components: {
    FullCalendar,
    SchedulerToolBar,
  },
  setup() {
    let Drawer = ref(false);
    let createDrawer = ref(false);
    let updateDrawer = ref(false);
    let FullCalendar = ref("");
    let Events = ref([]);
    let WeekEnds = ref(false);
    let drawerTitle = ref("Create Appointment");
    let drawerSubtitle = ref("create your appointments here");
    let SchedulerLoading = ref(false);
    let startDate = ref("");
    let endDate = ref("");
    let loadStartDate = ref("");
    let loadEndDate = ref("");
    let currentDateTitle = ref("");
    //functions
    const { MapEvents, AllLoading } = SchedulerFunctions();
    //store actions and variables
    const Store = useStore();
    //token
    let token = computed(() => Store.getters.token);

    //calendar data
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
    //watchers
    watch(createDrawer, () => {
      if (createDrawer.value === true) {
        drawerTitle.value = "Create Appointment";
        drawerSubtitle.value = "create your appointments here";
      }
    });

    watch(updateDrawer, () => {
      if (updateDrawer.value === true) {
        drawerTitle.value = "Update Appointment";
        drawerSubtitle.value = "update your appointments here";
      }
    });

    watch(AllLoading, () => {
      AllLoading.value
        ? (SchedulerLoading.value = true)
        : (SchedulerLoading.value = false);
    });

    //lifecycle
    const dates = onMounted(() => {
      currentDateTitle.value =
        FullCalendar.value.getApi().currentData.viewTitle;
    });

    //scheduler functions
    const fetchEvents = onBeforeMount(() => {
      startDate.value = moment(new Date()).format("YYYY-MM-DD 00:00");
      endDate.value = moment(new Date()).format("YYYY-MM-DD 12:00");

      MapEvents(
        token.value,
        Events.value,
        `${startDate.value}/${endDate.value}`
      );
    });

    const triggerCreateAppoinment = () => {
      createDrawer.value = true;
    };
    const nextDay = () => {
      let Schedular = FullCalendar.value.getApi();
      Schedular.next();
      currentDateTitle.value = Schedular.currentData.viewTitle;
    };

    const nextYear = () => {
      let Schedular = FullCalendar.value.getApi();
      Schedular.nextYear();
      currentDateTitle.value = Schedular.currentData.viewTitle;
    };

    const prevDay = () => {
      let Schedular = FullCalendar.value.getApi();
      Schedular.prev();
      currentDateTitle.value = Schedular.currentData.viewTitle;
    };

    const prevYear = () => {
      let Schedular = FullCalendar.value.getApi();
      Schedular.prevYear();
      currentDateTitle.value = Schedular.currentData.viewTitle;
    };

    const createDarwerManipulate = () => {
      Drawer.value = true;
      createDrawer.value = true;
    };
    const updateDrawerManipulate = () => {
      Drawer.value = true;
      updateDrawer.value = true;
    };

    const closeDrawer = () => {
      Drawer.value = false;
    };

    const handleAppointmentClick = (data) => {
      console.log(data);
    };

    const handleDateClick = () => {
      Drawer.value = true;
      createDrawer.value = true;
      calendarData.value.startDate = moment(arg.dateStr).format(
        "YYYY-MM-DD 06:00"
      );
    };

    const handleDrag = (arg) => {
      console.log("arg-drag", arg);
    };

    const handleDrop = (arg) => {
      console.log("arg-drop", arg);
    };

    const getAppointmentsByDatesChange = (arg) => {
      startDate.value = moment(arg.startStr).format("YYYY-MM-DD 00:00");
      endDate.value = moment(arg.endStr).format("YYYY-MM-DD 12:00");
    };

    //scheduler options
    let calendarOptions = ref({
      plugins: [
        dayGridPlugin, // day theme as well
        timeGridPlugin, //to display time in the scheduler
        interactionPlugin, // needed for dateClick
        listPlugin, //Agenda view,
      ],
      timeZone: "locale",
      headerToolbar: false,
      //initialView: view,
      weekends: WeekEnds,
      editable: true,
      selectable: true,
      events: Events,
      datesSet: (arg) => getAppointmentsByDatesChange(arg),
      select: (arg) => handleDrag(arg),
      eventClick: (arg) => handleAppointmentClick(arg),
      eventDrop: (arg) => handleDrop(arg),
      dateClick: (arg) => handleDateClick(arg),
      //eventAdd: (arg) => handleAdd(arg),
    });

    return {
      FullCalendar,
      createDrawer,
      updateDrawer,
      Drawer,
      Events,
      calendarData,
      drawerTitle,
      drawerSubtitle,
      SchedulerLoading,
      WeekEnds,
      //lifecycle
      fetchEvents,
      handleDrag,
      //functions
      closeDrawer,
      createDarwerManipulate,
      updateDrawerManipulate,
      //calendar options
      calendarOptions,
      currentDateTitle,
      loadEndDate,
      loadStartDate,
      handleDrag,
      triggerCreateAppoinment,
      prevYear,
      prevDay,
      nextDay,
      nextYear,
      handleDrop,
      getAppointmentsByDatesChange,
    };
  },
};
</script>
