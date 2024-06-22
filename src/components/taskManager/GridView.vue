<template>
  <div>
    <div>
      <c-drawer
        :title="title"
        :subtitle="subtitle"
        v-model="Drawer"
        @getEvents="CloseTheDrawer"
      >
        <form @submit.prevent="handleSubmit">
          <c-select
            outlined
            label="Task Type"
            dense
            v-model="TaskTypeFetch"
            :rules="[(val) => !!val || 'Task Type is mandatory']"
            options-value="id"
            options-label="label"
            options-dense
            map-options
            use-input
            :options="taskType"
            :mandatory="true"
            @update:model-value="(val) => TaskTypeValue(val)"
          />
          <c-input
            dense
            outlined
            label="Subject"
            :mandatory="true"
            :rules="[(val) => !!val || 'Subject is mandatory']"
            v-model="taskData.subject"
          />
          <c-input
            dense
            outlined
            type="textarea"
            label="Description"
            :mandatory="true"
            :rules="[(val) => !!val || 'Description is mandatory']"
            v-model="taskData.description"
          />
          <c-select
            dense
            outlined
            :rules="[(val) => !!val || 'Task Priority is mandatory']"
            v-model="TaskPriorityFetch"
            :options="priority"
            options-value="id"
            options-label="label"
            options-dense
            map-options
            use-input
            :mandatory="true"
            label="Task Priority"
            @update:model-value="(val) => TypeTaskPriority(val)"
          />

          <c-input
            dense
            v-model="taskData.dueDate"
            label="Due Date"
            mask="####-##-##"
            :mandatory="true"
            :rules="dateRules"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="taskData.dueDate" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Done" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </c-input>
          <c-select
            dense
            outlined
            v-model="TaskReporterFetch"
            options-value="id"
            options-label="label"
            options-dense
            map-options
            :options="reporter"
            label="Reporter"
            :mandatory="true"
            :rules="[(val) => !!val || 'Reporter is mandatory']"
            @update:model-value="(val) => ReporterSelect(val)"
          />
          <c-select
            dense
            outlined
            v-model="StatusColumnFetch"
            :options="StatusColumnsList"
            options-value="id"
            options-label="label"
            options-dense
            map-options
            use-input
            :mandatory="true"
            label="Task Status"
            :rules="[(val) => !!val || 'Task Status is mandatory']"
            @update:model-value="(val) => TaskStatus(val)"
          />
          <c-toggle
            color="Blue"
            v-model="changeAssigneeOrGroup"
            label="Assignee"
          />
          <div v-if="!changeAssigneeOrGroup">
            <c-select
              dense
              outlined
              v-model="CommonUserFetch"
              options-value="id"
              options-label="label"
              options-dense
              map-options
              :options="commonUsers"
              label="Common User"
              @update:model-value="(val) => commonUserSelect(val)"
            />
          </div>
          <div v-else>
            <c-select
              dense
              outlined
              v-model="GroupUserFetch"
              options-value="id"
              options-label="label"
              options-dense
              map-options
              :options="groups"
              label="Group"
              @update:model-value="(val) => groupAssignee(val)"
            />
          </div>
          <q-card-actions>
            <q-btn
              color="primary"
              class="full-width"
              :label="title"
              type="submit"
            />
          </q-card-actions>
        </form>
      </c-drawer>
      <div>
        <task-manager-toolbar @Change="changeCreateTaskDrawer" />
      </div>
    </div>
  </div>
  <grid-loader v-if="gridLoading" />
  <div v-else>
    <q-layout>
      <div class="row justify-evenly">
        <div
          v-for="(column, index) in StatusColumns"
          :key="index"
          class="col-lg-2 col-md-2 col-xs-12 px-3 py-3 mr-4 col-sm-12 task-manager-column task-manager-bg-color task-manager-dock-card"
        >
          <div v-if="column.name === StatusColumns[0].name">
            <tasktitledockcard
              :title="column.name"
              :icon="icon"
              @changeIcon="Sorting(index)"
            />
            <draggable
              :list="datafetch"
              :animation="200"
              ghost-class="ghost-card"
              group="tasks"
              itemKey="title"
              @change="logEventDetails"
              @start="start(index)"
              @end="end(index)"
              @update="update"
            >
              <template #item="{ element }">
                <task-manger-card
                  :title="element.name"
                  :description="element.description"
                  :priority="element.priorityName"
                  @editDrawerChange="changeUpdateTaskDrawer(element)"
                  @dragUpdateId="logEventId(element,StatusColumns[0].name)"
                />
              </template>
            </draggable>
          </div>
          <div v-if="column.name === StatusColumns[1].name">
            <tasktitledockcard
              :title="column.name"
              :icon="icon1"
              @changeIcon="Sorting(index)"
            />
            <draggable
              :list="datafetch2"
              :animation="200"
              ghost-class="ghost-card"
              group="tasks"
              itemKey="title"
              @change="logEventDetails"
              @start="start(index)"
              @end="end(index)"
              @update="update"
            >
              <template #item="{ element }">
                <task-manger-card
                  :title="element.name"
                  :description="element.description"
                  :priority="element.priorityName"
                  @editDrawerChange="changeUpdateTaskDrawer(element)"
                  @dragUpdateId="logEventId(element , StatusColumns[1].name)"
                />
              </template>
            </draggable>
          </div>
          <div v-if="column.name === StatusColumns[2].name">
            <tasktitledockcard
              :title="column.name"
              :icon="icon2"
              @changeIcon="Sorting(index)"
            />
            <draggable
              :list="datafetch3"
              :animation="200"
              ghost-class="ghost-card"
              group="tasks"
              itemKey="title"
              @change="logEventDetails"
              @start="start(index)"
              @end="end(index)"
              @update="update"
            >
              <template #item="{ element }">
                <task-manger-card
                  :title="element.name"
                  :description="element.description"
                  :priority="element.priorityName"
                  @editDrawerChange="changeUpdateTaskDrawer(element)"
                  @dragUpdateId="logEventId(element , StatusColumns[2].name)"
                />
              </template>
            </draggable>
          </div>
          <div v-if="column.name === StatusColumns[3].name">
            <tasktitledockcard
              :title="column.name"
              :icon="icon3"
              @changeIcon="Sorting(index)"
            />
            <draggable
              :list="datafetch4"
              :animation="200"
              ghost-class="ghost-card"
              group="tasks"
              itemKey="title"
              @change="logEventDetails"
              @start="start(index)"
              @end="end(index)"
              @update="update"
            >
              <template #item="{ element }">
                <task-manger-card
                  :title="element.name"
                  :description="element.description"
                  :priority="element.priorityName"
                  @editDrawerChange="changeUpdateTaskDrawer(element)"
                  @dragUpdateId="logEventId(element , StatusColumns[3].name)"
                />
              </template>
            </draggable>
          </div>
          <div v-if="column.name === StatusColumns[4].name">
            <tasktitledockcard
              :title="column.name"
              :icon="icon4"
              @changeIcon="Sorting(index)"
            />
            <draggable
              :list="datafetch5"
              :animation="200"
              ghost-class="ghost-card"
              group="tasks"
              itemKey="title"
              @change="logEventDetails"
              @start="start(index)"
              @end="end(index)"
              @update="update"
            >
              <template #item="{ element }">
                <task-manger-card
                  :title="element.name"
                  :description="element.description"
                  :priority="element.priorityName"
                  @editDrawerChange="changeUpdateTaskDrawer(element)"
                  @dragUpdateId="logEventId(element , StatusColumns[4].name)"
                />
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </q-layout>
  </div>
