<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const API_URL = ''
const posts = ref([])
const loading = ref(true)
const error = ref(null)

// Helper para buscar o token
const getToken = () => {
  return localStorage.getItem('authToken')
}

// Função para buscar os posts
const fetchPosts = async () => {
  loading.value = true
  error.value = null
  try {
    // GET /api/posts é público
    const response = await fetch(`${API_URL}/api/posts`)
    if (!response.ok) {
      throw new Error('Falha ao carregar posts')
    }
    posts.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Função para apagar um post
const deletePost = async (id) => {
  if (!window.confirm('Tem a certeza que quer apagar este post?')) {
    return
  }

  const token = getToken()
  if (!token) {
    error.value = 'Não autorizado. Faça login novamente.'
    return
  }

  try {
    const response = await fetch(`${API_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Falha ao apagar o post.')
    }

    // Remove o post da lista local
    posts.value = posts.value.filter(p => p._id !== id)
  } catch (err) {
    error.value = err.message
  }
}

// Buscar posts quando o componente for montado
onMounted(fetchPosts)
</script>

<template>
  <div class="admin-post-list">
    <div class="admin-header">
      <h1 class="admin-page-title">Gerir Posts</h1>
      <RouterLink :to="{ name: 'admin-post-new' }" class="submit-button">
        Adicionar Novo +
      </RouterLink>
    </div>

    <div v-if="loading" class="loading-text">A carregar posts...</div>
    <div v-if="error" class="error-text">{{ error }}</div>

    <div class="admin-table-container" v-if="!loading && posts.length > 0">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Snippet (Resumo)</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post._id">
            <td data-label="Título">{{ post.title }}</td>
            <td data-label="Snippet">{{ post.snippet }}</td>
            <td data-label="Data">{{ new Date(post.createdAt).toLocaleDateString() }}</td>
            <td data-label="Ações" class="actions-cell">
              <RouterLink
                :to="{ name: 'admin-post-edit', params: { id: post._id } }"
                class="action-button edit"
              >
                Editar
              </RouterLink>
              <button @click="deletePost(post._id)" class="action-button delete">
                Apagar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!loading && posts.length === 0" class="no-data-text">
      Nenhum post encontrado.
    </div>
  </div>
</template>

<style scoped>
/* Copiamos os estilos exatos do AdminProjectList para manter a consistência */
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

/* Responsividade da Tabela */
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