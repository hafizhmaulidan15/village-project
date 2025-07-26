<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ToastNotification from '@/components/ToastNotification.vue';
</script>

<template>
  <header class="app-header">
    <div class="container">
      <nav class="main-nav">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/desa" class="nav-link">Desa</RouterLink>
        <RouterLink to="/contact" class="nav-link">Kontak</RouterLink>
      </nav>
    </div>
  </header>

  <main class="app-main-content">
    <RouterView />
  </main>

  <ToastNotification />
</template>

<style lang="less">
@import '@/assets/variables.less';

/* Gaya Global untuk body/html, agar komponen punya ruang */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  width: 100%; /* <-- TAMBAHKAN INI */
  overflow-x: hidden; /* <-- PENTING: Mencegah scrollbar horizontal jika ada overflow */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%; /* <-- TAMBAHKAN INI */
}

.app-header {
  background-color: @secondary-color;
  padding: @spacing-medium 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 500;
  width: 100%; /* <-- PASTIKAN INI ADA */
}

/* HAPUS ATAU UBAH INI: */
/* .app-header .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 @spacing-medium;
} */
/* Jika Anda tetap ingin padding samping pada nav link, tambahkan langsung ke main-nav atau nav-link */

.main-nav {
  display: flex;
  justify-content: center;
  gap: @spacing-large;
  padding: 0 @spacing-medium; /* <-- Tambahkan padding samping di sini jika ingin */
  width: 100%; /* <-- PASTIKAN INI ADA */
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  padding: @spacing-small @spacing-small * 1.5;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: @primary-color;
  }

  &.router-link-exact-active {
    background-color: @primary-color;
    color: white;
  }
}

.app-main-content {
  flex-grow: 1;
  padding-top: @spacing-large;
  padding-bottom: @spacing-large;
  width: 100%; /* <-- PENTING: Pastikan konten utama juga mengisi lebar */
}

/* Optional: Jika ada elemen di halaman lain yang memiliki max-width dan ingin full-width juga */
/* Anda perlu memeriksa setiap komponen halaman (HomeView, DesaView, dll.) */
/* Jika ada div pembungkus utama dengan max-width, Anda bisa menghapusnya atau mengubahnya */
/* Contoh di HomeView.vue:
.home-page {
  // max-width: 900px; // HAPUS BARIS INI JIKA ADA
  margin: 0 auto; // HAPUS JUGA INI JIKA ADA
}
*/
</style>