// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import DeliveryEstimasi from './pages/DeliveryEstimator.vue'

const routes = [
  {
    path: '/deliveryestimasi',
    name: 'DeliveryEstimasi',
    component: DeliveryEstimasi
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
