<template>
  <section class="csf">
    <router-view />
  </section>
</template>

<script>
import { onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import userOperations from "@/Services/UserService";
export default {
  setup() {
    const Router = useRouter();
    let user = JSON.parse(localStorage.getItem("CSF"));
    let chatData = JSON.parse(localStorage.getItem("chat-user"))
    const Store = useStore();
    const { userRole } = userOperations();
    const UserCheck = onBeforeMount(() => {
      if (user) {
        Store.dispatch("loginUser", user);
        let token = user.jwtToken;
        Store.dispatch("SaveUserName", user.cusUserTxt);
        // Store.dispatch("setChatId" , chatData._id)
        // Store.dispatch("setChatData" , chatData)
        userRole(token).then((data) => {
          let apiData = data.data;
          Store.dispatch("roleAssign", apiData[0].croRoleTxt);
        });
      } else if (!user) {
        // Router.push("/");
      }
    });
    return {

      UserCheck,
    };
  },
};
</script>
