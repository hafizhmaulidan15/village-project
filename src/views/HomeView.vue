<script setup>
import { RouterLink } from 'vue-router'; // Impor RouterLink untuk navigasi

// Data dummy untuk statistik atau highlight desa
const highlights = [
  { id: 1, title: 'Populasi', value: '± 7.500 Jiwa', icon: 'users' },
  { id: 2, title: 'Destinasi Wisata', value: '12+ Lokasi', icon: 'map-marked-alt' },
  { id: 3, title: 'Produk Unggulan', value: 'Kopi & Kerajinan', icon: 'leaf' },
  { id: 4, title: 'Luas Wilayah', value: '500 Ha', icon: 'expand-arrows-alt' }
];
</script>

<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Selamat Datang di <span class="highlight-text">Desa Impian</span>!</h1>
        <p class="hero-description">
          Temukan keindahan alam yang memukau, kekayaan budaya yang otentik, dan keramahan masyarakat di jantung Indonesia.
        </p>
        <RouterLink to="/desa" class="hero-button">
          Jelajahi Desa Sekarang <font-awesome-icon icon="arrow-right" />
        </RouterLink>
      </div>
      </section>

    <section class="highlights-section">
      <h2 class="section-title">Mengapa Desa Impian?</h2>
      <div class="highlights-grid">
        <div v-for="item in highlights" :key="item.id" class="highlight-item">
          <font-awesome-icon :icon="item.icon" class="highlight-icon" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.value }}</p>
        </div>
      </div>
    </section>

    <section class="about-teaser-section">
      <h2 class="section-title">Tentang Kami</h2>
      <p class="teaser-text">
        Desa Impian didirikan dengan semangat untuk melestarikan kekayaan alam dan budaya lokal,
        sekaligus memberdayakan masyarakatnya menuju masa depan yang lebih cerah.
        Pelajari lebih lanjut tentang misi dan visi kami.
      </p>
      <RouterLink to="/about" class="about-button">
        Baca Selengkapnya <font-awesome-icon icon="book-open" />
      </RouterLink>
    </section>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/variables.less';



/* Hero Section */
.hero-section {
  background-image: url('https://picsum.photos/1600/600?random=1'); // Gambar hero acak
  background-size: cover;
  background-position: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); // Bayangan teks agar lebih terbaca
  padding: 100px @spacing-large;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 500px; // Tinggi minimal hero section
  position: relative; // Untuk overlay

  &::before { // Overlay gelap untuk teks lebih terbaca
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4); // Overlay semi-transparan
  }

  .hero-content {
    position: relative; // Di atas overlay
    z-index: 1;
    text-align: center;
    max-width: 900px;
  }

  .hero-title {
    font-size: 3.5em;
    margin-bottom: @spacing-medium;
    line-height: 1.2;
    .highlight-text {
      color: @primary-color; // Warna cerah untuk menonjol
      font-weight: bold;
    }
    @media (max-width: 768px) {
      font-size: 2.5em;
    }
    @media (max-width: 480px) {
      font-size: 2em;
    }
  }

  .hero-description {
    font-size: 1.3em;
    margin-bottom: @spacing-large;
    line-height: 1.6;
    @media (max-width: 768px) {
      font-size: 1.1em;
    }
  }

  .hero-button {
    display: inline-block;
    background-color: @primary-color;
    color: white;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 1.1em;
    transition: background-color 0.3s ease, transform 0.2s ease;
    .fa-icon {
      margin-left: 10px;
    }

    &:hover {
      background-color: darken(@primary-color, 10%);
      transform: translateY(-3px);
    }
  }
}

/* Highlights Section */
.highlights-section {
  padding: @spacing-large * 1.5 @spacing-large;
  background-color: @background-light;
  text-align: center;

  .section-title {
    font-size: 2.5em;
    color: @text-color-dark;
    margin-bottom: @spacing-large * 1.5;
    @media (max-width: 768px) {
      font-size: 2em;
    }
  }

  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: @spacing-large;
    max-width: 1000px;
    margin: 0 auto;

    .highlight-item {
      background-color: white;
      padding: @spacing-medium;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; // Tengah secara vertikal

      .highlight-icon {
        font-size: 3em;
        color: @primary-color;
        margin-bottom: @spacing-small;
      }

      h3 {
        font-size: 1.2em;
        color: @text-color-dark;
        margin-bottom: 5px;
      }

      p {
        font-size: 0.95em;
        color: @text-color-light;
        line-height: 1.4;
      }
    }
  }
}

/* About Us Teaser Section */
.about-teaser-section {
  padding: @spacing-large * 1.5 @spacing-large;
  background-color: @secondary-color; // Warna background berbeda
  color: white;
  text-align: center;

  .section-title {
    color: white;
    margin-bottom: @spacing-large;
  }

  .teaser-text {
    font-size: 1.1em;
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto @spacing-large * 1.5;
  }

  .about-button {
    display: inline-block;
    background-color: @primary-color;
    color: white;
    padding: 12px 25px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 1em;
    transition: background-color 0.3s ease, transform 0.2s ease;
    .fa-icon {
      margin-left: 10px;
    }

    &:hover {
      background-color: darken(@primary-color, 10%);
      transform: translateY(-3px);
    }
  }
}
</style>