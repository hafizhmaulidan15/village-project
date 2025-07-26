<script setup>
import { useNotificationStore } from '@/stores/notification.js'; // Impor store notifikasi
import { computed } from 'vue';
// Tidak perlu mengimpor FontAwesomeIcon secara eksplisit di sini
// karena sudah didaftarkan secara global di main.js.

const notificationStore = useNotificationStore();

// Dapatkan pesan dan tipe notifikasi secara reaktif dari store
const message = computed(() => notificationStore.message);
const type = computed(() => notificationStore.type);

// Fungsi untuk menutup notifikasi secara manual (opsional)
const closeNotification = () => {
  notificationStore.clearNotification();
};

// Computed property untuk mendapatkan ikon yang sesuai berdasarkan tipe notifikasi
const iconName = computed(() => {
  switch (type.value) {
    case 'success': return 'check-circle';       // Ikon centang
    case 'error': return 'circle-xmark';         // Ikon silang (X)
    case 'warning': return 'triangle-exclamation'; // Ikon tanda seru segitiga
    case 'info': return 'circle-info';           // Ikon informasi (i)
    default: return 'circle-info';               // Default jika tipe tidak dikenal
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="message" :class="['toast-notification', type]">
      <font-awesome-icon :icon="iconName" class="notification-icon" />
      <p>{{ message }}</p>
      <button @click="closeNotification" class="close-button">&times;</button>
    </div>
  </Transition>
</template>

<style lang="less" scoped>
@import '@/assets/variables.less'; // Pastikan path ini benar

.toast-notification {
  position: fixed; // Posisi tetap di layar
  bottom: @spacing-medium; // 20px dari bawah (menggunakan variabel Less)
  right: @spacing-medium; // 20px dari kanan (menggunakan variabel Less)
  padding: @spacing-small @spacing-medium; // Menggunakan variabel Less
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: @spacing-small; // Menggunakan variabel Less
  z-index: 1000; // Pastikan muncul di atas elemen lain

  // Warna latar belakang berdasarkan tipe notifikasi
  &.success {
    background-color: #28a745; // Hijau
  }
  &.error {
    background-color: #dc3545; // Merah
  }
  &.warning {
    background-color: #ffc107; // Kuning
    color: @text-color-dark; // Teks gelap untuk kontras pada latar kuning
  }
  &.info {
    background-color: #17a2b8; // Biru
  }

  p {
    margin: 0;
    font-size: 1em;
  }

  .close-button {
    background: none;
    border: none;
    color: white; // Warna putih untuk tombol tutup
    font-size: 1.5em;
    cursor: pointer;
    padding: 0 5px;

    &:hover {
      color: rgba(255, 255, 255, 0.8); // Sedikit transparan saat hover
    }
  }
  &.warning .close-button {
    color: @text-color-dark; // Warna gelap untuk tombol tutup di notif warning
    &:hover {
      color: rgba(@text-color-dark, 0.8);
    }
  }

  .notification-icon { // Gaya untuk ikon di dalam notifikasi
    margin-right: @spacing-small / 2; // Memberi jarak antara ikon dan teks
    font-size: 1.2em; // Ukuran ikon sedikit lebih besar
  }
}

/* Transisi Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px); // Notifikasi muncul dari sedikit di bawah
}
</style>