<template>
  <q-dialog value="value">
    <c-card :title="title">
      <slot />
      <template #header-right>
        <q-btn dense flat icon="close" @click="closeDialog" class="close" />
      </template>
    </c-card>
  </q-dialog>
</template>

<script>
export default {
  emits: ["close"],
  props: ["value", "title"],
  setup(props, context) {
    const closeDialog = (e) => {
      context.emit("close", e.target.value);
    };
    return {
      closeDialog,
    };
  },
};
</script>
>
