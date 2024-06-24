<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
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
            <v-card
              prepend-icon="mdi-account"
              text="Login to access the power of admin"
              title="Login"
            >
            <v-card-text>
              <v-text-field
                label="Email"
                required
                v-model="userDataCreds.email"
                variant="outlined"
                density="compact"
              />
              <v-text-field
                label="password"
                required
                v-model="userDataCreds.password"
                type="password"
                variant="outlined"
                density="compact"
              />
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
import { ref, computed, watch , onBeforeMount} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import userServiceOperations from '@/services/user';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const userDataCreds = ref({
      email:"",
      password:""
    })
    const handleSubmit = () =>{
     console.log("user", userDataCreds.value)
     userServiceOperations.UserLogin(userDataCreds.value).then((res)=>{
      console.log("res", res.data)
      store.commit("setUserData",res.data)
      store.commit("setUserStatus",true)
      dialog.value=false
      localStorage.setItem("user",JSON.stringify(res.data))
     })
    }

    const offlineMenu = ref([
      { name: "Offline-Menu", path: "/invoices" },
      { name: "Online-Menu", path: "/send-message" }
    ]);
    const drawer = ref(true);
    const rail = ref(true);
    const dialog = ref(false);

    const pageTitle = computed(() => {
      if (route.path === '/') {
        return 'Dashboard';
      }
      switch (route.name) {
        case 'about':
          return 'About';
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

    const userStatus = computed(() => store.state.userStatus);

    // Watch for changes in userStatus
    watch(userStatus, (newStatus) => {
      if (!newStatus) {
        dialog.value = true;
      }
    }, { immediate: true });

  onBeforeMount(()=>{
      const user = localStorage.getItem("user")
      if(user){
        store.commit("setUserData",user)
      }
    })

    return {
      offlineMenu,
      drawer,
      dialog,
      rail,
      pageTitle,
      userStatus,
      userDataCreds,
      //functions
      handleSubmit
    };
  }
}
</script>

<style scoped>
/* Add any styles specific to this component here */
</style>