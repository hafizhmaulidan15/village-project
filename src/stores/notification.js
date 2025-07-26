import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    message: null, // Pesan notifikasi
    type: 'info',  // Tipe notifikasi: 'success', 'error', 'warning', 'info'
    timeoutId: null, // Untuk menyimpan ID timeout agar bisa dibersihkan
  }),
  actions: {
    // Aksi untuk menampilkan notifikasi
    showNotification(message, type = 'info', duration = 3000) {
      // Bersihkan timeout sebelumnya jika ada notifikasi aktif
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      this.message = message;
      this.type = type;

      // Otomatis sembunyikan notifikasi setelah durasi tertentu
      this.timeoutId = setTimeout(() => {
        this.clearNotification();
      }, duration);
    },
    // Aksi untuk menyembunyikan notifikasi
    clearNotification() {
      this.message = null;
      this.type = 'info';
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    },
  },
});