<template>
  <q-btn round flat icon="eva-bell">
    <q-badge color="red" rounded floating>{{ notificationCount }}</q-badge>
    <q-tooltip>Notifications</q-tooltip>
    <q-menu fit>
      <q-list style="min-width: 300px">
        <c-toggle v-model="notifications" />
        <q-icon :name="notificationsIcon" size="sm" /> {{ message1 }}
        <q-card>
          <q-card-section>
            <q-tabs
              v-model="selectedtab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab
                v-for="tab in NotificationType"
                :key="tab.name"
                :label="tab.label"
                :name="tab.label"
              />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="selectedtab" animated>
              <q-tab-panel
                v-for="tab in NotificationType"
                :key="tab.label"
                :name="tab.label"
              >
                <div class="text-h5">{{ tab.label }}</div>
                <div class="text-h6">{{ tab.value }}</div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { ref, watch, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import pushNotificationServices from "@/Services/PushNotification/PushNotification";
import NotificationHelper from "@/helpers/notificationHelpers/notificationHelper";
export default {
  name: "CNotifications.vue",
  setup() {
    let NotificationType = ref([]);
    let message1 = ref("Notifications are Silenced");
    let notifications = ref(false);
    let notificationsIcon = ref("eva-bell-outline");
    let selectedtab = ref("Scheduler");
    let notificationList = ref([]);
    let notifictationTypeId = ref("1");
    watch(notifications, () => {
      if (notifications.value === true) {
        message1.value = "Notifications Enabled";
        notificationsIcon.value = "eva-bell-outline";
      } else if (notifications.value === false) {
        message1.value = "Notifications are Slilenced";
        notificationsIcon.value = "eva-bell-off-outline";
      }
    });
    const Store = useStore();
    let token = computed(() => Store.getters.token);
    const { createSuccessNotification } = NotificationHelper;
    const {
      getNotificationsType,
      getNotificationByTypeId,
      getNotificationscount,
    } = pushNotificationServices();

    const NotificaitionsTypeApi = onBeforeMount(() => {
      getNotificationsType(token.value).then((data) => {
        let apiData = data.data;
        apiData.map((data) => {
          NotificationType.value.push({
            label: data.name,
            value: data.notificationTypeId,
          });
        });
      });
    });
    let notificationCount = ref(null);

    const Notificationscount = onBeforeMount(() => {
      getNotificationscount(token.value).then((data) => {
        notificationCount.value = data.data;
      });
    });
    const getNotificationByTypeApi = onBeforeMount(() => {
      getNotificationByTypeId(token.value, notifictationTypeId.value)
        .then((data) => {
          let apiData = data.data;
          apiData.map((data) => {
            notificationList.value.push({
              id: data.appointmentId,
              title: data.title,
              message: data.message,
              name: data.name,
            });
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    });
    return {
      //varibales
      message1,
      NotificationType,
      notifications,
      selectedtab,
      notificationsIcon,
      NotificaitionsTypeApi,
      getNotificationByTypeApi,
      notificationList,
      Notificationscount,
      notificationCount,
      //functions
    };
  },
};
</script>

<style scoped></style>
