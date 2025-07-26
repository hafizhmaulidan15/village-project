<script setup>
import { useRoute } from 'vue-router'; // Untuk mengakses parameter URL
import { useDesaStore } from '@/stores/desa.js'; // Mengimpor store Pinia (pastikan .js ada)
import { computed } from 'vue';

const route = useRoute(); // Menginisialisasi objek route
const desaStore = useDesaStore(); // Menginisialisasi store

// Mengambil ID desa dari parameter URL
// route.params.id akan berupa string, jadi perlu diubah ke integer
const desaId = parseInt(route.params.id);

// Menggunakan getter dari store untuk mendapatkan detail desa
// computed memastikan data reaktif: jika store berubah, komponen ini juga update
const desa = computed(() => desaStore.getDesaById(desaId));

// Opsi: Menangani kasus jika desa tidak ditemukan
// Anda bisa mengarahkan pengguna ke halaman 404 atau menampilkan pesan
if (!desa.value) {
  // Hanya log peringatan ke konsol untuk saat ini.
  // Di aplikasi nyata, Anda mungkin ingin mengarahkan pengguna (redirect)
  // Contoh redirect:
  // import { useRouter } from 'vue-router';
  // const router = useRouter();
  // router.push('/404'); // Atau rute lain untuk "tidak ditemukan"
  console.warn(`Desa dengan ID ${desaId} tidak ditemukan.`);
}
</script>

<template>
  <div class="desa-detail-page">
    <div v-if="desa">
      <img :src="desa.imageUrl" :alt="desa.name" class="detail-image" />
      <h1 class="detail-title">{{ desa.name }}</h1>
      <p class="detail-description">{{ desa.description }}</p>

      <div class="desa-facts">
        <h3>Fakta Menarik tentang {{ desa.name }}:</h3>
        <ul>
          <li>Ditemukan pada tahun 18XX oleh penduduk asli.</li>
          <li>Populasi: sekitar {{ Math.floor(Math.random() * 5000) + 1000 }} jiwa.</li>
          <li>Komoditas utama: Kopi Arabika dan hasil perkebunan lainnya.</li>
          <li>Tempat wisata populer: Air Terjun Pelangi dan Goa Kelelawar.</li>
        </ul>
      </div>
      <RouterLink to="/desa" class="back-link">← Kembali ke Daftar Desa</RouterLink>
    </div>
    <div v-else class="not-found-message">
      <h2>Desa tidak ditemukan.</h2>
      <p>Maaf, desa yang Anda cari tidak ada atau belum terdaftar.</p>
      <RouterLink to="/desa" class="back-link">Kembali ke Daftar Desa</RouterLink>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/variables.less';

.desa-detail-page {
  padding: @spacing-large;
  text-align: center;
  background-color: white; // Warna latar belakang putih
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05); // Bayangan ringan

  .detail-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover; // Gambar mengisi area tanpa distorsi
    border-radius: 8px;
    margin-bottom: @spacing-medium;
  }

  .detail-title {
    color: @text-color-dark;
    font-size: @font-size-xxl;
    margin-bottom: @spacing-medium;
  }

  .detail-description {
    color: @text-color-light;
    font-size: @font-size-large;
    line-height: 1.6;
    margin-bottom: @spacing-large;
    text-align: justify; // Teks deskripsi rata kiri-kanan
  }

  .desa-facts {
    background-color: #e8f5e9; // Warna hijau muda
    border-left: 5px solid @primary-color; // Garis hijau di kiri
    padding: @spacing-medium;
    margin-bottom: @spacing-large;
    text-align: left; // Teks fakta rata kiri

    h3 {
      color: @primary-color;
      margin-top: 0;
      margin-bottom: @spacing-small;
    }

    ul {
      list-style-type: disc; // Bullet point
      padding-left: @spacing-medium;
      margin: 0;

      li {
        margin-bottom: 5px;
        color: @text-color-light;
      }
    }
  }

  .back-link {
    display: inline-block;
    margin-top: @spacing-large;
    color: @primary-color;
    text-decoration: none; // Hapus garis bawah link
    font-size: @font-size-large;
    transition: color 0.3s ease; // Efek hover

    &:hover {
      color: darken(@primary-color, 10%);
    }
  }

  .not-found-message {
    margin-top: @spacing-large * 2; // Margin atas lebih besar jika tidak ditemukan
    h2 {
      color: #e74c3c; // Warna merah untuk judul error
      margin-bottom: @spacing-small;
    }
    p {
      color: @text-color-light;
      font-size: @font-size-large;
    }
  }
}
</style>