import { computed } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import routes from "./routes";

const Store = useStore();
const Router = useRouter();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//router guards
// router.beforeEach((to, from , next )=>{
// if(userStatus===true){
//   console.log("user" , userStatus)
// }else if(userStatus===false){
//   Router.push("/")
// }
// })

export default router;
