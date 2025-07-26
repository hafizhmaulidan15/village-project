<script setup>
// Tidak ada script di sini untuk saat ini karena kita hanya menampilkan teks statis
</script>

<template>
  <div class="about-page">
    <h1 class="page-title">Tentang Desa Impian</h1>
    <p class="intro-text">
      Desa Impian didirikan dengan semangat untuk melestarikan kekayaan alam dan budaya lokal,
      sekaligus memberdayakan masyarakatnya menuju masa depan yang lebih cerah.
    </p>

    <section class="section">
      <h2>Misi Kami</h2>
      <p>
        Mewujudkan Desa Impian sebagai desa percontohan dalam pengelolaan lingkungan yang berkelanjutan,
        pengembangan ekonomi kreatif berbasis potensi lokal, dan pelestarian adat istiadat.
      </p>
      <ul>
        <li>Meningkatkan kesadaran masyarakat akan pentingnya menjaga kebersihan dan kelestarian alam.</li>
        <li>Mengembangkan produk-produk unggulan desa melalui pelatihan dan dukungan pemasaran.</li>
        <li>Menyelenggarakan festival budaya tahunan untuk mempromosikan tradisi lokal.</li>
      </ul>
    </section>

    <section class="section">
      <h2>Visi Kami</h2>
      <p>
        Menjadi desa yang mandiri, sejahtera, dan lestari dengan pondasi budaya yang kuat serta lingkungan yang asri.
      </p>
    </section>

    <section class="section values-section">
      <h2>Nilai-Nilai Kami</h2>
      <div class="values-grid">
        <div class="value-item">
          <h3><font-awesome-icon icon="leaf" /> Kelestarian</h3>
          <p>Menjaga harmoni dengan alam adalah prioritas utama kami untuk masa depan.</p>
        </div>
        <div class="value-item">
          <h3><font-awesome-icon icon="handshake" /> Kebersamaan</h3>
          <p>Gotong royong dan semangat kekeluargaan adalah inti dari kehidupan desa kami.</p>
        </div>
        <div class="value-item">
          <h3><font-awesome-icon icon="lightbulb" /> Inovasi</h3>
          <p>Terus berinovasi dalam mengelola potensi desa untuk kesejahteraan bersama.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/variables.less'; // Pastikan path ini benar

.about-page {
  padding: @spacing-large;
  max-width: 900px;
  margin: @spacing-large auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  text-align: center; // Default center, tapi content bisa di-override

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
    margin: 0 auto @spacing-large * 1.5;
  }

  .section {
    text-align: left; // Konten section rata kiri
    margin-bottom: @spacing-large * 2;
    padding-top: @spacing-medium; // Padding atas untuk pemisah visual

    h2 {
      color: @primary-color;
      font-size: 2em;
      margin-bottom: @spacing-medium;
      text-align: center; // Judul section tetap di tengah
    }

    p {
      color: @text-color-dark;
      line-height: 1.7;
      margin-bottom: @spacing-medium;
    }

    ul {
      list-style-type: disc;
      padding-left: @spacing-medium;
      margin-bottom: @spacing-medium;
      color: @text-color-light;

      li {
        margin-bottom: @spacing-small / 2;
      }
    }
  }

  .values-section {
    background-color: @background-alternate; // Latar belakang berbeda untuk section nilai
    padding: @spacing-large;
    border-radius: 8px;

    h2 {
      color: @secondary-color;
      margin-bottom: @spacing-large;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); // Responsive grid
      gap: @spacing-medium;
      text-align: center; // Konten di dalam grid rata tengah

      .value-item {
        background-color: white;
        padding: @spacing-medium;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

        h3 {
          color: @primary-color;
          font-size: 1.3em;
          margin-bottom: @spacing-small;
          .fa-icon { // Style untuk ikon di dalam h3
            margin-right: 8px;
            color: @secondary-color; // Warna ikon
          }
        }

        p {
          font-size: 0.95em;
          color: @text-color-light;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>