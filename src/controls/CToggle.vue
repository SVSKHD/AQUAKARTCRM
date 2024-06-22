<template>
  <q-toggle
    :class="css"
    :model-value="modelValue"
    :label="label"
    left-label
    :true-value="trueValue"
    :false-value="falseValue"
    :disable="disable"
    @update:model-value="onUpdate"
  >
    <slot />
  </q-toggle>
</template>
<script>
export default {
  name: "CToggle",
  props: {
    label: { type: String },
    modelValue: { type: [String, Array, Boolean] },
    falseValue: { type: [String, Number, Boolean], default: false },
    trueValue: { type: [String, Number, Boolean], default: true },
    css: { type: String },
    disable: { type: Boolean },
  },
  methods: {
    onUpdate(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
