<template>
  <q-card class="task-manager-title-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="task-manager-title-text">
        {{ title }}
      </q-card-section>

      <q-separator vertical />

      <q-card-section>
        <q-btn flat :icon="icon" @click="ManipulateIcon" />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  emits: ["changeIcon"],
  props: ["title", "icon"],
  setup(props, context) {
    const ManipulateIcon = (event) => {
      context.emit("changeIcon", event.target.value);
    };
    return {
      ManipulateIcon,
    };
  },
};
</script>
>
