import { defineStore } from 'pinia';

export const useDesaStore = defineStore('desa', {
  state: () => ({
    desas: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    getAllDesas: (state) => state.desas,
    getDesaById: (state) => (id) => {
      return state.desas.find(desa => desa.id === id);
    },
  },
  actions: {
    async fetchDesas() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        this.desas = data.map(post => ({
          id: post.id,
          name: `Desa ${post.title.split(' ').slice(0, 2).join(' ')}`,
          shortDesc: post.body.substring(0, 100) + '...',
          description: post.body,
          imageUrl: `https://picsum.photos/id/${post.id + 10}/300/200`,
          detailLink: `/desa/${post.id}`
        }));
      } catch (e) {
        this.error = e.message;
        console.error('Failed to fetch desas:', e);
      } finally {
        this.isLoading = false;
      }
    },

    deleteDesa(id) {
      this.desas = this.desas.filter(desa => desa.id !== id);
      console.log(`Desa dengan ID ${id} dihapus dari store.`);
    },

    addDesa(newDesa) {
      // Pastikan ada desa di daftar sebelum mencari ID maksimum
      const lastId = this.desas.length > 0 ? Math.max(...this.desas.map(d => d.id)) : 0;
      const newId = lastId + 1;
      this.desas.push({ ...newDesa, id: newId });
      console.log('Desa baru ditambahkan:', newDesa);
    }
  },
});