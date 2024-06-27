<template>
  <v-container>
    <v-row>
      <!-- Left Column -->
      <v-col cols="12" md="6">
        <h2 class="text-center">Aquakart Offline Menu</h2>
        <v-row>
          <v-col cols="12" sm="6" v-for="item in offlineMenu" :key="item.name">
            <v-card
              append-icon="mdi-open-in-new"
              class="mx-auto my-3"
              :href="item.path"
              max-width="250"
              :prepend-icon="item.icon"
              rel="noopener"
              subtitle="Check out the official repository"
              :title="item.name"
            ></v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- Right Column -->
      <v-col cols="12" md="6">
        <h2 class="text-center">Aquakart Online Menu</h2>

        <v-row>
          <v-col cols="12" sm="6" v-for="item in onlineMenu" :key="item.name">
            <v-card
              append-icon="mdi-open-in-new"
              class="mx-auto my-3"
              :href="item.path"
              max-width="250"
              :prepend-icon="item.icon"
              rel="noopener"
              subtitle="Check out the official repository"
              :title="item.name"
            ></v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
export default {
  name: "HomeView",
  setup() {
    const offlineMenu = ref([
      {
        name: "Invoices",
        path: "/invoices",
        icon: "mdi-file-document-outline",
      },
      { name: "Send Message", path: "/send-message", icon: "mdi-send" },
      { name: "Payment-Links", path: "payment-link", icon: "f117" },
    ]);
    const onlineMenu = ref([
      {
        name: "Categories",
        path: "/category",
        icon: "mdi-file-document-outline",
      },
      {
        name: "Sub-Categories",
        path: "/sub-category",
        icon: "mdi-file-document-outline",
      },
      {
        name: "Products",
        path: "/product",
        icon: "mdi-file-document-outline",
      },
    ]);
    return {
      offlineMenu,
      onlineMenu,
    };
  },
};
</script>

<style scoped>
/* Add any styles specific to this component here */
.my-3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
