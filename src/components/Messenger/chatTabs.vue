<template>
  <div>
    <q-splitter v-model="splitterModel" class="chat-height">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-white">
          <q-tab
            v-for="(item, index) in chatTabs"
            :label="item.name"
            :name="item.name"
            :icon="item.icon"
            :key="index"
          />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          class="bg-primary text-white"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel
            v-for="(tab, index) in chatTabs"
            :key="index"
            :name="tab.name"
          >
            <div class="text-h5">
              {{ tab.name }}
            </div>
            <q-separator color="white" />
            <br />
            <q-input
              outlined
              dense

              bg-color="white"
              color="white"
              label="Search"
            >
              <template v-slot:prepend>
                <q-icon name="eva-search-outline" />
              </template>
            </q-input>
            <slot :name="tab.name" />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let tab = ref("Chats");
    const chatTabs = [
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
    return {
      tab,
      chatTabs,
    };
  },
};
</script>
