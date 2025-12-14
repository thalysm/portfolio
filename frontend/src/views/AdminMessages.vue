<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '@/utils/api'

const API_URL = ''
const messages = ref([])
const loading = ref(true)
const error = ref(null)

// Helper para buscar o token (NÃO MAIS NECESSÁRIO COM apiFetch)
// const getToken = () => { ... }

// Função para buscar as mensagens
const fetchMessages = async () => {
  loading.value = true
  error.value = null

  try {
    // GET /api/messages é protegido
    const response = await apiFetch('/messages')
    if (!response.ok) {
      throw new Error('Falha ao carregar mensagens')
    }
    messages.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Função para apagar uma mensagem
const deleteMessage = async (id) => {
  if (!window.confirm('Tem a certeza que quer apagar esta mensagem?')) {
    return
  }

  try {
    const response = await apiFetch(`/messages/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Falha ao apagar a mensagem.')
    }

    // Remove a mensagem da lista local
    messages.value = messages.value.filter(m => m._id !== id)
  } catch (err) {
    error.value = err.message
  }
}

// Formatar data
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('pt-PT')
}

// Buscar mensagens quando o componente for montado
onMounted(fetchMessages)
</script>

<template>
  <div class="admin-messages-list">
    <div class="admin-header">
      <h1 class="admin-page-title">Mensagens Recebidas</h1>
    </div>

    <div v-if="loading" class="loading-text">A carregar mensagens...</div>
    <div v-if="error" class="error-text">{{ error }}</div>

    <div class="admin-table-container" v-if="!loading && messages.length > 0">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th class="message-col">Mensagem</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="msg in messages" :key="msg._id">
            <td data-label="Nome">{{ msg.name }}</td>
            <td data-label="Email">{{ msg.email }}</td>
            <td data-label="Mensagem" class="message-col">{{ msg.message }}</td>
            <td data-label="Data">{{ formatDate(msg.createdAt) }}</td>
            <td data-label="Ações" class="actions-cell">
              <button @click="deleteMessage(msg._id)" class="action-button delete">
                Apagar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!loading && messages.length === 0" class="no-data-text">
      Nenhuma mensagem encontrada.
    </div>
  </div>
</template>

<style scoped>
/* A maioria dos estilos (.admin-table, etc.) são herdados do AdminProjectList */
.admin-header {
  margin-bottom: 30px;
}
.admin-page-title {
  font-size: 36px;
  font-weight: 700;
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

/* Ajuste para a coluna de mensagem não ficar muito larga */
.message-col {
  max-width: 400px;
  word-wrap: break-word;
}

/* --- Copiado do AdminProjectList --- */
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
  .admin-table td.message-col {
    max-width: 100%; /* Remove a largura máxima em mobile */
    word-wrap: break-word;
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