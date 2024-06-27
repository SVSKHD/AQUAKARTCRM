<template>
<v-row>
    <h1 class="mb-5">Products</h1>
    <v-divider class="mb-5"/>
    <v-col sm="12" lg="8" md="8">
      <v-row>
        <v-col v-for="item in products" :key="item">
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
    <v-col sm="12" lg="8" md="8">

    </v-col>
</v-row>
</template>

<script setup>
import {onBeforeMount , ref} from "vue"
import ProductServiceOperations from "../../services/product.js"

const products = ref([])
onBeforeMount(()=>{
ProductServiceOperations.getAllProducts().then((res)=>{
    products.value=res.data.data
})
})

</script>