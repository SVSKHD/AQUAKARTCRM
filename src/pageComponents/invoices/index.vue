<template>
    <v-row no-gutters>
        <v-col cols="8">
            <v-sheet class="pa-2 ma-2">
                <v-data-table
                    :headers="headers"
                    :items="invoices"
                    class="elevation-1">
                    <template v-slot:[`item.editAction`]="{ item }">
                        <v-btn icon @click="editItem(item)" color="blue">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:[`item.deleteAction`]="{ item }">
                        <v-btn icon @click="deleteItem(item)" color="red">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:[`item.sendAction`]="{ item }">
                        <v-btn icon @click="sendEmail(item)" color="green">
                            <v-icon>mdi-email</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-sheet>
        </v-col>
        <v-col cols="4">
            <v-sheet class="pa-2 ma-2">
                .v-col-auto
            </v-sheet>
        </v-col>
    </v-row>
</template>



<script>
import { ref, onBeforeMount, computed } from 'vue';
import invoiceServiceOperations from '@/services/invoices.js';
import { useStore } from 'vuex';

export default {
    name: "AquaInvoicesComponent",
    setup() {
        const store = useStore();
        const invoices = ref([]);
        const token = computed(() => store.state.userData.token);

        const gstValueGenerate = (price) => {
            let basePrice = Math.floor(price * 0.8474594);
            let gst = Math.floor(basePrice * 0.18);
            return gst;
        };

        const formatCurrency = (value) => {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
        };

        onBeforeMount(async () => {
            const response = await invoiceServiceOperations.getAllInvoices(token.value);
            invoices.value = response.data.data.map(invoice => ({
                userName: invoice.customerDetails.name,
                phone: invoice.customerDetails.phone,
                address: invoice.customerDetails.address,
                products: invoice.products.map(product => `${product.productName} x ${product.productQuantity}`).join(', '),
                total: formatCurrency(invoice.products.reduce((acc, curr) => acc + (curr.productPrice * curr.productQuantity), 0)),
                gst: formatCurrency(gstValueGenerate(invoice.products.reduce((acc, curr) => acc + (curr.productPrice * curr.productQuantity), 0))),
                actions: ''
            }));
        });

        const headers = [
    { title: 'Customer Name', value: 'userName' },
    { title: 'Phone Number', value: 'phone' },
    { title: 'Address', value: 'address' },
    { title: 'Purchased Items', value: 'products' },
    { title: 'GST', value: 'gst' },
    { title: 'Total Price', value: 'total' },
    { title: 'Edit', value: 'editAction', sortable: false },
    { title: 'Delete', value: 'deleteAction', sortable: false },
    { title: 'Send', value: 'sendAction', sortable: false }
];


        return {
            invoices,
            headers
        };
    },
}

</script>