<template>
  <div>
    {{ JSON.stringify(invoice) }}
    <v-text-field
      v-if="invoice.customerDetails"
      density="compact"
      v-model="invoice.customerDetails.name"
    />
    <v-btn lable="submit" @click.prevent="handleSubmit">Submit</v-btn>
  </div>
</template>

<script setup>
import { reactive, watch, defineProps, onMounted, defineEmits } from "vue";
// import AquaInput from '@/components/resuable/AquaInput.vue';

const emit = defineEmits(["submit"]);
const props = defineProps({
  initialInvoice: {
    type: Object,
    default: () => ({
      customerDetails: { name: "", phone: "", email: "", address: "" },
      gstDetails: {
        gstName: "",
        gstNo: "",
        gstPhone: null,
        gstEmail: "",
        gstAddress: "",
      },
      transport: { deliveredBy: "", deliveryDate: "" },
      products: [
        {
          productName: "",
          productQuantity: 0,
          productPrice: 0,
          productSerialNo: "",
        },
      ],
      paidStatus: "",
      aquakartOnlineUser: false,
      aquakartInvoice: false,
      paymentType: "",
    }),
  },
});

const invoice = reactive({ ...props.initialInvoice });

watch(
  () => props.initialInvoice,
  (newVal) => {
    Object.assign(invoice, JSON.parse(JSON.stringify(newVal)));
  },
  { deep: true, immediate: true }
);

const handleSubmit = () => {
  emit("submit", invoice);
};

onMounted(() => {
  console.log("Invoice on mounted:", invoice);
});
</script>
