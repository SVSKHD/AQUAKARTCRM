<template>
  <v-container>
    <v-row>
      <!-- Left Column -->
      <v-col cols="12" md="6">
        <div v-for="item in offlineMenu" :key="item.name">
          <v-card
            append-icon="mdi-open-in-new"
            class="mx-auto my-3"
            :href="item.path"
            max-width="344"
            :prepend-icon="item.icon"
            rel="noopener"
            subtitle="Check out the official repository"
            target="_blank"
            :title="item.name"
          ></v-card>
        </div>
      </v-col>
      <!-- Right Column -->
      <v-col cols="12" md="6">
        <!-- Other content for the right column -->
        <div>
          <h2>Right Column Content</h2>
          <p>Add any other content you want here.</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
export default {
  name: 'HomeView',
  setup() {
    const offlineMenu = ref([
      { name: "Invoices", path: "/invoices" , icon:"mdi-file-document-outline"},
      { name: "Send Message", path: "/send-message", icon:"mdi-send" }
    ]);
    return {
      offlineMenu
    };
  }
};
</script>

<style scoped>
/* Add any styles specific to this component here */
.my-3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>