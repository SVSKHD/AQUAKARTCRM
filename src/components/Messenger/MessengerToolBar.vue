<template>
  <q-header class="messenger-header">
    <q-toolbar>
      <!-- <q-btn @click="toggleSidebar" icon="menu" /> -->
      <q-toolbar-title class="text-white">{{ title }}</q-toolbar-title>
      <q-space />
      <slot />
    </q-toolbar>
  </q-header>

  <messenger-footer />
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import MessengerFooter from "./MessengerFooter.vue";

export default {
  components: { MessengerFooter },
  name: "AppHeader",
  props: ["title"],
  setup(props, { emit }) {
    const { $q } = useQuasar();
    const sidebar = ref();

    const toggleSidebar = () => {
      sidebar.value = !sidebar.value;
      emit("toggle-sidebar", sidebar.value);
    };

    return {
      toggleSidebar,
    };
  },
};
</script>
