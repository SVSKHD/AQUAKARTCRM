<template>
  <c-input v-model="color" :label="label" @click="showColorpicker = true">
    <template #append>
      <q-icon name="eva-color-palette-outline" class="cursor-pointer">
        <q-popup-proxy
          cover
          no-parent-event
          no-refocus
          no-focus
          transition-show="scale"
          transition-hide="scale"
          :modelValue="showColorpicker"
          @hide="showColorpicker = false"
        >
          <q-color v-model="color" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </c-input>
</template>
<script>
import { ref } from "vue";
export default {
  name: "CColorpicker",
  props: {
    label: { type: String },
    modelValue: { type: String },
    size: { type: String, default: "md" },
    css: { type: String },
    icon: { type: String },
    flat: { type: Boolean, default: false },
    loading: { type: Boolean },
    outline: { type: Boolean },
    disable: { type: Boolean },
    color: { type: String, default: "primary" },
  },
  setup() {
    return {
      showColorpicker: ref(false),
      color: ref(""),
    };
  },
  created() {
    this.color = this.modelValue;
  },
  watch: {
    color(o, n) {
      if (o !== n) {
        this.$emit("update:modelValue", this.color);
      }
    },
    modelValue(o, n) {
      if (o !== n) {
        this.color = this.modelValue;
      }
    },
  },
};
</script>
