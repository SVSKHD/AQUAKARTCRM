<template>
  <div class="csf_input">
    {{ label }}
    <q-select
      outlined
      multiple
      dense
      options-dense
      :options="options"
      use-chips
      stack-label
      :label="label"
    />
  </div>
</template>

<script>
export default {
  name: "CMultiSelect.vue",
  props: ["options", "label", "selected"],
};
</script>

<style scoped></style>
