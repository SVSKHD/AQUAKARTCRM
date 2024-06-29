<template>
    <v-container>
      <v-card tonal>
        <v-card-text>
        <v-row>
          <v-col>
          <v-container>
           <v-card-title>
            Aquakart

            </v-card-title>
            <v-card-subtitle>
                36A
            </v-card-subtitle>  
            </v-container>
        </v-col>
          <v-col>
            <!-- Add content or bindings here -->
          </v-col>
        </v-row>
    </v-card-text>  
    </v-card>

    </v-container>
  </template>

<script setup>
import {onBeforeMount, computed, ref} from "vue"
import { useRoute } from "vue-router"
import {useStore} from "vuex"
import invoiceServiceOperations from "@/services/invoices.js"

const store = useStore()
const route = useRoute()
const token = computed(() => store.state.userData.token);
const invoice = ref({})

onBeforeMount(()=>{
invoiceServiceOperations.getInvoice(token.value, route.params.id).then((res)=>{
    invoice.value=res.data[0]
})
})
</script>