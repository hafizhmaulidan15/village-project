<script setup>
import { ref } from 'vue';

// Data form kontak
const contactForm = ref({
  name: '',
  email: '',
  message: ''
});

// Fungsi untuk menangani submit form kontak
const submitContactForm = () => {
  // Validasi sederhana untuk form kontak
  if (!contactForm.value.name.trim() || !contactForm.value.email.trim() || !contactForm.value.message.trim()) {
    alert('Mohon lengkapi semua kolom di form kontak.');
    return;
  }

  // Validasi email dasar (bisa lebih kompleks)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contactForm.value.email)) {
    alert('Format email tidak valid.');
    return;
  }

  // Di aplikasi nyata, Anda akan mengirim data ini ke backend (API)
  console.log('Form Kontak Disubmit:', contactForm.value);
  alert('Terima kasih! Pesan Anda telah terkirim.');

  // Reset form
  contactForm.value.name = '';
  contactForm.value.email = '';
  contactForm.value.message = '';
};
</script>

<template>
  <div class="contact-page">
    <h1 class="page-title">Hubungi Kami</h1>
    <p class="intro-text">
      Ada pertanyaan, saran, atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami melalui form di bawah ini.
    </p>

    <form @submit.prevent="submitContactForm" class="contact-form">
      <div class="form-group">
        <label for="contactName">Nama Anda:</label>
        <input type="text" id="contactName" v-model="contactForm.name" required>
      </div>

      <div class="form-group">
        <label for="contactEmail">Email Anda:</label>
        <input type="email" id="contactEmail" v-model="contactForm.email" required>
      </div>

      <div class="form-group">
        <label for="contactMessage">Pesan Anda:</label>
        <textarea id="contactMessage" v-model="contactForm.message" rows="5" required></textarea>
      </div>

      <button type="submit" class="submit-button">Kirim Pesan</button>
    </form>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/variables.less';

.contact-page {
  padding: @spacing-large;
  max-width: 700px;
  margin: @spacing-large auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  text-align: center;

  .page-title {
    color: @text-color-dark;
    margin-bottom: @spacing-medium;
    font-size: @font-size-xxl;
  }

  .intro-text {
    color: @text-color-light;
    font-size: @font-size-large;
    line-height: 1.5;
    margin: 0 auto @spacing-large;
    max-width: 600px;
  }

  .contact-form {
    text-align: left; // Form input rata kiri
    padding: @spacing-medium;

    .form-group {
      margin-bottom: @spacing-medium;

      label {
        display: block;
        margin-bottom: @spacing-small / 2;
        font-weight: bold;
        color: @text-color-dark;
      }

      input[type="text"],
      input[type="email"],
      textarea {
        width: calc(100% - (@spacing-small * 2));
        padding: @spacing-small;
        border: 1px solid @border-color;
        border-radius: 4px;
        font-size: @font-size-base;
        box-sizing: border-box;
        &:focus {
          outline: none;
          border-color: @primary-color;
          box-shadow: 0 0 0 2px rgba(@primary-color, 0.2);
        }
      }

      textarea {
        resize: vertical;
      }
    }

    .submit-button {
      display: block;
      width: 100%;
      background-color: @primary-color;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: @font-size-large;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken(@primary-color, 10%);
      }
    }
  }
}
</style>