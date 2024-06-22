<template>
  <q-layout view="lHh Lpr fff" class="login-layout">
    <q-page-container>
      <div class="csf_signin">
        <c-card css="q-pa-lg">
          <template #header>
            <div class="col text-h5 q-mb-lg text-center">
              <div class="text-center">
              <img src="@/assets/CSLOGO.jpg" class="cs-logo" />
              </div>
                <div class="q-mt-xs">Sign in to your account</div>
            </div>
          </template>
          <form @submit.prevent="handleSubmit">
            <c-input
              label="Username"
              v-model="userData.cusUserTxt"
              :rules="[(val) => !!val || 'Username is required']"
            />
            <c-input
              label="Password"
              type="password"
              v-model="userData.cusPasswordTxt"
              :rules="[(val) => !!val || 'Password is required']"
            />

            <c-btn label="Sign In" css="full-width" type="submit" />
          </form>
        </c-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import userOperations from "@/Services/UserService";
import NotificationHelper from "@/helpers/notificationHelpers/notificationHelper";
import useSocketServices from "@/Services/SocketServices/SocketApi";

export default {
  name: "Signin",
  setup() {
    //varibales
    const { userLogin } = userOperations();
    const Router = useRouter();
    const Store = useStore();
    const { createErrorNotification, createSuccessNotification } =
      NotificationHelper;
    const { userSocketRegister } = useSocketServices();
    let Submit = ref("false");
    let userData = ref({
      cusUserTxt: "",
      cusPasswordTxt: "",
    });
    let userStatus = computed(() => Store.state.userStatus);
    let user = computed(() => Store.state.user);
    let token = computed(() => Store.state.token);
    //functions
    //handling this block when backend works.
    const handleSubmit = async () => {
      Router.push("/dashboard")
    };

    const reRoute = onBeforeMount(() => {
      if (userStatus.value === true && token.value) {
        Router.push("/dashboard");
      } else if (userStatus.value === null) {
        // Router.push("/");
      }
    });
    const RouterChange = () => {
      Router.push("/dashboard");
    };
    return {
      //variables
      Router,
      userData,
      Submit,
      //userstatus variables
      userStatus,
      user,
      token,
      //functions
      handleSubmit,
      RouterChange,
      reRoute,
    };
  },
};
</script>
