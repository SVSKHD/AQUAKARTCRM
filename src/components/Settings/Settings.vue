<template>
  <div>
    <div>
      <WelcomeMessage
        class="q-mb-md"
        :username="WelcomeMessageVariable"
        :role="Role"
      />
    </div>
    <div>
      <q-card>
        <q-card-section>
          <q-splitter v-model="splitterModel" style="height: 350px">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-primary">
                <q-tab
                  name="notifications"
                  icon="notifications"
                  label="Notifications"
                />
                <q-tab name="preferences" icon="settings" label="preferences" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="notifications">
                  <div class="text-h6 text-primary q-mb-md">Notifications</div>
                  <q-toggle
                    v-model="Notifications"
                    :label="NotificationLabel"
                    class="text-primary"
                  />
                </q-tab-panel>
              </q-tab-panels>
            </template>

            <q-separator />
          </q-splitter>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import WelcomeMessage from "@/components/dashboard/WelcomeMessage";

export default {
  name: "Settings",
  components: { WelcomeMessage },
  setup() {
    const Store = useStore();
    let Role = computed(() => Store.getters.role);
    let user = computed(() => Store.getters.userName);
    let WelcomeMessageVariable = ref(`Welcome ${user.value}`);
    let tab = ref("notifications");
    let splitterModel = ref(18);
    let Notifications = ref(false);
    let NotificationLabel = ref("Disable");

    watch(Notifications, () => {
      Notifications.value
        ? (NotificationLabel.value = "Enable")
        : (NotificationLabel.value = "Disable");
    });
    return {
      //variables
      Role,
      tab,
      splitterModel,
      user,
      WelcomeMessageVariable,
      Notifications,
      NotificationLabel,
    };
  },
};
</script>

<style scoped></style>
