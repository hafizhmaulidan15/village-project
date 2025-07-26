import './assets/main.css' // Ini CSS bawaan Vite

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// --- IMPOR FONT AWESOME ---
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Impor ikon yang akan digunakan (tambahkan ikon baru ini)
import { faTrashCan, faCheckCircle, faCircleXmark, faCircleInfo, faTriangleExclamation,
         faLeaf, faHandshake, faLightbulb,
         faArrowRight, faUsers, faMapMarkedAlt, faExpandArrowsAlt, faBookOpen // <-- TAMBAHKAN IKON INI
       } from '@fortawesome/free-solid-svg-icons'

// Tambahkan ikon ke library Font Awesome
library.add(faTrashCan, faCheckCircle, faCircleXmark, faCircleInfo, faTriangleExclamation,
            faLeaf, faHandshake, faLightbulb,
            faArrowRight, faUsers, faMapMarkedAlt, faExpandArrowsAlt, faBookOpen // <-- TAMBAHKAN IKON INI KE LIBRARY
           )
// --- AKHIR IMPOR FONT AWESOME ---


const app = createApp(App)
const pinia = createPinia() // Inisialisasi Pinia

app.use(pinia) // Gunakan Pinia
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon) // <-- DAFTARKAN KOMPONEN GLOBAL

app.mount('#app')