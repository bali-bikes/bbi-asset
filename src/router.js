// src/router.js
import { createRouter, createWebHashHistory } from 'vue-router'
import DeliveryEstimasi from './pages/DeliveryEstimator.vue'

const routes = [
  {
    path: '/deliveryestimasi',
    name: 'DeliveryEstimasi',
    component: DeliveryEstimasi
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
