<template>
  <div>
    <q-toolbar class="bg-accent text-black shadow-2 rounded-borders">
      <q-btn stretch flat label="Month" @click="ToggleMonth" />
      <q-separator light vertical />
      <q-btn stretch flat label="WorkWeek" @click="ToggleWeek" />
      <q-separator light vertical />
      <q-btn stretch flat label="Day" @click="ToggleDay" />
      <q-separator light vertical />
      <q-btn stretch flat label="Agenda" @click="ToggleAgenda" />
      <q-separator light vertical />
      <q-btn stretch flat label="Today" @click="ToggleToday" />
      <q-separator light vertical />
      <q-btn stretch flat label="Week" @click="WeekendToggle" />
      <q-separator light vertical />
      <q-space />
      <q-btn
        class="task-manager-create-button text-white"
        flat
        icon="close"
        @click="ToggleHideToolBar"
      />
    </q-toolbar>
  </div>
</template>

<script>
export default {
  emits: ["hide", "Month", "Week", "Day", "Agenda", "Today", "toggleWeekends"],
  setup(props, context) {
    const ToggleWeekend = () => {
      weekEnds.value = !weekEnds.value;
      let Scheduler = FullCalendar.value;
      dateTitle.value = Scheduler.getApi().currentData.viewTitle;
    };
    const WeekendToggle = (e) => {
      context.emit("toggleWeekends", e.target.value);
    };
    const ToggleMonth = (e) => {
      context.emit("Month", e.target.value);
    };
    const ToggleWeek = (e) => {
      context.emit("Week", e.target.value);
    };
    const ToggleDay = (e) => {
      context.emit("Day", e.target.value);
    };
    const ToggleAgenda = (e) => {
      context.emit("Agenda", e.target.value);
    };
    const ToggleHideToolBar = (e) => {
      context.emit("hide", e.target.value);
    };
    const ToggleToday = (e) => {
      context.emit("Today", e.target.value);
    };
    return {
      ToggleWeekend,
      WeekendToggle,
      ToggleMonth,
      ToggleDay,
      ToggleWeek,
      ToggleAgenda,
      ToggleHideToolBar,
      ToggleToday,
    };
  },
};
</script>
