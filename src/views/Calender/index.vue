<template>
  <GridView v-show="showView == 'GRID'" />
  <ListView v-show="showView == 'LIST'" />
</template>
<script>
import GridView from "../../components/taskManager/GridView.vue";
import ListView from "../../components/taskManager/ListView.vue";
export default {
  components: {
    ListView,
    GridView,
  },
  setup() {
    return {
      showView: "GRID",
    };
  },
};
</script>
