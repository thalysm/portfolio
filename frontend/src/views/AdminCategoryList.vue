<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const API_URL = ''
const categories = ref([])
const loading = ref(true)
const error = ref(null)

import { apiFetch } from '@/utils/api'

const fetchCategories = async () => {
  loading.value = true
  try {
    const response = await apiFetch('/categories')
    if (!response.ok) throw new Error('Erro ao buscar categorias')
    categories.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const deleteCategory = async (id) => {
  if (!confirm('Apagar esta categoria?')) return
  try {
    const res = await apiFetch(`/categories/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Erro ao apagar')
    categories.value = categories.value.filter(c => c._id !== id)
  } catch (err) {
    alert(err.message)
  }
}

onMounted(fetchCategories)
</script>

<template>
  <div class="admin-category-list">
    <div class="admin-header">
      <h1 class="admin-page-title">Gerir Categorias</h1>
      <RouterLink :to="{ name: 'admin-category-new' }" class="submit-button">Nova +</RouterLink>
    </div>
    <div v-if="loading" class="loading-text">Carregando...</div>
    <div v-else-if="error" class="error-text">{{ error }}</div>
    <div class="admin-table-container" v-else>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nome (PT)</th>
            <th>Nome (EN)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categories" :key="cat._id">
            <td data-label="Nome (PT)">{{ cat.name?.pt }}</td>
            <td data-label="Nome (EN)">{{ cat.name?.en }}</td>
            <td data-label="Ações" class="actions-cell">
              <RouterLink :to="{ name: 'admin-category-edit', params: { id: cat._id } }" class="action-button edit">Editar</RouterLink>
              <button @click="deleteCategory(cat._id)" class="action-button delete">Apagar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-header { display: flex; justify-content: space-between; margin-bottom: 20px; align-items: center; }
.admin-page-title { font-size: 36px; font-weight: 700; }
.admin-table-container { overflow-x: auto; }
.admin-table { width: 100%; border-collapse: collapse; background-color: #f2f2f2; border: 3px solid #000; box-shadow: 5px 5px 0px 0px #1f1f1f; }
.admin-table th, .admin-table td { border: 3px solid #000; padding: 12px 15px; text-align: left; }
.admin-table th { background-color: #f2f2f2; font-size: 18px; }
.actions-cell { display: flex; gap: 10px; }
.action-button { padding: 8px 12px; font-size: 14px; font-weight: 600; cursor: pointer; border: 3px solid black; box-shadow: 3px 3px 0px 0px #1f1f1f; text-decoration: none; display: inline-block; text-align: center; }
.edit { background-color: #ceff1a; color: #000; }
.delete { background-color: #ffcccc; color: #cc0000; border-color: #cc0000; box-shadow: 3px 3px 0px 0px #cc0000; }
.submit-button { text-decoration: none; font-size: 16px; padding: 10px 15px; }
.loading-text, .error-text { text-align: center; font-size: 18px; padding: 20px; }
.error-text { color: red; }

@media (max-width: 768px) {
  .admin-table thead { display: none; }
  .admin-table tr { display: block; margin-bottom: 20px; border: 3px solid #000; box-shadow: 5px 5px 0px 0px #1f1f1f; }
  .admin-table td { display: block; text-align: right; border: none; border-bottom: 1px solid #ddd; position: relative; padding-left: 50%; }
  .admin-table td::before { content: attr(data-label); position: absolute; left: 10px; font-weight: 700; }
  .actions-cell { justify-content: flex-end; }
}
</style>