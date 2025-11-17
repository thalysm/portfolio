<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const API_URL = ''
const items = ref([])
const loading = ref(true)

const fetchItems = async () => {
  loading.value = true
  const res = await fetch(`${API_URL}/api/resume`)
  if (res.ok) items.value = await res.json()
  loading.value = false
}

const deleteItem = async (id) => {
  if (!confirm('Apagar?')) return
  const token = localStorage.getItem('authToken')
  await fetch(`${API_URL}/api/resume/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  items.value = items.value.filter(i => i._id !== id)
}

onMounted(fetchItems)
</script>

<template>
  <div class="admin-resume-list">
    <div class="admin-header">
      <h1 class="admin-page-title">Gerir Currículo</h1>
      <RouterLink :to="{ name: 'admin-resume-new' }" class="submit-button">Novo Item +</RouterLink>
    </div>
    <div v-if="loading" class="loading-text">Carregando...</div>
    <div class="admin-table-container" v-else>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Título (PT)</th>
            <th>Tipo</th>
            <th>Instituição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item._id">
            <td data-label="Título">{{ item.title?.pt }}</td>
            <td data-label="Tipo">{{ item.type }}</td>
            <td data-label="Instituição">{{ item.institution }}</td>
            <td data-label="Ações" class="actions-cell">
              <RouterLink :to="{ name: 'admin-resume-edit', params: { id: item._id } }" class="action-button edit">Editar</RouterLink>
              <button @click="deleteItem(item._id)" class="action-button delete">Apagar</button>
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
.loading-text { text-align: center; font-size: 18px; padding: 20px; }

@media (max-width: 768px) {
  .admin-table thead { display: none; }
  .admin-table tr { display: block; margin-bottom: 20px; border: 3px solid #000; box-shadow: 5px 5px 0px 0px #1f1f1f; }
  .admin-table td { display: block; text-align: right; border: none; border-bottom: 1px solid #ddd; position: relative; padding-left: 50%; }
  .admin-table td::before { content: attr(data-label); position: absolute; left: 10px; font-weight: 700; }
  .actions-cell { justify-content: flex-end; }
}
</style>