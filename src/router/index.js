import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AquaLayout from "../layouts/layout.vue"
import notAuthorized from '@/views/notAuthorized.vue'
import invoices from "@/views/invoicesView.vue"


const routes = [
  {
   path:"/layout",
   name:"Layout",
   component:AquaLayout,
   children:[
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
      path:"/not-authorized",
      name:"not-authorized",
      component:notAuthorized
    },
    {
      path:"/invoices",
      name:"Invoices",
      component:invoices
    }
   ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
