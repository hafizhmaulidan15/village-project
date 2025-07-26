<script setup>
import DesaCard from '@/components/DesaCard.vue';
import DesaForm from '@/components/DesaForm.vue';
import { useDesaStore } from '@/stores/desa.js';
import { useNotificationStore } from '@/stores/notification.js';
import { onMounted, computed, ref, watch } from 'vue'; // <-- IMPOR 'watch' juga

const desaStore = useDesaStore();
const notificationStore = useNotificationStore();

const searchQuery = ref('');

// --- Variabel & Computed Properties untuk Paginasi ---
const itemsPerPage = ref(3); // Jumlah desa per halaman
const currentPage = ref(1);  // Halaman aktif saat ini

const desas = computed(() => desaStore.getAllDesas);
const isLoading = computed(() => desaStore.isLoading);
const error = computed(() => desaStore.error);

const filteredDesas = computed(() => {
  if (!searchQuery.value) {
    return desas.value;
  }
  const query = searchQuery.value.toLowerCase();
  return desas.value.filter(desa =>
    desa.name.toLowerCase().includes(query) ||
    desa.shortDesc.toLowerCase().includes(query)
  );
});

// Computed property untuk mendapatkan desa yang ditampilkan di halaman saat ini
const paginatedDesas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredDesas.value.slice(start, end);
});

// Computed property untuk menghitung total halaman
const totalPages = computed(() => {
  return Math.ceil(filteredDesas.value.length / itemsPerPage.value);
});

// Watcher untuk mereset halaman ke 1 jika filter pencarian berubah
watch(searchQuery, () => {
  currentPage.value = 1;
});

onMounted(() => {
  desaStore.fetchDesas();
});

const handleDeleteDesa = (desaId) => {
  if (confirm('Apakah Anda yakin ingin menghapus desa ini?')) {
    desaStore.deleteDesa(desaId);
    notificationStore.showNotification('Desa berhasil dihapus.', 'success');
    // Setelah menghapus, periksa apakah halaman saat ini masih valid
    // Jika tidak ada desa lagi di halaman itu, kembali ke halaman sebelumnya
    if (paginatedDesas.value.length === 0 && currentPage.value > 1) {
      currentPage.value--;
    }
  }
};

// Fungsi untuk mengubah halaman
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="desa-list-page">
    <h1 class="page-title">Jelajahi Desa-Desa Kami</h1>
    <p class="intro-text">
      Temukan keunikan dan pesona dari setiap desa yang tergabung dalam kawasan Desa Impian.
      Setiap desa memiliki cerita dan keindahan tersendiri yang menunggu untuk dijelajahi.
    </p>

    <DesaForm />

    <hr class="divider">

    <div class="search-section">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cari desa berdasarkan nama atau deskripsi..."
        class="search-input"
      >
    </div>

    <div v-if="isLoading" class="loading-message">Memuat data desa...</div>
    <div v-else-if="error" class="error-message">Terjadi kesalahan: {{ error }}</div>
    <div v-else-if="filteredDesas.length === 0" class="no-data-message">
      Tidak ada desa yang cocok dengan pencarian Anda.
    </div>
    <div v-else>
      <div class="desa-cards-container">
        <DesaCard
          v-for="desa in paginatedDesas"
          :key="desa.id"
          :desa-name="desa.name"
          :description="desa.shortDesc"
          :image-url="desa.imageUrl"
          :link-to="`/desa/${desa.id}`"
          :desa-id="desa.id"
          @delete-desa="handleDeleteDesa"
        />
      </div>

      <div v-if="totalPages > 1" class="pagination-controls">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="page-button">
          Sebelumnya
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="['page-button', { active: page === currentPage }]"
        >
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="page-button">
          Berikutnya
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/variables.less';

.desa-list-page {
  padding: @spacing-large;
  text-align: center;
  background-color: @background-alternate;

  .page-title {
    color: @text-color-dark;
    margin-bottom: @spacing-medium;
    font-size: @font-size-xxl;
  }

  .intro-text {
    color: @text-color-light;
    font-size: @font-size-large;
    line-height: 1.5;
    max-width: 800px;
    margin: 0 auto 50px;
  }

  .divider {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
    margin: @spacing-large * 2 auto;
    width: 80%;
  }

  .search-section {
    margin-bottom: @spacing-large;
    .search-input {
      width: 100%;
      max-width: 500px;
      padding: @spacing-small;
      border: 1px solid @border-color;
      border-radius: 5px;
      font-size: @font-size-base;
      box-sizing: border-box;
      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 0 0 2px rgba(@primary-color, 0.2);
      }
    }
  }

  .loading-message, .error-message, .no-data-message {
    font-size: @font-size-large;
    color: @text-color-dark;
    margin-top: @spacing-large;
  }

  .error-message {
    color: #e74c3c;
  }

  .desa-cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: @spacing-medium;
    margin-top: @spacing-medium;
    min-height: 350px; // Minimal tinggi agar tidak "loncat" saat paginasi/loading
  }

  .pagination-controls { // <-- STYLE UNTUK PAGINASI
    margin-top: @spacing-large;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .page-button {
      background-color: @primary-color;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.95em;
      transition: background-color 0.3s ease, transform 0.1s ease;

      &:hover:not(:disabled) {
        background-color: darken(@primary-color, 10%);
        transform: translateY(-2px);
      }

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }

      &.active {
        background-color: @secondary-color; // Warna berbeda untuk halaman aktif
        font-weight: bold;
        transform: scale(1.05); // Sedikit membesar
      }
    }
  }
}
</style>