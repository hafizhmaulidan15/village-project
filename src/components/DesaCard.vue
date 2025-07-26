<script setup>
import { defineProps, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
// Impor FontAwesomeIcon jika ingin menggunakannya di sini,
// meskipun sudah didaftarkan secara global di main.js
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // OPSIONAL, tapi praktik baik

const props = defineProps({
  desaName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Gambar+Desa'
  },
  linkTo: {
    type: String,
    default: '#'
  },
  desaId: { // Penting untuk fungsionalitas hapus dan detail
    type: Number,
    required: true
  }
});

const emit = defineEmits(['delete-desa']); // Event yang di-emit saat tombol hapus diklik

const confirmDelete = () => {
  emit('delete-desa', props.desaId);
};
</script>

<template>
  <div class="desa-card">
    <img :src="props.imageUrl" :alt="props.desaName" class="desa-image" />
    <div class="card-content">
      <h3 class="card-title">{{ props.desaName }}</h3>
      <p class="card-description">{{ props.description }}</p>
      <div class="card-actions">
        <RouterLink :to="props.linkTo" class="detail-link">Lihat Detail</RouterLink>
        <button @click="confirmDelete" class="delete-button">
          <font-awesome-icon icon="trash-can" /> Hapus
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/variables.less'; // Pastikan path ini benar dan file variables.less ada

.desa-card {
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Menggunakan langsung atau mixin card-shadow()
  width: 300px;
  background-color: white;
  display: flex; // Tambahkan ini untuk layout flex
  flex-direction: column; // Konten disusun vertikal
  justify-content: space-between; // Dorong footer (actions) ke bawah

  &:hover {
    transform: translateY(-5px);
  }

  .desa-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }

  .card-content {
    padding: @spacing-medium; // Menggunakan variabel
    text-align: left;
    flex-grow: 1; // Agar konten mengambil ruang yang tersedia
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: @font-size-xl; // Menggunakan variabel
    color: @text-color-dark; // Menggunakan variabel
    margin-bottom: @spacing-small;
  }

  .card-description {
    font-size: 0.95em;
    color: @text-color-light; // Menggunakan variabel
    line-height: 1.5;
    margin-bottom: @spacing-medium;
    flex-grow: 1; // Deskripsi mengambil ruang yang tersedia
  }

  .card-actions {
    margin-top: @spacing-small;
    display: flex;
    justify-content: space-between; // Rata kiri-kanan
    align-items: center;
  }

  .detail-link {
    display: inline-block;
    background-color: @primary-color; // Menggunakan variabel
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 0.9em;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken(@primary-color, 10%); // Menggunakan fungsi Less
    }
  }

  .delete-button {
    background-color: #e74c3c; // Warna merah
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken(#e74c3c, 10%);
    }

    // Gaya untuk ikon di dalam tombol
    .fa-icon { // Font Awesome menggunakan tag i atau svg, tapi kita pakai komponen
      margin-right: 5px; // Sedikit jarak antara ikon dan teks
    }
  }
}

// HAPUS BLOK STYLE INI DARI DesaCard.vue! Ini harusnya ada di DesaView.vue
/*
.desa-cards-container {
  .flex-center(); // <-- Menggunakan mixin
  flex-wrap: wrap;
  gap: @spacing-medium;
  margin-top: @spacing-medium;
}
*/
</style>