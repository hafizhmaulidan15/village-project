import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DesaView from '../views/DesaView.vue'
import DesaDetailView from '../views/DesaDetailView.vue' // <-- TAMBAHKAN BARIS INI
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/desa',
      name: 'desa',
      component: DesaView
    },
    {
      path: '/desa/:id', // <-- TAMBAHKAN OBJEK RUTE INI
      name: 'desa-detail',
      component: DesaDetailView,
      props: true // Ini opsional, tapi berguna jika ingin mengakses parameter sebagai props
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ]
})

export default router