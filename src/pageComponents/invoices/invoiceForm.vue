<template>
    <v-form ref="form" v-model="valid">
      <v-container>
        <!-- Customer Details -->
         <v-header>{{ customerDetails }}</v-header>
        <v-subheader>Customer Details</v-subheader>
        <v-row>
          <v-col cols="12" sm="6" v-for="(value, key) in customerDetails" :key="'customer-' + key">
            <v-text-field
              :label="friendlyLabel(key)"
              v-model="customerDetails[key]"
              :rules="fieldRules[key]"
              value="value"
              outlined
              dense
            />
          </v-col>
        </v-row>
  
        <!-- GST Details -->
        <v-subheader>GST Details</v-subheader>
        <v-row>
          <v-col cols="12" sm="6" v-for="(value, key) in gstDetails" :key="'gst-' + key">
            <v-text-field
              :label="friendlyLabel(key)"
              v-model="gstDetails[key]"
              :rules="fieldRules[key]"
              outlined
              dense
            />
          </v-col>
        </v-row>
  
        <!-- Transport Details -->
        <v-subheader>Transport Details</v-subheader>
        <v-row>
          <v-col cols="12" sm="6" v-for="(value, key) in transport" :key="'transport-' + key">
            <v-text-field
              :label="friendlyLabel(key)"
              v-model="transport[key]"
              :rules="fieldRules[key]"
              outlined
              dense
            />
          </v-col>
        </v-row>
  
        <!-- Product Details -->
        <v-subheader>Product Details</v-subheader>
        <v-row v-for="(product, index) in products" :key="'product-' + index">
          <v-col cols="12" sm="3" v-for="(value, key) in product" :key="'product-' + key + '-' + index">
            <v-text-field
              :label="friendlyLabel(key)"
              v-model="products[index][key]"
              :rules="fieldRules[key]"
              va
              outlined
              dense
            />
          </v-col>
        </v-row>
  
        <!-- Invoice Settings -->
        <v-switch v-model="gst" label="GST Applicable" />
        <v-switch v-model="po" label="Purchase Order" />
        <v-switch v-model="quotation" label="Quotation" />
        <v-switch v-model="aquakartInvoice" label="Aquakart Invoice" />
        <v-switch v-model="aquakartOnlineInvoice" label="Aquakart Online Invoice" />
  
        <!-- Payment Details -->
        <v-text-field
          label="Payment Type"
          v-model="paymentType"
          :rules="fieldRules['paymentType']"
          outlined
          dense
        />
        <v-text-field
          label="Paid Status"
          v-model="paidStatus"
          :rules="fieldRules['paidStatus']"
          outlined
          dense
        />
  
        <v-btn :disabled="!valid" color="primary" @click="submitForm">Submit</v-btn>
      </v-container>
    </v-form>
  </template>
  
  <script>
  import { reactive, toRefs, ref, watch, onMounted } from 'vue';
  
  export default {
    props: {
      initialData: {
        type: Object,
        required: false,
        default: () => ({
          customerDetails: { name: "", phone: "", email: "", address: "" },
          gstDetails: { gstName: "", gstNo: "", gstPhone: "", gstEmail: "", gstAddress: "" },
          transport: { deliveredBy: "", deliveryDate: "" },
          products: [{ productName: "", productQuantity: 1, productPrice: 0, productSerialNo: "" }],
          gst: false,
          po: false,
          aquakartInvoice: false,
          aquakartOnlineInvoice: false,
          quotation: false,
          paymentType: "",
          paidStatus: "",
        }),
      },
    },
    setup(props, { emit }) {
      const form = ref(null);
      const valid = ref(false);
      const formData = reactive({ ...props.initialData });
  
      const fieldRules = reactive({
        email: [v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
        phone: [v => !!v || 'Phone number is required', v => v.length >= 10 || 'Phone number must be at least 10 digits long'],
        name: [v => !!v || 'Name is required'],
        address: [v => !!v || 'Address is required'],
        productName: [v => !!v || 'Product name is required'],
        productQuantity: [v => !!v || 'Quantity is required'],
        productPrice: [v => !!v || 'Price is required'],
        paymentType: [],
        paidStatus: [],
      });
  
      const submitForm = () => {
        if (form.value.validate()) {
          emit('submit', formData);
        }
      };
  
      watch(() => props.initialData, (newVal) => {
        Object.assign(formData, newVal);
      }, { deep: true });
  
      onMounted(() => {
        console.log('Form Data on Mount:', formData);
      });
  
      return {
        ...toRefs(formData),
        form,
        valid,
        submitForm,
        fieldRules,
        friendlyLabel: key => ({
          name: "Name",
          phone: "Phone Number",
          email: "Email Address",
          address: "Address",
          gstName: "GST Name",
          gstNo: "GST Number",
          gstPhone: "GST Phone",
          gstEmail: "GST Email",
          gstAddress: "GST Address",
          deliveredBy: "Delivered By",
          deliveryDate: "Delivery Date",
          productName: "Product Name",
          productQuantity: "Quantity",
          productPrice: "Price",
          productSerialNo: "Serial Number"
        })[key]
      };
    }
  }
  </script>
  