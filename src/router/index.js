import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AquaLayout from "../layouts/layout.vue";
import notAuthorized from "@/views/notAuthorized.vue";
import invoices from "@/views/invoicesView.vue";
import paymentslinks from "@/views/paymentslinks.vue";
import CategoryView from "@/views/CategoriesView.vue";
import SubCategoryView from "@/views/SubCategoryView.vue";
import ProductView from "@/views/ProductView.vue";
import DynamicInvoiceView from "@/views/DynamicInvoiceView.vue";

const routes = [
  {
    path: "/layout",
    name: "Layout",
    component: AquaLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
      {
        path: "not-authorized",
        name: "not-authorized",
        component: notAuthorized,
      },
      {
        path: "payment-link",
        name: "payment-link",
        component: paymentslinks,
      },
      {
        path: "category",
        name: "category",
        component: CategoryView,
      },
      {
        path: "sub-category",
        name: "sub-category",
        component: SubCategoryView,
      },
      {
        path: "product",
        name: "product",
        component: ProductView,
      },
      {
        path: "/invoices",
        name: "invoices",
        component: invoices,
      },
    ],
  },
  {
    path: "/invoice/:id",
    name: "dynamicInvoice",
    component: DynamicInvoiceView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;