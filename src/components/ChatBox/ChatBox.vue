<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" container style="height: 600px" class="">
      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="200"
        :breakpoint="700"
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        class="bg-grey-2 text-black"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="search" />
              </q-item-section>

              <q-item-section> Search </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
                </q-avatar>
              </q-item-section>

              <q-item-section> Shivani </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
                </q-avatar>
              </q-item-section>

              <q-item-section> Jane </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="person_4" />
              </q-item-section>

              <q-item-section> Deepak </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="person_4" />
              </q-item-section>

              <q-item-section> Pranav </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="person_4" />
              </q-item-section>

              <q-item-section> Hitesh </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <message-layout />
    </q-layout>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import chatTabs from "./chatTabs.vue";
import chatArea from "./chatArea.vue";
import { io } from "socket.io-client";
export default {
  components: { chatTabs, chatArea },
  setup() {
    let tab = ref("mails");
    let socket = io(process.env.VUE_APP_BASE_SOCKET_DIRECT);
    const chatManipulations = onMounted(() => {
      socket.emit("send-new", { message: "Hi from arjun" });
      socket.on("new-user", (data) => {
        console.log(data);
      });
    });
    return {
      tab,
      chatManipulations,
    };
  },
};
</script>
