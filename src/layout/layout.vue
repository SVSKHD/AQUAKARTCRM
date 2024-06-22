<template>
  <q-layout view="lHh Lpr lFr" :class="themeColor" class="app-bg">
    <c-header @drawer="toggleDrawer" />

    <q-drawer
      v-model="drawer"
      class="dark-drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="280"
      :breakpoint="400"
    >
      <c-left-menu :miniState="miniState" @mini="clickMini" />
    </q-drawer>

    <q-page-container>
      <q-page :class="themeColor" padding>
        <router-view />
      </q-page>
    </q-page-container>
    <!-- <q-footer class="bg-white text-grey-6 text-right q-pr-md">
      Last Login 05/10/2022 23:12pm User: Kathy
    </q-footer> -->
  </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import cHeader from "./components/CHeader.vue";
import cLeftMenu from "./components/CLeftMenu.vue";
export default {
  components: {
    cHeader,
    cLeftMenu,
  },
  setup() {
    //store
    const Store = useStore();
    const $q = useQuasar();
    let miniState = computed(() => Store.state.miniState);
    let drawer = ref($q.screen.lt.sm ? false : true);

    const drawerClick = () => {
      if (miniState.value) {
        miniState.value = false;
      }
    };
    const clickMini = () => {
      miniState.value = true;
    };
    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };
    return {
      miniState,
      drawer,
      drawerClick,
      clickMini,
      toggleDrawer,
    };
  },
  created() {
    this.$ev.on("drawer.mini", () => {
      this.clickMini();
    });
    this.$ev.on("drawer", () => {
      this.toggleDrawer();
    });
  },
};
</script>
