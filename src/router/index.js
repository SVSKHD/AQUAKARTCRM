import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AquaLayout from "../layouts/layout.vue";
import notAuthorized from "@/views/notAuthorized.vue";
import invoices from "@/views/invoicesView.vue";
import paymentslinks from "@/views/paymentslinks.vue";
import CategoryView from "@/views/CategoriesView.vue";
import SubCategoryView from "@/views/SubCategoryView.vue";
import ProductView from "@/views/ProductView.vue"

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
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
      {
        path: "/not-authorized",
        name: "not-authorized",
        component: notAuthorized,
      },
      {
        path: "/invoices",
        name: "Invoices",
        component: invoices,
      },
      {
        path: "/payment-link",
        name: "payment-link",
        component: paymentslinks,
      },
      {
        path: "/category",
        name: "category",
        component: CategoryView,
      },
      {
        path: "/sub-category",
        name: "sub-category",
        component: SubCategoryView,
      },
      {
        path: "/product",
        name: "product",
        component: ProductView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
