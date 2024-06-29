<!-- <template>
  <v-btn
    color="#4CAF50"
    text="create Invoice"
    @click="createItem"
    class="mb-3"
  />
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
      <v-sheet v-if="createInvoice">
        <invoice-form :invoiceData="createData"/>
      </v-sheet>
      <v-sheet v-if="edit" class="pa-2 ma-2">
        <div>
          <invoice-form :invoiceData="editData" />
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { ref, onBeforeMount, computed, watch } from "vue";
import invoiceServiceOperations from "@/services/invoices.js";
import notifyServiceOperarations from "@/services/notify.js";
import invoiceForm from "./invoiceForm"
import { useStore } from "vuex";

export default {
  name: "AquaInvoicesComponent",
  components:{invoiceForm},
  setup() {
    const store = useStore();
    const invoices = ref([]);
    const edit = ref(false);
    let createInvoice = ref(false);
    let createData = ref({});
    const editData = ref({});

    const token = computed(() => store.state.userData.token);

    const createItem = () => {
      createInvoice.value = true
      createData.value={}
    };

    const deleteItem = (item) => {
      // Implement delete functionality here
      console.log("Delete item", item);
    };

    const openInvoice = (item) => {
      // Implement open invoice functionality here
      console.log("Open invoice", item);
    };

    watch(createInvoice, () => {
      if (createInvoice.value === true) {
        edit.value = false;
      }
    });

    watch(edit, () => {
      if (edit.value === true) {
        createInvoice.value = false;
      }
    });

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
      const message = `Hello Dear ${name} we welcome you to Aquakart Family and here is your live invoice link ${invoice} and we offer you more discounts at aquakart.co.in`;
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
      createItem,
      editInvoice,
      deleteItem,
      openInvoice,
      InvoiceMessageGenerate,
      sendWhatsAppMessage,
      handleInvoiceEdit,
      handleEditData,
    };
  },
};
</script> -->


<template>
    <h1>Invoices</h1>
    <v-divider class="mb-5"/>
    <v-btn  color="#4CAF50" text="Create Invoice" @click="createItem"/>


    <v-row>

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
            <div v-if="create">
                <v-btn color="#673AB7" @click="create = false"> clear create Invoice</v-btn>
        <invoice-form :invoiceData="createData"/>
    </div>
    <div v-if="edit">
                <v-btn color="#673AB7" @click="edit = false"> clear Edit Invoice</v-btn>
        <invoice-form :invoiceData="editData"/>
    </div>
        </v-col> 
    </v-row>


</template>

<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import invoiceServiceOperations from "@/services/invoices.js";
import notifyServiceOperarations from "@/services/notify.js";
import invoiceForm from "./invoiceForm"
import { useStore } from "vuex";

const store = useStore();
    const invoices = ref([]);
    const edit = ref(false);
    let create = ref(false);
    let createData = ref({});
    let editData = ref({});

    const token = computed(() => store.state.userData.token);

    const createItem = () => {
      create.value = true
      createData.value={}
    };

    const deleteItem = (item) => {
      // Implement delete functionality here
      console.log("Delete item", item);
    };

    const openInvoice = (item) => {
      // Implement open invoice functionality here
      console.log("Open invoice", item);
    };

    watch(create, () => {
      if (create.value === true) {
        edit.value = false;
      }
    });

    watch(edit, () => {
      if (edit.value === true) {
        create.value = false;
      }
    });

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

    // const handleInvoiceEdit = (data) => {
    //   console.log("Received form data:", data);
    //   // Process data or call API
    // };

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

    // const handleEditData = (data) => {
    //   console.log("invoice", data);
    // };

    const InvoiceMessageGenerate = (name, id) => {
      const invoice = `https://aquakart.co.in/admin/crm/invoice/${id}`;
      const message = `Hello Dear ${name} we welcome you to Aquakart Family and here is your live invoice link ${invoice} and we offer you more discounts at aquakart.co.in`;
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



</script>
