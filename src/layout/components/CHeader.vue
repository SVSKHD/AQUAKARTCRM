<template>
  <q-header elevated class="bg-white">
    <q-toolbar>
      <q-btn
        flat
        @click="DrawerIcon"
        dense
        :icon="themeIcon"
        class="text-dark"
      />
      <div class="text-h5 q-ml-md">{{ $route.meta.title }}</div>
      <q-space />

      <div v-if="false">
        <!-- <q-btn
          @click="manipulateTheme"
          flat
          class="text-dark"
          :icon="themeIcon"
        /> -->

        <q-btn class="text-dark" dense flat icon="message">
          <q-badge color="red" floating transparent> 4 </q-badge>
        </q-btn>

        <q-btn flat class="text-dark" icon="refresh" />
        <q-btn flat icon="calendar_today" class="text-dark" />

        <q-btn class="text-dark" dense flat icon="notifications">
          <q-badge color="yellow" floating transparent> 4 </q-badge>
        </q-btn>
      </div>
      <q-input class="q-ml-md" dense filled v-model="text">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn flat class="text-dark" icon="settings" v-if="false">
        <q-menu max-width="300px">
          <q-list dense>
            <q-item clickable v-close-popup>
              <q-item-section>Open...</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>New</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Preferences</q-item-section>
              <q-item-section side>
                <q-icon name="keyboard_arrow_right" />
              </q-item-section>

              <q-menu anchor="top end" self="top start">
                <q-list>
                  <q-item v-for="n in 3" :key="n" dense clickable>
                    <q-item-section>Submenu Label</q-item-section>
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                    <q-menu auto-close anchor="top end" self="top start">
                      <q-list>
                        <q-item v-for="n in 3" :key="n" dense clickable>
                          <q-item-section>3rd level Label</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Quit</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <c-notifications :modal="notifications" />
      <q-btn flat class="text-dark" icon="help_outline" v-if="false" />

      <q-btn flat rounded class="text-dark" icon="eva-person-outline">
        <q-badge v-if="onlineStatus" floating color="green" rounded />
        <q-badge v-else floating color="red" rounded />
        <q-tooltip>Profile</q-tooltip>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-separator />
            <q-item to="/settings" clickable v-close-popup>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="Signout" style="color: red !important"
                >Logout</q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import {ref, watch, computed, onBeforeMount} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CToggle from "@/controls/CToggle.vue";
import NotificationHelper from "@/helpers/notificationHelpers/notificationHelper";
export default {
  props: ["themeIcon"],
  setup() {
    let themeIconClick = ref(false);
    let themeIcon = ref("eva-arrowhead-left-outline");
    let drawerStatus = computed(() => Store.state.miniState);
    let onlineStatus = ref("")
    //state
    const Store = useStore();
    let userOnlineStatus = computed(()=>Store.getters.userStatus)
    const onlineUserStatusManipulation = onBeforeMount(()=>{
      if(!userOnlineStatus.value){
        onlineStatus.value=false
      } else if(userOnlineStatus.value===true){
        onlineStatus.value=true
      }else if(userOnlineStatus.value===false){
        onlineStatus.value=false
      }else if(userOnlineStatus.value===null || userOnlineStatus.value===undefined){
        onlineStatus.value=false
      }
    })
    //router
    const Router = useRouter();
    let userStatus = computed(() => Store.getters.userStatus);

    //functions
    const { createSuccessNotification } = NotificationHelper;
    const DrawerIcon = () => {
      themeIconClick.value = !themeIconClick.value;
    };
    const Signout = () => {
      Store.dispatch("logoutUser");
      localStorage.removeItem("CSF");
      localStorage.removeItem("chat-user")
      localStorage.removeItem("chat-token")
    };
    // watch(userStatus, () => {
    //   if (userStatus.value === false) {
    //     Router.push("/");
    //     createSuccessNotification("Successfully Logged Out");
    //   }
    // });

    watch(themeIconClick, () => {
      if (themeIconClick.value === true) {
        Store.dispatch("manipulateMiniState", themeIconClick.value);
        console.log("ministate", drawerStatus.value);
      } else if (themeIconClick.value === false) {
        Store.dispatch("manipulateMiniState", themeIconClick.value);
        console.log("state", themeIconClick.value, drawerStatus.value);
      }
    });

    watch(themeIconClick, () => {
      themeIconClick.value
        ? (themeIcon.value = "eva-arrowhead-right")
        : (themeIcon.value = "eva-arrowhead-left-outline");
    });
    return {
      //variables
      themeIcon,
      onlineStatus,
      themeIconClick,
      //functions
      DrawerIcon,
      onlineUserStatusManipulation,
      Signout,
    };
  },
  components: { CToggle },
};
</script>