</template>
<script>
import { ref, reactive ,  watch, computed, onBeforeMount } from "vue";
import draggable from "vuedraggable";
import useTaskMangerFunctions from "./taskManager";
import taskManagerToolbar from "./taskMangerToolbar.vue";
import tasktitledockcard from "./taskTitleDockCard.vue";
import taskMangerCard from "./taskMangerCard.vue";
import gridLoading from "./gridLoader.vue";
import { useStore } from "vuex";
import moment from "moment";
import notificationHelper from "@/helpers/notificationHelpers/notificationHelper";
import TaskApiOperations from "@/Services/TaskManagment/TaskManagement";

export default {
  name: "App",
  components: {
    draggable,
    taskManagerToolbar,
    taskMangerCard,
    tasktitledockcard,
    gridLoading,
  },
  setup() {
    let StatusColumns = ref([]);
    let Drawer = ref(false);
    let updateTaskDrawer = ref(false);
    let createTaskDrawer = ref(false);
    let gridLoading = ref(false);
    let manipulate = ref(false);
    let title = ref("Create Task");
    let subtitle = ref("create your tasks");
    let ReloadTasksBygroupId = ref(false);
    let ReloadTasksByUserId = ref(false);
    //let changeSortIcon = ref(false);
    //edit Id
    let Id = ref("");
    let tempId = ref(null);
    //drawer data
    let StatusColumnFetch = ref([]);
    let StatusColumnsList = ref([]);
    let GroupUserFetch = ref([]);
    let CommonUserFetch = ref([]);
    let TaskTypeFetch = ref([]);
    let TaskPriorityFetch = ref([]);
    let TaskReporterFetch = ref([]);
    let taskType = ref([]);
    let priority = ref([]);
    let reporter = ref([]);
    let group = ref([]);
    let groups = ref([]);
    let commonUsers = ref([]);
    let changeAssigneeOrGroup = ref(false);
    //arrays for the task filling.
    let datafetch = ref([]);
    let datafetch2 = ref([]);
    let datafetch3 = ref([]);
    let datafetch4 = ref([]);
    let datafetch5 = ref([]);
    //Role Variable
    let userHide = ref(false);
    //store and store varibles
    const Store = useStore();
    let token = computed(() => Store.getters.token);
    //column booleans
    let BackLog = ref(false);
    let Analysis = ref(false);
    let inProgress = ref(false);
    let pause = ref(false);
    let complete = ref(false);
    let icon = ref("eva-arrowhead-down-outline");
    let icon1 = ref("eva-arrowhead-down-outline");
    let icon2 = ref("eva-arrowhead-down-outline");
    let icon3 = ref("eva-arrowhead-down-outline");
    let icon4 = ref("eva-arrowhead-down-outline");
    //usables from js.
    //notifications
    const { createSuccessNotification, createErrorNotification } =
      notificationHelper;
    const {
      //variables
      DrawerStatus,
      ReloadTasks,
      loadingStatus,
      ReloadTasksByGroup,
      CommonUserById,
      groupChangeToggle,
      groupChangeValue,
      GroupById,
      ID,
      userId,
      groupId,
      groupOrUserTaskForDragAndDrop,
      //functions
      Reload,
      ReloadByGroup,
      userManiupulations,
      getAllTaskStatus,
      LoadAlltasks,
      CreateAndUpdate,
      getDataById,
      getAllTypesOfTasks,
      getAllPriorityList,
      getAllRepoterList,
      getGroupUsersList,
      getGroupUsers,
      getCommonUsersList,
      LoadTasksByCommonUsers,
      LoadTasksByGroup,
      getDataByIdinObject,
      fillData,
      emptyTasks,
      dragUpdate,
      dragUpdateId,
    } = useTaskMangerFunctions();
    const { getTaskById } = TaskApiOperations();

    const changeTheIcon = () => {
      changeSortIcon.value = !changeSortIcon.value;
    };

    //drag and drop variables
    let oldIndex = ref("")
    let newIndex = ref("")
    let oldData = ref("")
    let newData = ref("")

    const logEventDetails = (e) => {
      oldIndex.value=e.removed
      newIndex.value=e.added
      console.log("removed index" , oldIndex.value)
      console.log("added index" ,  newIndex.value)
      //dragUpdate(event, index + 1, element);
    };

    const logEventId = (id , index) => {
      console.log("log event id" , id , index)
      console.log("event id" , index)
      //dragUpdateId(id , index);
    };

    const start = (e) => {
      console.log("start",e);
    };

    const update = (e) => {
      console.log("update", e);
    };

    const end = (e) => {
      console.log("end", e);
    };

    const Allcolumns = onBeforeMount(() => {
      getAllTaskStatus(
        token.value,
        StatusColumns.value,
        StatusColumnsList.value
      );
    });

    const CloseTheDrawer = () => {
      Drawer.value = false;
      updateTaskDrawer.value = false;
      createTaskDrawer.value = false;
    };

    watch(DrawerStatus, () => {
      if (DrawerStatus.value === true) {
        Drawer.value = false;
      }
    });

    const handleSubmit = (data) => {
      const today = moment().format("YYYY-MM-DD");
      if (createTaskDrawer.value === true) {
        if (!taskData.value.subject) {
          createErrorNotification("Please fill all the mandatory fields");
        } else if (!taskData.value.description) {
          createErrorNotification("Please fill all the mandatory fields");
        } else if (TaskTypeFetch.value.length === 0) {
          createErrorNotification("Please fill all the mandatory fields");
        } else if (TaskPriorityFetch.value.length === 0) {
          createErrorNotification("Please fill all the mandatory fields");
        } else if (!taskData.value.dueDate) {
          createErrorNotification("Please fill all the mandatory fields");
        } else if (taskData.value.dueDate < today) {
          Drawer.value = true;
        } else if (TaskReporterFetch.value.length === 0) {
          createErrorNotification("Please fill all the mandatory fields");
        } else if (StatusColumnFetch.value.length === 0) {
          createErrorNotification("Please fill all the mandatory fields");
        } else {
          CreateAndUpdate(
            token.value,
            data,
            updateTaskDrawer.value,
            createTaskDrawer.value,
            taskData.value,
            changeAssigneeOrGroup.value,
            StatusColumnFetch.value,
            TaskTypeFetch.value,
            TaskPriorityFetch.value,
            TaskReporterFetch.value,
            StatusColumnFetch.value
          );
        }
      } else if (updateTaskDrawer.value === true) {
        // if (!taskData.value.subject) {
        //   createErrorNotification("Please fill all the mandatory fields");
        // } else if (!taskData.value.description) {
        //   createErrorNotification("Please fill all the mandatory fields");
        // } else if (TaskTypeFetch.value.length === 0) {
        //   createErrorNotification("Please fill all the mandatory fields");
        // } else if (TaskPriorityFetch.value.length === 0) {
        //   createErrorNotification("Please fill all the mandatory fields");
        // } else if (!taskData.value.dueDate) {
        //   createErrorNotification("Please fill all the mandatory fields");
        // } else if (taskData.value.dueDate < today) {
        //   Drawer.value = true;
        // } else if (TaskReporterFetch.value.length === 0) {
        //   createErrorNotification("Please fill all the mandatory fields");
        // } else if (StatusColumnFetch.value.length === 0) {
        //   createErrorNotification("Please fill all the mandatory fields");
        // }else{
        CreateAndUpdate(
          token.value,
          data,
          updateTaskDrawer.value,
          createTaskDrawer.value,
          taskData.value,
          changeAssigneeOrGroup.value,
          StatusColumnFetch.value,
          TaskTypeFetch.value,
          TaskPriorityFetch.value,
          TaskReporterFetch.value,
          StatusColumnFetch.value
        );
      }
    };
    watch(loadingStatus, () => {
      if (loadingStatus.value === true) {
        gridLoading.value = true;
      } else {
        gridLoading.value = false;
      }
    });
    //drawer data functions
    const TaskTypes = onBeforeMount(() => {
      getAllTypesOfTasks(token.value, taskType.value);
    });

    const PriorityList = onBeforeMount(() => {
      getAllPriorityList(token.value, priority.value);
    });

    const ReporterList = onBeforeMount(() => {
      getAllRepoterList(token.value, reporter.value);
    });

    const GroupList = onBeforeMount(() => {
      getGroupUsersList(token.value, group.value);
    });

    const GroupLists = onBeforeMount(() => {
      getGroupUsers(token.value, groups.value);
    });

    const CommonUserList = onBeforeMount(() => {
      getCommonUsersList(token.value, commonUsers.value);
    });
    //drawervalues
    const TaskTypeValue = (id) => {
      if (!id) {
        taskData.value.taskType = null;
      } else {
        taskData.value.taskType.taskTypeId = id.id;
        taskData.value.taskType.name = id.label;
      }
    };
    const TypeTaskPriority = (id) => {
      if (!id) {
        taskData.value.priority = null;
      } else {
        if (id.id === 1) {
          taskData.value.dueDate = moment()
            .add(10, "days")
            .format("YYYY-MM-DD");
        } else if (id.id === 2) {
          taskData.value.dueDate = moment().add(5, "days").format("YYYY-MM-DD");
        } else if (id.id === 3) {
          taskData.value.dueDate = moment().add(2, "days").format("YYYY-MM-DD");
        }
      }
      taskData.value.priority.priorityId = id.id;
      taskData.value.priority.name = id.label;
    };

    const ReporterSelect = (id) => {
      if (!id) {
        taskData.value.reporter = null;
      } else if (id) {
        taskData.value.reporter.cusId = id.id;
      }
    };

    const TaskStatus = (id) => {
      if (!id) {
        taskData.value.taskStatus = null;
      } else if (id) {
        taskData.value.taskStatus.taskStatusId = id.id;
        taskData.value.taskStatus.name = id.label;
      }
    };

    const groupAssignee = (id) => {
      if (changeAssigneeOrGroup.value === false) {
        taskData.value.groupAssignee = null;
      } else if (changeAssigneeOrGroup.value === true) {
        taskData.value.groupAssignee = { groupId: id.id, name: id.label };
        taskData.value.assignee = null;
      }
    };
    const commonUserSelect = (id) => {
      if (changeAssigneeOrGroup.value === false) {
        taskData.value.assignee = { cusId: id.id, cusUserTxt: id.label };
        taskData.value.groupAssignee = null;
      } else if (changeAssigneeOrGroup.value === true) {
        taskData.value.assignee = null;
      }
    };

    const allTasks = onBeforeMount(() => {
      LoadAlltasks(
        token.value,
        StatusColumns.value,
        datafetch.value,
        datafetch2.value,
        datafetch3.value,
        datafetch4.value,
        datafetch5.value
      );
    });

    watch(changeAssigneeOrGroup, () => {
      changeAssigneeOrGroup
        ? console.log("toggle", changeAssigneeOrGroup.value)
        : console.log("toggle", changeAssigneeOrGroup.value);
      if (changeAssigneeOrGroup.value === false) {
        taskData.value.groupAssignee = null;
        GroupUserFetch.value = "";
        LoadAlltasks(
          token.value,
          StatusColumns.value,
          datafetch.value,
          datafetch2.value,
          datafetch3.value,
          datafetch4.value,
          datafetch5.value
        );
        ReloadTasksBygroupId.value = false;
      } else if (changeAssigneeOrGroup.value === true) {
        taskData.value.assignee = null;
        CommonUserFetch.value = "";
        ReloadTasksByUserId.value = false;
        ReloadTasksBygroupId.value = true;
      }
    });

    watch(updateTaskDrawer, () => {
      if (updateTaskDrawer.value === true) {
        title.value = "Update Task";
        subtitle.value = "update your tasks here";
      }
    });

    watch(createTaskDrawer, () => {
      if (createTaskDrawer.value === true) {
        title.value = "Create Task";
        subtitle.value = "Create your tasks here";
      }
    });

    let taskData = ref("");
    //watchers
    watch(groupChangeToggle, () => {
      groupChangeToggle.value
        ? (changeAssigneeOrGroup.value = true)
        : (changeAssigneeOrGroup.value = false);
    });
    let emptyArray = ref([]);
    watch(Drawer, () => {
      if (Drawer.value === false) {
        taskData.value = {
          taskType: {
            taskTypeId: "",
            name: "",
          },
          subject: "",
          description: "",
          createdBy: "",
          createdDateTime: "",
          priority: {
            priorityId: "",
          },
          reporter: {
            cusId: "",
          },
          groupAssignee: "",
          assignee: {
            cusId: "",
            cusUserTxt: "",
          },
          dueDate: "",
          taskStatus: {
            taskStatusId: "",
            name: "",
          },
        };
        createTaskDrawer.value = false;
        updateTaskDrawer.value = false;
        DrawerStatus.value = false;
        ReloadTasksByGroup.value = false;
        ReloadTasks.value = false;
        loadingStatus.value = false;
        TaskTypeFetch.value = [];
        TaskPriorityFetch.value = [];
        TaskReporterFetch.value = [];
        CommonUserFetch.value = [];
        GroupUserFetch.value = [];
        StatusColumnFetch.value = [];
        groupChangeToggle.value = false;
        changeAssigneeOrGroup.value = false;
      }
    });

    watch(createTaskDrawer, () => {
      taskData.value = {
        taskType: {
          taskTypeId: "",
          name: "",
        },
        subject: "",
        description: "",
        priority: {
          priorityId: "",
          name: "",
        },
        reporter: {
          cusId: "",
        },
        groupAssignee: "",
        assignee: "",
        dueDate: "",
        taskStatus: {
          taskStatusId: "",
          name: "",
        },
      };
      ReloadTasks.value = false;
      loadingStatus.value = false;
    });

    const changeUpdateTaskDrawer = async (data) => {
      Id.value = data.id;
      Drawer.value = true;
      createTaskDrawer.value = false;
      updateTaskDrawer.value = true;
      await getTaskById(token.value, data.id).then((data) => {
        let apiData = data.data;
        taskData.value.subject = apiData.subject; //subject
        taskData.value.description = apiData.description; //description
        taskData.value.createdBy = apiData.createdBy;
        taskData.value.createdDateTime = apiData.createdDateTime;
        //task type
        if (apiData.taskType === null) {
          taskData.value.taskType = null;
        } else if (apiData.taskType.taskTypeId) {
          TaskTypeFetch.value.id = apiData.taskType.taskTypeId;
          TaskTypeFetch.value.label = apiData.taskType.name;
          taskData.value.taskType.taskTypeId = apiData.taskType.taskTypeId;
          taskData.value.taskType.name = apiData.taskType.name;
        }
        //taskStatus
        if (!apiData.taskStatus.taskStatusId) {
          taskData.value.taskStatus;
        } else if (apiData.taskStatus.taskStatusId) {
          taskData.value.taskStatus.taskStatusId =
            apiData.taskStatus.taskStatusId;
          taskData.value.taskStatus.name = apiData.taskStatus.name;
          StatusColumnFetch.value.id = apiData.taskStatus.taskStatusId;
          StatusColumnFetch.value.label = apiData.taskStatus.name;
        }
        //reporter
        if (apiData.reporter === null) {
          taskData.value.reporter = null;
        } else {
          taskData.value.reporter.cusId = apiData.reporter.cusId;
          TaskReporterFetch.value.id = apiData.reporter.cusId;
          TaskReporterFetch.value.label = apiData.reporter.cusUserTxt;
        }
        //priority
        if (apiData.priority === null) {
          taskData.value.prirority = null;
        } else {
          taskData.value.priority.priorityId = apiData.priority.priorityId;
          TaskPriorityFetch.value.id = apiData.priority.priorityId;
          TaskPriorityFetch.value.label = apiData.priority.name;
          console.log(
            "proiority data from edit",
            apiData.createdBy,
            "task priority",
            TaskPriorityFetch.value
          );
        }

        //duedate
        if (!apiData.dueDate) {
        } else if (apiData.dueDate) {
          taskData.value.dueDate = apiData.dueDate;
        }
        if (!apiData.assignee && !apiData.groupAssignee) {
          taskData.value.groupAssignee = null;
          taskData.value.assignee = null;
        } else if (!apiData.assignee) {
          changeAssigneeOrGroup.value = true;
          taskData.value.assignee = null;
          taskData.value.groupAssignee = { ...apiData.groupAssignee };
          GroupUserFetch.value.id = apiData.groupAssignee.groupId;
          GroupUserFetch.value.label = apiData.groupAssignee.name;
        } else if (!apiData.groupAssignee) {
          changeAssigneeOrGroup.value = false;
          taskData.value.groupAssignee = null;
          taskData.value.assignee.cusId = apiData.assignee.cusId;
          taskData.value.assignee.cusUserTxt = apiData.assignee.cusUserTxt;
          CommonUserFetch.value.id = apiData.assignee.cusId;
          CommonUserFetch.value.label = apiData.assignee.cusUserTxt;
        }
      });
    };

    watch(updateTaskDrawer, () => {
      if (updateTaskDrawer.value === true) {
        TaskTypeFetch.value = [];
        TaskPriorityFetch.value = [];
        TaskReporterFetch.value = [];
        CommonUserFetch.value = [];
        GroupUserFetch.value = [];
        StatusColumnFetch.value = [];
        taskData.value = {
          taskId: Id.value,
          taskType: {
            taskTypeId: "",
            name: "",
          },
          subject: "",
          description: "",
          priority: {
            priorityId: "",
          },
          reporter: { cusId: "" },
          groupAssignee: "",
          assignee: {
            cusId: "",
            cusUserTxt: "",
          },
          createdBy: "",
          createdDateTime: "",
          dueDate: "",
          taskStatus: {
            taskStatusId: "",
            name: "",
          },
        };
        ReloadTasks.value = false;
      }
    });

    watch(GroupById, () => {
      if (GroupById.value === true) {
        datafetch.value.splice(0, datafetch.value.length);
        datafetch4.value.splice(0, datafetch4.value.length);
        datafetch2.value.splice(0, datafetch2.value.length);
        datafetch3.value.splice(0, datafetch5.value.length);
        datafetch5.value.splice(0, datafetch5.value.length);
        LoadTasksByGroup(
          token.value,
          ID.value,
          StatusColumns.value,
          datafetch.value,
          datafetch2.value,
          datafetch3.value,
          datafetch4.value,
          datafetch5.value
        );
      }
    });

    watch(CommonUserById, () => {
      if (CommonUserById.value === true) {
        datafetch.value.splice(0, datafetch.value.length);
        datafetch2.value.splice(0, datafetch2.value.length);
        datafetch3.value.splice(0, datafetch5.value.length);
        datafetch4.value.splice(0, datafetch4.value.length);
        datafetch5.value.splice(0, datafetch5.value.length);
        LoadTasksByCommonUsers(
          token.value,
          ID.value,
          StatusColumns.value,
          datafetch.value,
          datafetch2.value,
          datafetch3.value,
          datafetch4.value,
          datafetch5.value
        );
      }
    });

    watch(ReloadTasks, () => {
      if (ReloadTasks.value === true) {
        datafetch.value.splice(0, datafetch.value.length);
        datafetch2.value.splice(0, datafetch2.value.length);
        datafetch3.value.splice(0, datafetch5.value.length);
        datafetch4.value.splice(0, datafetch4.value.length);
        datafetch5.value.splice(0, datafetch5.value.length);
        LoadTasksByCommonUsers(
          token.value,
          ID.value,
          StatusColumns.value,
          datafetch.value,
          datafetch2.value,
          datafetch3.value,
          datafetch4.value,
          datafetch5.value
        );
      }
    });
    //reload by group Id
    watch(ReloadTasksByGroup, () => {
      if (ReloadTasksByGroup.value === true) {
        datafetch.value.splice(0, datafetch.value.length);
        datafetch4.value.splice(0, datafetch4.value.length);
        datafetch2.value.splice(0, datafetch2.value.length);
        datafetch3.value.splice(0, datafetch5.value.length);
        datafetch5.value.splice(0, datafetch5.value.length);
        LoadTasksByGroup(
          token.value,
          ID.value,
          StatusColumns.value,
          datafetch.value,
          datafetch2.value,
          datafetch3.value,
          datafetch4.value,
          datafetch5.value
        );
      }
    });

    watch(BackLog, () => {
      BackLog.value
        ? (icon.value = "eva-arrowhead-up-outline")
        : (icon.value = "eva-arrowhead-down-outline");
    });

    watch(Analysis, () => {
      Analysis.value
        ? (icon1.value = "eva-arrowhead-up-outline")
        : (icon1.value = "eva-arrowhead-down-outline");
    });

    watch(inProgress, () => {
      inProgress.value
        ? (icon2.value = "eva-arrowhead-up-outline")
        : (icon2.value = "eva-arrowhead-down-outline");
    });

    watch(pause, () => {
      pause.value
        ? (icon3.value = "eva-arrowhead-up-outline")
        : (icon3.value = "eva-arrowhead-down-outline");
    });

    watch(complete, () => {
      complete.value
        ? (icon4.value = "eva-arrowhead-up-outline")
        : (icon4.value = "eva-arrowhead-down-outline");
    });

    const changeCreateTaskDrawer = () => {
      Drawer.value = true;
      updateTaskDrawer.value = false;
      createTaskDrawer.value = true;
    };

    //userHide
    // const userManipulation = onBeforeMount(() => {
    //   if (Store.getters.role === "Case Supervisor") {
    //   } else if (Store.getters.role === "Case Worker") {
    //     userHide.value = true;
    //   } else if (Store.getters.role === "System User") {
    //     userHide.value = true;
    //   } else {
    //     userHide.value = true;
    //   }
    // });
    let userStatus = computed(() => Store.getters.userStatus);
    let role = computed(() => Store.getters.role);
    onBeforeMount(() => {
      console.log("user-status", userStatus.value, role.value);
      if (userStatus.value === true) {
        userManiupulations(role.value);
      }
    });

    //sortingfunctions
    const Sorting = (data) => {
      if (data === 0) {
        BackLog.value = !BackLog.value;
        if (BackLog.value === true) {
          datafetch.value = datafetch.value.sort(
            (a, b) => a.priority - b.priority
          );
        } else if (BackLog.value === false) {
          datafetch.value = datafetch.value.sort(
            (a, b) => b.priority - a.priority
          );
        }
      }
      if (data === 1) {
        Analysis.value = !Analysis.value;
        if (Analysis.value === true) {
          datafetch2.value = datafetch2.value.sort(
            (a, b) => a.priority - b.priority
          );
        } else if (Analysis.value === false) {
          datafetch2.value = datafetch2.value.sort(
            (a, b) => b.priority - a.priority
          );
        }
      }
      if (data === 2) {
        inProgress.value = !inProgress.value;
        if (inProgress.value === true) {
          datafetch3.value = datafetch3.value.sort(
            (a, b) => a.priority - b.priority
          );
        } else if (inProgress.value === false) {
          datafetch3.value = datafetch3.value.sort(
            (a, b) => b.priority - a.priority
          );
        }
      }
      if (data === 3) {
        pause.value = !pause.value;
        if (pause.value === true) {
          datafetch4.value = datafetch4.value.sort(
            (a, b) => a.priority - b.priority
          );
        } else if (pause.value === false) {
          datafetch4.value = datafetch4.value.sort(
            (a, b) => b.priority - a.priority
          );
        }
      }
      if (data === 4) {
        complete.value = !complete.value;
        if (complete.value === true) {
          datafetch5.value = datafetch5.value.sort(
            (a, b) => a.priority - b.priority
          );
        } else if (complete.value === false) {
          datafetch5.value = datafetch5.value.sort(
            (a, b) => b.priority - a.priority
          );
        }
      }
    };
    let dateRules = [
      (val) => dateValidation(val) === true || "Date is Invalid",
      (val) =>
        dateTaskValidation(val) === true ||
        "Date shouldn't be prior to the current date",
    ];
    const dateValidation = (val) => {
      const year = parseInt(val.split("-")[0]);
      const month = parseInt(val.split("-")[1]);
      const day = parseInt(val.split("-")[2]);
      let flag1 = ref(0);
      let flag2 = ref(0);
      let flag3 = ref(0);
      let flag4 = ref(0);
      let flag5 = ref(0);
      if (year > 1800 && year < 2100) flag1 = 1;
      if (
        (month === 1 ||
          month === 3 ||
          month === 5 ||
          month === 7 ||
          month === 8 ||
          month === 10 ||
          month === 12) &&
        day <= 31
      )
        flag2 = 1;
      if (month === 2 && day <= 29 && isLeapYear(year)) flag3 = 1;
      if (month === 2 && day <= 28) flag5 = 1;
      if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        day <= 30
      )
        flag4 = 1;
      if (
        (flag1 == 1 && flag2 == 1) ||
        (flag1 == 1 && flag3 == 1) ||
        (flag1 == 1 && flag4 == 1) ||
        (flag1 == 1 && flag5 == 1)
      )
        return true;
      else return false;
    };
    const isLeapYear = (year) => {
      if (year % 400 == 0) return true;
      if (year % 100 == 0) return false;
      if (year % 4 == 0) return true;
      return false;
    };

    const dateTaskValidation = (val) => {
      const today = new Date(Date.now() - 864e5);
      const d1 = new Date(val);
      if (d1 >= today) return true;
      return false;
    };

    return {
      Drawer,
      updateTaskDrawer,
      createTaskDrawer,
      taskData,
      title,
      subtitle,
      StatusColumns,
      allTasks,
      Id,
      userHide,
      manipulate,
      emptyArray,
      ReloadTasksBygroupId,
      ReloadTasksByUserId,
      gridLoading,
      //changeSortIcon,
      //drawerdata
      StatusColumnFetch,
      StatusColumnsList,
      GroupUserFetch,
      CommonUserFetch,
      TaskTypeFetch,
      TaskPriorityFetch,
      TaskReporterFetch,
      taskType,
      priority,
      reporter,
      group,
      groups,
      commonUsers,
      ReporterList,
      PriorityList,
      changeAssigneeOrGroup,
      GroupList,
      GroupLists,
      CommonUserList,
      //datadrawerchnage
      TaskTypeValue,
      TypeTaskPriority,
      ReporterSelect,
      TaskStatus,
      groupAssignee,
      commonUserSelect,
      //column array
      datafetch,
      datafetch2,
      datafetch3,
      datafetch4,
      datafetch5,
      //functions
      Allcolumns,
      CloseTheDrawer,
      changeCreateTaskDrawer,
      changeUpdateTaskDrawer,
      changeTheIcon,
      //lifecycle
      TaskTypes,
      //crud
      handleSubmit,
      //sorting
      Sorting,
      //sortingIcons
      BackLog,
      Analysis,
      pause,
      inProgress,
      complete,
      icon,
      icon1,
      icon2,
      icon3,
      icon4,
      //rules
      dateRules,
      logEventDetails,
      logEventId,
      start,
      end,
      update,
      oldIndex,
      oldData,
      newIndex,
      newData
    };
  },
};
</script>
<style>
.column-width {
  min-width: 220px;
  width: 220px;
  height: 700px;
  overflow: auto;
}
.row,
.column,
.flex {
  flex-wrap: nowrap;
}
</style>
