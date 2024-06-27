<template>
  <v-text-field
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :loading="loading"
    density="compact"
    :label="label"
    variant="solo"
    hide-details
    single-line
    @click:append-inner="handleClick"
  />
</template>

<script>
export default {
  name: "AquaInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "mdi-magnify", // Can be set dynamically via props
    },
  },
  emits: ["update:modelValue", "click"],
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>
