<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <!-- <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item> -->

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <h1>{{ pageTitle }}</h1>
          <hr/>
          <router-view/>
        </v-container>
      </v-main>
      <v-footer
        name="footer"
        app
      >
        
      </v-footer>
    </v-layout>
  </v-app>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const offlineMenu = ref([
      { name: "Offline-Menu", path: "/invoices" },
      { name: "Online-Menu", path: "/send-message" }
    ]);
    const drawer = ref(true);
    const rail = ref(true);

    const pageTitle = computed(() => {
      if (route.path === '/') {
        return 'Dashboard';
      }
      switch (route.name) {
        case 'about':
          return 'About'
        case 'home':
          return 'Home';
        case 'account':
          return 'My Account';
        case 'users':
          return 'Users';
        case 'invoices':
          return 'Invoices';
        case 'send-message':
          return 'Send Message';
        default:
          return 'Dashboard';
      }
    });

    router.beforeEach((to, from, next) => {
      document.title = pageTitle.value;
      next();
    });

    return {
      offlineMenu,
      drawer,
      rail,
      pageTitle
    };
  }
}
</script>

<style scoped>
/* Add any styles specific to this component here */
</style>