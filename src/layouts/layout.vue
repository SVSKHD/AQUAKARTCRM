<template>
  <v-app>
    <!-- AppBar should be directly under v-app for better layout control -->
    <v-app-bar
      color="indigo-darken-4"
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  color="#FFEBEE" v-if="loggedInUser.user" icon @click="AquaLogout">
        Logout
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent app>
      <v-list v-if="loggedInUser.user">
        <v-list-item>
          <v-list-item-avatar color="red">
            <span class="text-h5">{{ loggedInUser?.user.initials || 'A' }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ loggedInUser?.user.email }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ loggedInUser?.user.role === 1 ? 'Admin' : 'Manager' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Account</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-group-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main>
      <v-container>
        <v-dialog v-model="dialog" max-width="400" persistent>
          <v-card>
            <v-card-title>
              <v-icon left>mdi-account</v-icon>
              Login to access the power of admin
            </v-card-title>
            <v-card-text>
              <v-text-field label="Email" required v-model="userDataCreds.email" outlined dense/>
              <v-text-field label="Password" required v-model="userDataCreds.password" type="password" outlined dense/>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="handleSubmit" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer name="footer" padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Aquakart</strong>
      </v-col>
    </v-footer>
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

    // In your setup() function
const loggedInUser = computed(() => {
    // Make sure userData is an object before trying to access its properties
    return store.state.userData || { user: {} };
});

    

    const userDataCreds = ref({ email: "", password: "" });
    const handleSubmit = () => {
      userServiceOperations.UserLogin(userDataCreds.value).then((res) => {
        console.log("res", res.data);
        store.commit("setUserData", res.data);
        store.commit("setUserStatus", true);
        dialog.value = false;
        localStorage.setItem("user", JSON.stringify(res.data));
      });
    };
    const AquaLogout = () =>{
      localStorage.removeItem("user")
      store.commit("setUserData", {});
      store.commit("setUserStatus", false);
      dialog.value = true
    }

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
      handleSubmit,
      AquaLogout
    };
  }
}
</script>

<style scoped>
/* Add any styles specific to this component here */
</style>
