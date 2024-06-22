<template>
  <div>
    <q-toolbar class="bg-accent text-black shadow-2 rounded-borders">
      <c-btn
        flat
        dense
        class="task-manager-create-button text-white q-mr-sm"
        label="Create Appointment"
        @click="createAppointment"
      />
      <q-separator dark vertical inset class="q-mr-sm" />

      <q-space />
      <q-toolbar-title style="overflow: inherit">
        {{ title }}
      </q-toolbar-title>
      <q-separator dark vertical />

      <q-btn
        stretch
        flat
        icon="eva-arrowhead-left-outline"
        @click="ChangePreviousYear"
      />
      <q-separator dark vertical />
      <q-btn stretch flat icon="eva-arrow-ios-back" @click="ChangePrevDay" />
      <q-separator dark vertical />
      <q-btn stretch flat icon="eva-arrow-ios-forward" @click="ChangeNextDay" />
      <q-separator dark vertical />
      <q-btn
        stretch
        flat
        icon="eva-arrowhead-right-outline "
        @click="ChangeNextYear"
      />
      <q-separator />
      <q-btn flat label="views" @click="changeViews" />
    </q-toolbar>
  </div>
</template>

<script>
export default {
  emits: [
    "triggerValue",
    "toggleWeekends",
    "viewsChange",
    "previousYearChange",
    "nextYearChange",
    "PreviousDay",
    "nextDay",
  ],
  props: ["title"],
  name: "SchedulerToolBar",
  setup(props, context) {
    const createAppointment = (e) => {
      context.emit("triggerValue", e.target.value);
    };
    const WeekendToggle = (e) => {
      context.emit("toggleWeekends", e.target.value);
    };
    const changeViews = (e) => {
      context.emit("viewsChange", e.target.value);
    };
    const ChangePreviousYear = (e) => {
      context.emit("previousYearChange", e.target.value);
    };
    const ChangeNextYear = (e) => {
      context.emit("nextYearChange", e.target.value);
    };
    const ChangePrevDay = (e) => {
      context.emit("previousDay", e.target.value);
    };

    const ChangeNextDay = (e) => {
      context.emit("nextDay", e.target.value);
    };
    return {
      createAppointment,
      WeekendToggle,
      changeViews,
      ChangePreviousYear,
      ChangeNextYear,
      ChangePrevDay,
      ChangeNextDay,
    };
  },
};
</script>

<style scoped></style>
