<template>
  <div>
    <div class="q-pa-sm">
      <WelcomeMessage :username="userNamePass" :role="Role" />
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12 q-pa-sm">
        <c-card title="Top 5 Cases" subtitle="Recent Case Details">
          <TableView />
        </c-card>
      </div>
      <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12 q-pa-sm">
        <c-card title="My Pie Chart" subtitle="Recent Cases">
          <PieChart />
        </c-card>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import PieChart from "@/components/dashboard/PieChart.vue";
import LineChart from "@/components/dashboard/LineChart.vue";
import TableView from "@/components/dashboard/TableView.vue";
import WelcomeMessage from "@/components/dashboard/WelcomeMessage";
export default {
  name: "Dashboard",
  components: {
    WelcomeMessage,
    PieChart,
    LineChart,
    TableView,
  },
  setup() {
    const Store = useStore();

    let userName = computed(() => Store.getters.userName);
    let Role = computed(() => Store.getters.role);
    console.log("user", userName);
    let userNamePass = ref(`Welcome ${userName.value}`);
    let menu = ref({
      first: ["Edit", "View", "Delete Me"],
    });
    return {
      //variables
      menu,
      userName,
      userNamePass,
      Role,
    };
  },
};
</script>
