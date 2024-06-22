<template>
  <q-chip
    square
    :color="color"
    :size="size"
    text-color="white"
    :removable="removable"
    @remove="$emit('remove', $event)"
    @click="$emit('click', $event)"
  >
    <slot>
      <q-avatar :icon="icon" v-if="icon" />
      {{ title }}
    </slot>
  </q-chip>
</template>
<script>
export default {
  name: "CButton",
  props: {
    icon: { type: String },
    size: { type: String, default: "md" },
    title: { type: String },
    color: { type: String, default: "primary" },
    removable: { type: Boolean, default: true },
  },
};
</script>
