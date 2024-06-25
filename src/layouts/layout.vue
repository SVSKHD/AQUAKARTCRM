<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list v-if="loggedInUser">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ loggedInUser?.user?.email }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ loggedInUser?.user?.role === 1 ? 'Admin' : 'Manager' }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card prepend-icon="mdi-account" text="Login to access the power of admin" title="Login">
              <v-card-text>
                <v-text-field label="Email" required v-model="userDataCreds.email" variant="outlined" density="compact"/>
                <v-text-field label="Password" required v-model="userDataCreds.password" type="password" variant="outlined" density="compact"/>
              </v-card-text>
              <v-btn @click="handleSubmit">Login</v-btn>
            </v-card>
          </v-dialog>
          <h1>{{ pageTitle }}</h1>
          <hr />
          <router-view />
        </v-container>
      </v-main>
      <v-footer name="footer" app></v-footer>
    </v-layout>
  </v-app>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import userServiceOperations from '@/services/user';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const loggedInUser = computed(()=>store.state.userData)
    

    const userDataCreds = ref({ email: "", password: "" });
    const handleSubmit = () => {
      console.log("user", userDataCreds.value);
      userServiceOperations.UserLogin(userDataCreds.value).then((res) => {
        console.log("res", res.data);
        store.commit("setUserData", res.data);
        store.commit("setUserStatus", true);
        dialog.value = false;
        localStorage.setItem("user", JSON.stringify(res.data));
      });
    };

    const drawer = ref(true);
    const rail = ref(true);
    const dialog = ref(false);

    const pageTitle = computed(() => {
      // Simplified version of pageTitle computation
      return route.meta.title || `Aquakart Dashboard`;
    });

    onBeforeMount(() => {
      const user = localStorage.getItem("user")
      if (user) {
        const userData = JSON.parse(user);
        store.commit("setUserData", userData);
        store.commit("setUserStatus", true);
        dialog.value = false;
      } else {
        dialog.value = true;
      }
    });

    router.beforeEach((to, from, next) => {
      document.title = pageTitle.value;
      next();
    });

    return {
      loggedInUser,
      drawer,
      dialog,
      rail,
      pageTitle,
      userDataCreds,
      handleSubmit
    };
  }
}
</script>

<style scoped>
/* Add any styles specific to this component here */
</style>
