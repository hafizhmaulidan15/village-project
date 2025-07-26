<script setup>
import { ref } from 'vue';
import { useDesaStore } from '@/stores/desa.js';
import { useNotificationStore } from '@/stores/notification.js'; // <-- IMPOR STORE NOTIFIKASI

const desaStore = useDesaStore();
const notificationStore = useNotificationStore(); // <-- INISIALISASI STORE NOTIFIKASI

const newDesa = ref({
  name: '',
  shortDesc: '',
  imageUrl: ''
});

const errors = ref({
  name: '',
  shortDesc: '',
  imageUrl: ''
});

const validateInput = () => {
  let isValid = true;
  if (!newDesa.value.name.trim()) { errors.value.name = 'Nama Desa tidak boleh kosong.'; isValid = false; } else { errors.value.name = ''; }
  if (!newDesa.value.shortDesc.trim()) { errors.value.shortDesc = 'Deskripsi Singkat tidak boleh kosong.'; isValid = false; } else { errors.value.shortDesc = ''; }
  if (!newDesa.value.imageUrl.trim()) { errors.value.imageUrl = 'URL Gambar tidak boleh kosong.'; isValid = false; } else { errors.value.imageUrl = ''; }
  return isValid;
};

const submitForm = () => {
  if (!validateInput()) {
    notificationStore.showNotification('Mohon perbaiki kesalahan dalam form!', 'error'); // <-- GANTI ALERT DENGAN NOTIFIKASI
    return;
  }

  desaStore.addDesa({
    name: newDesa.value.name,
    shortDesc: newDesa.value.shortDesc,
    description: newDesa.value.shortDesc + ' (Deskripsi lengkap ini berasal dari deskripsi singkat di form)',
    imageUrl: newDesa.value.imageUrl
  });

  newDesa.value.name = '';
  newDesa.value.shortDesc = '';
  newDesa.value.imageUrl = '';
  errors.value.name = '';
  errors.value.shortDesc = '';
  errors.value.imageUrl = '';

  notificationStore.showNotification('Desa berhasil ditambahkan!', 'success'); // <-- GANTI ALERT DENGAN NOTIFIKASI
};
</script>

<template>
  <div class="desa-form-container">
    <h2>Tambahkan Desa Baru</h2>
    <form @submit.prevent="submitForm" class="desa-form">
      <div class="form-group">
        <label for="desaName">Nama Desa:</label>
        <input type="text" id="desaName" v-model="newDesa.name" @input="validateInput" placeholder="Contoh: Desa Sejahtera">
        <p v-if="errors.name" class="error-message">{{ errors.name }}</p> </div>

      <div class="form-group">
        <label for="shortDesc">Deskripsi Singkat:</label>
        <textarea id="shortDesc" v-model="newDesa.shortDesc" @input="validateInput" rows="3" placeholder="Contoh: Desa ini terkenal dengan..."></textarea>
        <p v-if="errors.shortDesc" class="error-message">{{ errors.shortDesc }}</p> </div>

      <div class="form-group">
        <label for="imageUrl">URL Gambar:</label>
        <input type="url" id="imageUrl" v-model="newDesa.imageUrl" @input="validateInput" placeholder="Contoh: https://picsum.photos/id/1/300/200">
        <p v-if="errors.imageUrl" class="error-message">{{ errors.imageUrl }}</p> </div>

      <button type="submit" class="submit-button">Tambah Desa</button>
    </form>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/variables.less';

.desa-form-container {
  background-color: white;
  padding: @spacing-large;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: @spacing-large auto;
  text-align: left;

  h2 {
    text-align: center;
    color: @text-color-dark;
    margin-bottom: @spacing-large;
    font-size: @font-size-xl;
  }

  .desa-form {
    .form-group {
      margin-bottom: @spacing-medium;

      label {
        display: block;
        margin-bottom: @spacing-small / 2;
        font-weight: bold;
        color: @text-color-dark;
      }

      input[type="text"],
      input[type="url"],
      textarea {
        width: calc(100% - (@spacing-small * 2));
        padding: @spacing-small;
        border: 1px solid @border-color;
        border-radius: 4px;
        font-size: @font-size-base;
        box-sizing: border-box;
        &:focus { // Style saat input fokus
          outline: none;
          border-color: @primary-color;
          box-shadow: 0 0 0 2px rgba(@primary-color, 0.2);
        }
      }

      textarea {
        resize: vertical;
      }

      .error-message { // Style untuk pesan error
        color: #e74c3c; // Merah
        font-size: 0.85em;
        margin-top: 5px;
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