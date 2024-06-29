<template>
  <v-container>
    <v-form ref="form">
      <!-- Title -->
      <h1>{{ formTitle }}</h1>

      <!-- Customer Details -->
      <v-text-field
        v-model="invoice.customerDetails.name"
        label="Customer Name"
        variant="outlined"
        density="compact"
        class="mb-3"
      />
      <v-text-field
        v-model="invoice.customerDetails.phone"
        label="Phone"
        variant="outlined"
        density="compact"
        class="mb-3"
        type="tel"
      />
      <v-text-field
        v-model="invoice.customerDetails.email"
        label="Email"
        variant="outlined"
        density="compact"
        class="mb-3"
        type="email"
      />
      <v-textarea
        v-model="invoice.customerDetails.address"
        label="Address"
        variant="outlined"
        density="compact"
        rows="3"
        auto-grow
        class="mb-3"
      />

      <!-- GST Toggle -->
      <v-switch v-model="showGst" label="Include GST Details" class="mb-3" />

      <!-- GST Details -->
      <template v-if="showGst">
        <v-text-field
          v-model="invoice.gstDetails.gstName"
          label="GST Name"
          variant="outlined"
          density="compact"
          class="mb-3"
        />
        <v-text-field
          v-model="invoice.gstDetails.gstNo"
          label="GST Number"
          variant="outlined"
          density="compact"
          class="mb-3"
        />
        <v-text-field
          v-model="invoice.gstDetails.gstPhone"
          label="GST Phone"
          variant="outlined"
          density="compact"
          class="mb-3"
          type="tel"
        />
        <v-text-field
          v-model="invoice.gstDetails.gstEmail"
          label="GST Email"
          variant="outlined"
          density="compact"
          class="mb-3"
          type="email"
        />
        <v-textarea
          v-model="invoice.gstDetails.gstAddress"
          label="GST Address"
          variant="outlined"
          density="compact"
          rows="3"
          auto-grow
          class="mb-3"
        />
      </template>

      <!-- Transport Details -->
      <v-select
        v-model="invoice.transport.deliveredBy"
        :items="['Ganesh', 'Rammohan Bheem', 'Achibabu']"
        label="Delivered By"
        variant="outlined"
        density="compact"
        class="mb-3"
      />

      <v-text-field
        v-model="invoice.transport.deliveryDate"
        label="Delivery Date"
        variant="outlined"
        density="compact"
        class="mb-3"
        type="date"
      ></v-text-field>

      <!-- Product List -->
      <v-row v-for="(product, index) in invoice.products" :key="index">
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="product.productName"
            :items="productNames"
            label="Product Name"
            variant="outlined"
            density="compact"
            class="mb-3"
            clearable
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model.number="product.productQuantity"
            label="Quantity"
            variant="outlined"
            density="compact"
            class="mb-3"
            type="number"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model.number="product.productPrice"
            label="Price"
            variant="outlined"
            density="compact"
            class="mb-3"
            type="number"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="product.productSerialNo"
            label="Serial No"
            variant="outlined"
            density="compact"
            class="mb-3"
          />
        </v-col>
      </v-row>
      <v-btn color="primary" class="mb-3" @click="addProduct">
        Add Product
      </v-btn>
      <br />
      <!-- Buttons -->
      <v-btn color="success" class="mr-4" @click="saveInvoice"> Save </v-btn>
      <v-btn color="error" @click="cancel"> Cancel </v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, watch, defineProps, computed } from "vue";

// Define props
const props = defineProps({
  invoiceData: {
    type: Object,
    required: true,
  },
});

// Initialize the invoice object with default values
const invoice = ref({
  customerDetails: {
    name: "",
    phone: "",
    email: "",
    address: "",
  },
  gstDetails: {
    gstName: "",
    gstNo: "",
    gstPhone: "",
    gstEmail: "",
    gstAddress: "",
  },
  transport: {
    deliveredBy: "",
    deliveryDate: "",
  },
  products: [],
});

// Initialize the showGst toggle
const showGst = ref(false);

// Sample product names for the autocomplete
const productNames = ref(["Product 1", "Product 2", "Product 3"]);

// Watch for changes in the prop and update the local ref accordingly
watch(
  () => props.invoiceData,
  (newValue) => {
    invoice.value = { ...invoice.value, ...newValue };
  }
);

// Computed property to determine the form title
const formTitle = computed(() => {
  return Object.keys(props.invoiceData).length === 0 ? "Create Invoice" : "Edit Invoice";
});

// Function to save invoice data
const saveInvoice = () => {
  console.log("Saving invoice:", invoice.value);
  // Emit an event or handle the save logic here
};

// Function to cancel the form
const cancel = () => {
  console.log("Cancelled");
  // Handle the cancellation logic here
};

// Function to add a new product
const addProduct = () => {
  invoice.value.products.push({
    productName: "",
    productQuantity: 0,
    productPrice: 0,
    productSerialNo: "",
  });
};
</script>

<style scoped></style>
