<template>
  <q-item>
    <q-item-section class="title-avatar-margin" avatar>
      <q-avatar size="50px">
        <img src="@/assets/CSLOGO.jpg" alt="CSF-LOGO" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="text-left text-h6 text-title-align">Child Support</div>
      <div>Enforcement</div>
    </q-item-section>
  </q-item>
  <!--<div>-->
  <q-item v-if="miniState" clickable>
    <q-item-section avatar>
      <q-btn
        dense
        round
        unelevated
        color="white"
        class="text-black"
        icon="eva-person-outline"
      />
    </q-item-section>
  </q-item>

  <q-item v-else clickable class="q-mt-lg q-mb-lg">
    <q-item-section avatar>
      <q-btn
        dense
        round
        unelevated
        color="white"
        class="text-black"
        icon="eva-person-outline"
      />
    </q-item-section>
    <q-item-section>
      <div class="dashboard-align-titles">
        <div class="dashboard-title2">{{ username }}</div>
        <div v-if="Loading">
          <q-spinner color="teal-1" size="3em" :thickness="2" />
        </div>
        <div v-else class="dashboard-title3">{{ role }}</div>
      </div>
    </q-item-section>
    <q-item-section avatar v-if="$q.screen.gt.sm"> </q-item-section>
  </q-item>

  <!-- layout menu -->
  <div v-for="item in menu" :key="item" class="menu">
    <q-list v-if="!item.submenu">
      <q-item clickable :to="item.path">
        <q-item-section avatar class="menu-icon">
          <q-icon size="24px" :name="item.icon" />
        </q-item-section>

        <q-item-section class="menu-item">
          {{ item.name }}
        </q-item-section>
      </q-item>
    </q-list>
    <q-expansion-item v-else>
      <template #header>
        <q-item-section avatar class="menu-icon">
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section class="menu-item">
          {{ item.name }}
        </q-item-section>
      </template>
    </q-expansion-item>
    <q-separator dark />
  </div>

  <div v-if="miniState"></div>

  <div v-else>
    <div class="text-center version">
      {{ version }}
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import a from "@/utils/constants.js";
import userOperations from "@/Services/UserService";
export default {
  props: {
    miniState: {
      type: Boolean,
    },
  },
  setup() {
    //variables
    const version = ref("V1.1 2022-09-01");
    const { appRoute } = a;
    let username = ref("");
    const Store = useStore();
    const Router = useRouter();
    let role = ref("");
    let menu = ref([]);
    let devMenu = ref([
      {
        path: appRoute.DASHBOARD,
        name: "Dashboard",
        icon: "eva-activity-outline",
      },
      {
        path: appRoute.CALENDER,
        name: "Calendar",
        icon: "eva-calendar-outline",
      },
      {
        path: appRoute.MESSAGE,
        name: "Messenger",
        icon: "eva-message-square-outline",
      },
      {
        path: appRoute.TASK,
        name: "Task Manager",
        icon: "eva-file-text-outline",
      },
      {
        path: appRoute.SETTINGS,
        name: "Settings",
        icon: "eva-settings-2-outline",
      },
      {
        path: appRoute.UI,
        name: "UI-Test",
        icon: "eva-options-outline",
      },
      {
        path: appRoute.FORMBUILDER,
        name: "Form-Builder",
        icon: "eva-clipboard-outline",
      },
      {
        path: appRoute.TESTSCHEDULERUI,
        name: "scheduler-test",
        icon: "eva-calendar-outline",
      },
      {
        path: appRoute.TESTTASKMANAGERUI,
        name: "taskmanger-test",
        icon: "eva-list-outline",
      },
    ]);
    let prodMenu = ref([
      {
        path: appRoute.DASHBOARD,
        name: "Dashboard",
        icon: "eva-activity-outline",
      },
      {
        path: appRoute.CALENDER,
        name: "Calendar",
        icon: "eva-calendar-outline",
      },
      {
        path: appRoute.MESSAGE,
        name: "Messenger",
        icon: "eva-message-square-outline",
      },
      {
        path: appRoute.TASK,
        name: "Task Manager",
        icon: "eva-file-text-outline",
      },
      {
        path: appRoute.SETTINGS,
        name: "Settings",
        icon: "eva-settings-2-outline",
      },
    ]);
    let Mode = process.env.VUE_APP_UI;
    let Loading = ref(false);
    //functions
    const MenuModeChange = onBeforeMount(() => {
      if (Mode === "Production") {
        menu.value = { ...prodMenu.value };
      } else if (Mode === "Development") {
        menu.value = { ...devMenu.value };
      } else {
        menu.value = { ...prodMenu.value };
      }
    });

    const goto = (p) => {
      Router.push(p);
    };
    //token
    let token = computed(() => Store.getters.token);
    //userRole
    const { userRole } = userOperations();
    const userDetails = onBeforeMount(() => {
      if (Store.getters.userStatus === true) {
        username.value = Store.getters.user.cusUserTxt;
        Loading.value = true;
        userRole(token.value).then((data) => {
          let apiData = data.data;
          Store.dispatch("roleAssign", apiData[0].croRoleTxt);
          role.value = apiData[0].croRoleTxt;
        });
      } else if (Store.getters.userStatus === false) {
        // Router.push("/");
      }
    });
    return {
      //variables
      menu,
      username,
      role,
      version,
      devMenu,
      prodMenu,
      Mode,
      //functions
      goto,
      userDetails,
      MenuModeChange,
    };
  },
};
</script>
