<template>
  <v-card>
    <v-layout>
      <v-app-bar collapse :elevation="24">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Application Bar</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-heart"></v-btn>

          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-navigation-drawer v-model="toggleDrawer" temporary>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" title="John Leider"></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <div class="d-flex justify-center align-center h-100">
          <router-view />
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { ref } from "vue"
export default {

  setup() {
    let toggleDrawer = ref(false)
    return {
      toggleDrawer,
    }
  },
}
</script>