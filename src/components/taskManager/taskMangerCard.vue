<template>
  <div>
    <q-card
      flat
      bordered
      class="task-manager-card"
      draggable="true"
      clickable
      @dragend="dragUpdateCard"
    >
      <q-card-section style="white-space: normal">
        <div class="task-manager-card-title ellipsis">{{ title }}</div>
        <q-tooltip>{{ title }} </q-tooltip>
      </q-card-section>
      <q-card-section>
        <div class="task-manager-card-description">
          {{ description.substring(0, 20) }}
        </div>
        <q-badge align="middle">{{
          priority ? priority : "no priority set"
        }}</q-badge>
      </q-card-section>

      <q-separator inset />

      <q-card-actions>
        <q-btn-group flat>
          <q-btn icon="eva-edit-outline" @click="editDrawer" />
          <!-- <q-btn icon="eva-close" /> -->
        </q-btn-group>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  emits: ["editDrawerChange", "dragUpdateId"],
  props: ["title", "description", "priority"],
  setup(props, context) {
    const editDrawer = (event) => {
      context.emit("editDrawerChange", event.target.value);
    };
    const dragUpdateCard = (event) => {
      context.emit("dragUpdateId", event.target.value);
    };

    return {
      editDrawer,
      dragUpdateCard,
    };
  },
};
</script>
