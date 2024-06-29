<template>
    <v-container>
      <v-card tonal>
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
        <v-divider/>
        <v-row>
        
            <v-col class="text-center" lg="6" md="6" sm="6">
                <v-card-title>Customer Name : {{ invoice.customerDetails?.name }}</v-card-title>
                <v-card-subtitle> Phone No : {{ invoice.customerDetails?.phone }} </v-card-subtitle>
                <v-card-text>Address : {{ invoice.customerDetails?.address }} </v-card-text>
            </v-col>
            <v-col class="text-center" lg="6" md="6" sm="6">
                <div>
                <v-card-title>Gst Name : {{ invoice.gstDetails?.gstName }}</v-card-title>
                <v-card-subtitle> Gst No : {{ invoice.gstDetails?.gstNo }} </v-card-subtitle>
                <v-card-subtitle> Gst Phone No : {{ invoice.gstDetails?.gstPhone }} </v-card-subtitle>
                <v-card-text>Gst Address : {{ invoice.gstDetails?.gstAddress }} </v-card-text>
                </div>
            </v-col>
           
        </v-row>
        <v-divider/>
            <div>
                <v-container>
                <v-table>
                  <thead>
                    <tr>
                      <th v-for="header in headers" :key="header.text" class="text-left">
                        {{ header.text }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in invoice.products" :key="item.id">
                      <td>{{ item.productName }}</td>
                      <td>{{ item.productQuantity }}</td>
                      <td>{{ formatCurrency(gstValueGenerate(item.productPrice)) }}</td>
                      <td class="text-right">{{ formatCurrency(item.productPrice) }}</td>
                    </tr>
                  </tbody>
                </v-table>
                </v-container>
            </div>
    <v-divider/>
    <v-card-title class="text-right text-success"> 
        <v-container>
        Total : {{ formatCurrency(total)  }}
        </v-container>
    </v-card-title>
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

const headers = [
    {text:"Product Name"},
    {text:"Product Quantity"},
    {text:"Product Gst"},
    {text:"Product Price"}
]

const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(value);
    };

    const gstValueGenerate = (price) => {
      let basePrice = Math.floor(price * 0.8474594);
      let gst = Math.floor(basePrice * 0.18);
      return gst;
    };

    const total = computed(() => {
        if (!invoice.value.products) {
            return 0; // Return 0 if products are not defined
        }
        return invoice.value.products.reduce((sum, item) => {
            let gstValue = gstValueGenerate(item.productPrice);
            return sum + item.productPrice + gstValue;
        }, 0);
    });

onBeforeMount(()=>{
invoiceServiceOperations.getInvoice(token.value, route.params.id).then((res)=>{
    invoice.value=res.data[0]
})
})
</script>