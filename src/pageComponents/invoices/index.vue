<template>
  <v-row no-gutters>
    <v-col cols="8">
      <v-sheet class="pa-2 ma-2">
        <v-data-table :headers="headers" :items="invoices" class="elevation-1">
          <template v-slot:[`item.editAction`]="{ item }">
            <v-btn icon @click="editInvoice(item)" color="blue">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.deleteAction`]="{ item }">
            <v-btn icon @click="deleteItem(item)" color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.sendAction`]="{ item }">
            <v-btn icon @click="sendWhatsAppMessage(item)" color="green">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.open`]="{ item }">
            <v-btn icon @click="openInvoice(item)" color="green">
              <v-icon>mdi-share</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-sheet>
    </v-col>
    <v-col cols="4">
      <v-sheet class="pa-2 ma-2">
        <div v-if="edit">
          <h1>edit Invoice</h1>

          <invoice-form :initial-invoice="editData" @submit="handleEditData" />
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { ref, onBeforeMount, computed, watch } from "vue";
import invoiceServiceOperations from "@/services/invoices.js";
import notifyServiceOperarations from "@/services/notify.js";
import invoiceForm from "./invoiceForm.vue";

import { useStore } from "vuex";

export default {
  name: "AquaInvoicesComponent",
  // components:{invoiceForm},
  components: { invoiceForm },
  setup() {
    const store = useStore();
    const invoices = ref([]);
    const edit = ref(false);
    const editData = ref({});

    const token = computed(() => store.state.userData.token);

    watch(
      editData,
      (newValue) => {
        console.log("Edit data changed", newValue);
      },
      { deep: true }
    );

    const editInvoice = (item) => {
      invoiceServiceOperations.getInvoice(token.value, item.id).then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          editData.value = res.data[0]; // Assign the first object of the array
        } else {
          console.error("No invoice data returned for ID:", item.id);
        }
      });
      edit.value = true;
    };

    const openInvoice = () => {};
    const gstValueGenerate = (price) => {
      let basePrice = Math.floor(price * 0.8474594);
      let gst = Math.floor(basePrice * 0.18);
      return gst;
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(value);
    };

    const handleInvoiceEdit = (data) => {
      console.log("Received form data:", data);
      // Process data or call API
    };

    onBeforeMount(async () => {
      const response = await invoiceServiceOperations.getAllInvoices(
        token.value
      );
      invoices.value = response.data.data.map((invoice) => ({
        id: invoice._id,
        userName: invoice.customerDetails.name,
        phone: invoice.customerDetails.phone,
        address: invoice.customerDetails.address,
        products: invoice.products
          .map(
            (product) => `${product.productName} x ${product.productQuantity}`
          )
          .join(", "),
        total: formatCurrency(
          invoice.products.reduce(
            (acc, curr) => acc + curr.productPrice * curr.productQuantity,
            0
          )
        ),
        gst: formatCurrency(
          gstValueGenerate(
            invoice.products.reduce(
              (acc, curr) => acc + curr.productPrice * curr.productQuantity,
              0
            )
          )
        ),
        actions: "",
      }));
    });

    const handleEditData = (data) => {
      console.log("invoice", data);
    };

    const InvoiceMessageGenerate = (name, id) => {
      const invoice = `https://aquakart.co.in/admin/crm/invoice/${id}`;
      const message = `Hello Dear ${name} we welcome you to Aquakart Family and here is youer live invoice link ${invoice} and we offer you more discounts at aquakart.co.in`;
      return message;
    };

    const sendWhatsAppMessage = (item) => {
      console.log(item.phone);
      notifyServiceOperarations.sendWhatsAppMessage(
        token.value,
        item.phone,
        InvoiceMessageGenerate(item.userName, item.id)
      );
    };
    const headers = [
      { title: "Customer Name", value: "userName" },
      { title: "Phone Number", value: "phone" },
      { title: "Address", value: "address" },
      { title: "Purchased Items", value: "products" },
      { title: "GST", value: "gst" },
      { title: "Total Price", value: "total" },
      { title: "Edit", value: "editAction", sortable: false },
      { title: "Delete", value: "deleteAction", sortable: false },
      { title: "Send", value: "sendAction", sortable: false },
      { title: "Open-Invoice", value: "Open", sortable: false },
    ];

    return {
      edit,
      editData,
      invoices,
      headers,
      //functions
      editInvoice,
      openInvoice,
      InvoiceMessageGenerate,
      sendWhatsAppMessage,
      handleInvoiceEdit,
      handleEditData,
    };
  },
};
</script>
