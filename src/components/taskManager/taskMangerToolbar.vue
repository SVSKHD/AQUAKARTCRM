<template>
  <div>
    <q-toolbar
      v-if="userHide"
      class="bg-accent text-white shadow-2 rounded-borders"
    >
      <q-btn
        label="Create Task"
        class="task-manager-create-button text-white"
        @click="createTask"
      />
      <q-space />
      <q-separator class="q-mr-sm" dark vertical />
      <q-select
        v-model="groupSelect"
        dense
        outlined
        bg-color="white"
        :options="Group"
        options-value="id"
        options-label="label"
        class="q-m-sm csf-toolbar-select"
        label="Group"
        @update:model-value="(val) => getGroupDateInCaseWorker(val)"
      />
    </q-toolbar>

    <q-toolbar v-else class="bg-accent text-white shadow-2 rounded-borders">
      <q-btn
        label="create task"
        class="task-manager-create-button text-white"
        @click="createTask"
      />
      <q-space />

      <q-toggle
        class="q-mr-lg text-black"
        v-model="filterChange"
        color="primary"
        :label="label"
      />
      <q-separator class="q-mr-sm" dark vertical />
      <q-select
        v-if="filterChange"
        v-model="groupSelect"
        dense
        outlined
        bg-color="white"
        :options="Group"
        options-value="id"
        options-label="label"
        class="q-m-sm csf-toolbar-select"
        label="Group"
        @update:model-value="(val) => getGroupDataChange(val)"
      />
      <q-select
        v-else
        v-model="commonUserSelect"
        outlined
        dense
        bg-color="white"
        :options="commonUser"
        options-value="id"
        options-label="label"
        class="q-m-sm csf-toolbar-select"
        label="Common User"
        @update:model-value="(val) => getCommonUserDataChange(val)"
      />
    </q-toolbar>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
import useTaskMangerFunctions from "./taskManager";
export default {
  emits: ["Change"],
  setup(props, context) {
    let filterChange = ref(false);
    let commonUserSelect = ref("");
    let groupSelect = ref("");
    let commonUser = ref([]);
    let Group = ref([]);
    let label = ref("Users");

    const { userHide } = useTaskMangerFunctions();

    const createTask = (event) => {
      context.emit("Change", event.target.value);
    };

    //token
    const Store = useStore();
    const token = computed(() => Store.getters.token);
    //

    const {
      //variables
      filterChangeStatus,
      groupOrUserTaskForDragAndDrop,
      //functions
      getCommonUsersList,
      getGroupUsersList,
      updateUserTasks,
      updateGroupTasksInCaseWorker,
    } = useTaskMangerFunctions();

    watch(filterChange, () => {
      if (filterChange.value === true) {
        groupOrUserTaskForDragAndDrop.value = true;
        filterChangeStatus.value = true;
        console.log("filter from js ", filterChangeStatus.value);
        label.value = "Group";
        commonUserSelect.value = "";
      } else if (filterChange.value === false) {
        groupOrUserTaskForDragAndDrop.value = false;
        filterChangeStatus.value = false;
        label.value = "Users";
        console.log("filter from js", filterChangeStatus.value);
        groupSelect.value = "";
      }
    });

    const getGroupDateInCaseWorker = (data) => {
      updateGroupTasksInCaseWorker(data.id);
    };

    const getGroupDataChange = (data) => {
      console.log("groupd id ", data);
      updateUserTasks(data.id, filterChange.value);
    };

    const getCommonUserDataChange = (data) => {
      console.log("user drop down", data);
      updateUserTasks(data.id, filterChange.value);
    };

    const getCommonUserData = onBeforeMount(() => {
      getCommonUsersList(token.value, commonUser.value);
    });

    const getGroupData = onBeforeMount(() => {
      getGroupUsersList(token.value, Group.value);
    });

    return {
      //varibles
      commonUser,
      Group,
      filterChange,
      userHide,
      commonUserSelect,
      groupSelect,
      label,
      //functions
      createTask,
      //data fetch
      getCommonUserData,
      getGroupData,
      getGroupDataChange,
      getGroupDateInCaseWorker,
      getCommonUserDataChange,
    };
  },
};
</script>
<style>
.q-my-md {
  width: 1100px;
}
</style>
