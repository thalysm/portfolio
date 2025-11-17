<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const API_URL = ''
const projects = ref([])
const loading = ref(true)
const error = ref(null)

const getToken = () => {
  return localStorage.getItem('authToken')
}

const fetchProjects = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`${API_URL}/api/projects`)
    if (!response.ok) {
      throw new Error('Falha ao carregar projetos')
    }
    projects.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const deleteProject = async (id) => {
  if (!window.confirm('Tem a certeza que quer apagar este projeto?')) {
    return
  }

  const token = getToken()
  if (!token) {
    error.value = 'Não autorizado. Faça login novamente.'
    return
  }

  try {
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Falha ao apagar o projeto.')
    }

    projects.value = projects.value.filter(p => p._id !== id)
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchProjects)
</script>

<template>
  <div class="admin-project-list">
    <div class="admin-header">
      <h1 class="admin-page-title">Gerir Projetos</h1>
      <RouterLink :to="{ name: 'admin-project-new' }" class="submit-button">
        Adicionar Novo +
      </RouterLink>
    </div>

    <div v-if="loading" class="loading-text">A carregar projetos...</div>
    <div v-if="error" class="error-text">{{ error }}</div>

    <div class="admin-table-container" v-if="!loading && projects.length > 0">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Título (PT)</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project._id">
            <td data-label="Título">
              {{ project.title?.pt || project.title }}
            </td>
            <td data-label="Data">{{ new Date(project.createdAt).toLocaleDateString() }}</td>
            <td data-label="Ações" class="actions-cell">
              <RouterLink
                :to="{ name: 'admin-project-edit', params: { id: project._id } }"
                class="action-button edit"
              >
                Editar
              </RouterLink>
              <button @click="deleteProject(project._id)" class="action-button delete">
                Apagar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!loading && projects.length === 0" class="no-data-text">
      Nenhum projeto encontrado.
    </div>
  </div>
</template>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.admin-page-title {
  font-size: 36px;
  font-weight: 700;
}

.submit-button {
  text-decoration: none;
  font-size: 16px;
  padding: 10px 15px;
}

.loading-text,
.error-text,
.no-data-text {
  text-align: center;
  font-size: 18px;
  padding: 20px;
}
.error-text {
  color: red;
}

.admin-table-container {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f2f2f2;
  border: 3px solid #000;
  box-shadow: 5px 5px 0px 0px #1f1f1f;
}

.admin-table th,
.admin-table td {
  border: 3px solid #000;
  padding: 12px 15px;
  text-align: left;
}

.admin-table th {
  background-color: #f2f2f2;
  font-size: 18px;
}

.actions-cell {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-button {
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 3px solid black;
  box-shadow: 3px 3px 0px 0px #1f1f1f;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.action-button.edit {
  background-color: #ceff1a;
  color: #000;
}

.action-button.delete {
  background-color: #ffcccc;
  color: #cc0000;
  border-color: #cc0000;
  box-shadow: 3px 3px 0px 0px #cc0000;
}

@media (max-width: 768px) {
  .admin-table thead {
    display: none;
  }
  .admin-table tr {
    display: block;
    margin-bottom: 20px;
    border: 3px solid #000;
    box-shadow: 5px 5px 0px 0px #1f1f1f;
  }
  .admin-table td {
    display: block;
    text-align: right;
    border: none;
    border-bottom: 1px solid #ddd;
    position: relative;
    padding-left: 50%;
  }
  .admin-table td:last-child {
    border-bottom: 0;
  }
  .admin-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    padding-right: 10px;
    font-weight: 700;
    text-align: left;
  }
  .actions-cell {
    justify-content: flex-end;
  }
}
</style>