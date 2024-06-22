<template>
  <c-input v-model="dt" label="Date Picker" @click="showDatepicker = true">
    <template #append>
      <q-icon name="eva-calendar-outline" class="cursor-pointer">
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
          <q-time v-model="dt" mask="MM-DD-YYYY HH:mm" format24h />
        </q-popup-proxy>
      </q-icon>
    </template>
    <template #prepend>
      <q-icon name="eva-calendar-outline" class="cursor-pointer">
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
          <q-date v-model="dt" today-btn mask="MM-DD-YYYY HH:mm" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </c-input>
</template>
<script>
import { ref } from "vue";
export default {
  name: "CDatetime",
  props: {
    label: { type: String },
    size: { type: String, default: "md" },
    css: { type: String },
    icon: { type: String },
    flat: { type: Boolean, default: false },
    loading: { type: Boolean },
    outline: { type: Boolean },
    disable: { type: Boolean },
    color: { type: String, default: "primary" },
    type: { type: String, default: "submit" },
  },
  setup() {
    return {
      showDatepicker: ref(false),
      dt: ref(""),
    };
  },
};
</script>
