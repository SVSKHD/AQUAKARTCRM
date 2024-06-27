<template>
    <h1>Categories</h1>
   <v-row>
    <v-col>
<v-row>
    <div v-for="item in categories" :key="item">
        <v-col>
        <v-card
        
    class="mx-auto"
    max-width="344"
  >
    <v-img
      height="200px"
      :src="item?.photos[0]?.secure_url"
      cover
    ></v-img>

    <v-card-title>
      {{ item.title }}
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        text="Explore"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

   
  </v-card>

  </v-col>
    </div>
    </v-row>
    </v-col>
    <v-col>
        
    </v-col>
   </v-row>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import CategoryServiceOperations from "../services/categories.js"; // Corrected import

const categories = ref([]);

onBeforeMount(() => {
  CategoryServiceOperations.getAllcategories().then((res) => {
    categories.value = res.data.data;
  });
});
</script>