<template>
     <h1 class="mb-5">Products</h1>
    <v-divider class="mb-5" />
  <v-btn
            color="#4CAF50"
            text="create Product"
            @click="createItem"
            class="mb-3"
            />
<v-row>
   
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
    <v-col sm="12" lg="4" md="4">
<div v-if="edit">
    <v-btn
    color="#673AB7"
    text="clear edit"
    @click="editItemClear"
    />
<h1>edit from</h1>
</div>
<div v-if="create">
    <v-btn
    color="#673AB7"
    text="clear create"
    @click="createItemClear"
    />
<h1>create from</h1>
</div>
    </v-col>
</v-row>
</template>

<script setup>
import {onBeforeMount , ref, watch} from "vue"
import ProductServiceOperations from "../../services/product.js"

const products = ref([])
const edit = ref(false)
const create = ref(false)
onBeforeMount(()=>{
ProductServiceOperations.getAllProducts().then((res)=>{
    products.value=res.data.data
})
})

const createItem = () =>{
    create.value=true
}

const editItem = (item) =>{
    edit.value = true
console.log("item", item)
}
const deleteItem = (item) =>{
    console.log("delte", item)
}

const editItemClear = () =>{
    edit.value=false
    create.value=false
}

const createItemClear = () =>{
    edit.value=false
    create.value=false
}

watch(create,()=>{
    if(create.value===true){
    edit.value=false
    }
})

watch(edit,()=>{
    if(edit.value===true){
        create.value=false
    }
})


</script>