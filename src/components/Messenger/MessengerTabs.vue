<template>
  <div>
    <q-layout>
      <div class="row">
        <div class="col-lg-1 col-md-1 col-xs-12 col-sm-12">
          <q-tabs
            v-model="activeTab"
            vertical
            dense
            class="window-height bg-dark text-white"
          >
            <q-tab
              v-for="(tab, index) in tabs"
              :key="index"
              :name="tab.name"
              :label="tab.label"
              :icon="tab.icon"
            />
          </q-tabs>
        </div>
        <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
          <q-tab-panels
            v-model="activeTab"
            vertical
            dense
            class="window-height"
          >
            <q-tab-panel
              v-for="(tab, index) in tabs"
              :key="index"
              :name="tab.name"
            >
              <component :is="tab.component" />
              <div class="text-h5 text-center text-weight-bold">
                {{ tab.name }}
              </div>
              <div v-if="activeTab === 'Chats'">
                <c-input>
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </c-input>

                <div v-for="item in chats" :key="item.id" class="q-mb-sm">
                  <q-item
                    v-if="chats"
                    clickable
                    v-ripple
                    @click="filteredItems"
                  >
                    <q-item-section avatar>
                      <q-avatar>
                        <img
                          :src="`https://cdn.quasar.dev/img/${item.avatar}`"
                        />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ item.name }}</q-item-label>
                      <q-item-label caption lines="1">{{
                        item.text
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-badge rounded :color="item.color" />
                    </q-item-section>
                  </q-item>
                </div>
              </div>

              <div v-else-if="activeTab === 'Groups'">
                <c-input>
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </c-input>

                <div v-for="item in groups" :key="item.id" class="q-mb-sm">
                  <q-item v-if="chats" clickable v-ripple>
                    <q-item-section avatar>
                      <q-avatar
                        class="bg-dark text-white"
                        icon="group"
                        size="50px"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ item.name }}</q-item-label>
                      <q-item-label caption lines="1">{{
                        item.text
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>

                <c-btn
                  label="Create a Group"
                  icon="add"
                  class="q-mt-md"
                  @click="createGroup"
                />

                <q-dialog v-model="create">
                  <q-card class="bg-white text-black creategroup-external">
                    <q-card-section class="bg-primary">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="white"
                        class="float-right"
                        flat
                      />
                      <div class="text-h6 text-weight-bold text-white">
                        Create a Group
                      </div>
                    </q-card-section>
                    <q-separator />
                    <div class="text-caption q-ml-md q-mt-md">
                      A group is exclusively accessible to its members, and only
                      private group members can read or search its material.
                    </div>

                    <q-card-section>
                      <c-input
                        class="q-mt-lg text-warning text-weight-medium"
                        label="Group Name"
                        placeholder="QWTYE-SDJHJIK-SAJHBJB-00837"
                      ></c-input>

                      <c-input
                        class="text-warning text-weight-medium"
                        label="Purpose (Optional)"
                      ></c-input>

                      <c-input
                        class="text-warning text-weight-medium"
                        label="Invite Members"
                      >
                      </c-input>

                      <div class="float-right q-mt-lg q-pb-lg">
                        <q-btn
                          v-close-popup
                          no-caps
                          class="q-mr-md bg-grey-4 text-warning text-weight-bold"
                          >Cancel</q-btn
                        >
                        <q-btn
                          no-caps
                          class="bg-warning text-white text-weight-bold"
                          >Create</q-btn
                        >
                      </div>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </div>

              <div v-else>
                <c-input>
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </c-input>
                <div v-for="item in channels" :key="item.id" class="q-mb-sm">
                  <q-item v-if="chats" clickable v-ripple>
                    <q-item-section avatar>
                      <q-avatar
                        class="bg-dark text-white"
                        icon="groups"
                        size="50px"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ item.name }}</q-item-label>
                      <q-item-label caption lines="1">{{
                        item.text
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </div>

              <div></div>
            </q-tab-panel>
          </q-tab-panels>
        </div>

        <div class="col bg-grey-3">
          <messenger-tool-bar :title="applyTitle" />
        </div>
      </div>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";
import MessengerToolBar from "./MessengerToolBar.vue";

export default {
  components: { MessengerToolBar },
  name: "Tabs,Chat",
  setup() {
    const applyTitle = ref("");
    const activeTab = ref("Chats");

    let create = ref(false);
    let manage = ref(false);
    const createGroup = () => {
      create.value = true;
    };

    const tabs = [
      {
        name: "Chats",
        icon: "chats",
        label: "Chats",
        content: ["Hello", "hi", "hello"],
      },
      {
        name: "Groups",
        icon: "groups",
        label: "Groups",
        content: "Hey",
      },
      {
        name: "Channels",
        icon: "group",
        label: "Channels",
        content: "hi",
      },
    ];

    const chats = [
      {
        id: 1,
        name: "Brunhilde Panswick",
        text: "Hey, how are you?",
        avatar: "avatar2.jpg",
        color: "red",
      },
      {
        id: 2,
        name: "Winfield Stapforth",
        text: "Hello",
        avatar: "avatar4.jpg",
        color: "green",
      },
      {
        id: 3,
        name: "Joshua P",
        text: "Hello,how are you?",
        avatar: "avatar1.jpg",
        color: "red",
      },
      {
        id: 4,
        name: "Christina Harper",
        text: "2 new messages",
        avatar: "avatar3.jpg",
        color: "green",
      },
    ];

    const groups = [
      {
        id: 3,
        name: "Admins",
        text: "admins group",
      },
      {
        id: 4,
        name: "Security Admins",
        text: "Security admins group",
      },
      {
        id: 5,
        name: "Front end workers",
        text: "Front end workers group",
      },
      {
        id: 5,
        name: "Volunteers",
        text: "Volunteers group",
      },
      {
        id: 5,
        name: "Managers",
        text: "Managers group",
      },
    ];

    const channels = [
      {
        id: 1,
        name: "Alamance County",
      },
      {
        id: 2,
        name: "Allaghany County",
      },
      {
        id: 3,
        name: "Alexander County ",
      },
      {
        id: 2,
        name: "Anson County",
      },
      {
        id: 2,
        name: "Ashe County",
      },
      {
        id: 2,
        name: "Avery County",
      },
      {
        id: 2,
        name: "Beaufort County",
      },
    ];
    // const filteredItems = chats.filter(item =>
    //  { return chats.title.toLowerCase().includes(this.title.toLowerCase()) })

    return {
      applyTitle,
      createGroup,
      manage,
      activeTab,
      tabs,
      chats,
      groups,
      channels,
      // chat
    };
  },
};
</script>
