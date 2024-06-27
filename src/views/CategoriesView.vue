<template>
  <h1 class="mb-3">Categories</h1>
  <v-divider class="mb-5" />
  <v-btn
            color="#4CAF50"
            text="create category"
            @click="createItem"
            class="mb-3"
            />
  <v-row>
   
    <v-col lg="8" md="8" sm="12">
      <v-row>
        <v-col v-for="item in categories" :key="item">
            
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              :src="item.photos[0].secure_url"
              cover
            ></v-img>

            <v-card-title>
              {{ item.title }}
            </v-card-title>

            <v-card-subtitle>
              {{ item.description }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="#3F51B5"
                text="Edit"
                @click="editItem(item)"
              ></v-btn>

              <v-spacer></v-spacer>

              <v-btn color="#F44336" text="Delete" @click="deleteItem(item)" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col lg="4" md="4" sm="12">
        <div v-if="create">
        <v-btn color="#673AB7" @click="create=false">
            exit
        </v-btn>
        </div>
      <div v-if="edit">
        <v-btn color="#673AB7" text="don't edit" @click="edit = false" />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import CategoryServiceOperations from "../services/categories.js"; // Corrected import

const categories = ref([]);
const edit = ref(false);
const create = ref(false)

onBeforeMount(() => {
  CategoryServiceOperations.getAllcategories().then((res) => {
    categories.value = res.data.data;
  });
});

const loadCategories = () =>{
    CategoryServiceOperations.getAllcategories().then((res)=>{
        categories.value=res.data.data
    })
}
const createItem = () =>{
    create.value=true
}
const editItem = (item) => {
  edit.value = true;
  console.log("edit", item);
  loadCategories()
};
const deleteItem = (item) => {
  console.log("delete", item);
  loadCategories()
};
</script>
