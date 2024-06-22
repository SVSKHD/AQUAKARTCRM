<template>
  <q-btn
    unelevated
    :color="color"
    :label="label"
    @click="$emit('click', $event)"
    :loading="loading"
    :icon="icon"
    :disable="disable"
    class="csf_button"
    :outline="outline"
    :class="css"
    :ripple="flat"
    :flat="flat"
    :size="size"
    :type="type"
  />
</template>
<script>
export default {
  name: "CButton",
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
};
</script>
