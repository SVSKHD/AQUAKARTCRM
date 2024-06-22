<template>
  <CDrawer
    v-model="drawer"
    title="Welcome to CSF Framework"
    subtitle="We are working on building app."
    :lbl="{ ok: 'Mayank', cancel: 'reset' }"
  >
    kjsdhsdkj sdfsdfds fsdfsd
  </CDrawer>

  <CDialog
    v-model="dialog"
    title="Welcome to CSF Framework"
    subtitle="We are working on building app."
    :lbl="{ ok: 'Mayank', cancel: 'reset' }"
  >
    kjsdhsdkj sdfsdfds fsdfsd
  </CDialog>

  <c-btn
    label="Open Popup"
    @click="dialog = true"
    :loading="dialog"
    class="q-ma-lg"
  />
  <c-btn
    label="Add Task"
    color="secondary"
    @click="drawer = true"
    :loading="drawer"
    class="q-ma-lg"
    outline
  />
  {{ datetime }}
  <c-chip label="Test" />
  <br />
  <c-datetime v-model="datetime" />
  <c-colorpicker label="Color Picker" v-model="datetime" />
  <c-input
    :modelValue="dates.from + '~' + dates.to"
    label="Date Picker"
    @focus="showDatepicker = true"
  >
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          cover
          no-parent-event
          no-refocus
          no-focus
          transition-show="scale"
          transition-hide="scale"
          :modelValue="showDatepicker"
          @hide="showDatepicker = false"
        >
          <q-date v-model="dates" range today-btn mask="MM-DD-YYYY" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </c-input>
  <c-input
    v-model="text"
    label="Email Address"
    hint="@company.com"
    :rules="[(val) => !!val || 'Field is required']"
  />

  <c-input v-model="text" type="password" label="Password" />
  <c-input v-model="text" type="textarea" label="Address" />
  <c-input clearable v-model="text" type="number" label="Phone" />

  <c-select
    v-model="select"
    :options="['Facebook', 'Google']"
    label="Select Employee"
  />
  <c-multi-select label="Multi Select" :options="options" />
  <c-toggle label="Welcome to India" v-model="tgl" />
  {{ tgl }}
</template>
<script>
import { ref } from "vue";
export default {
  data() {
    return {
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      dialog: false,
      drawer: false,
      datetime: " #661111 ",
      text: "111",
      select: "",
      dates: [],
      showDatepicker: false,
      tgl: false,
    };
  },
};
</script>
