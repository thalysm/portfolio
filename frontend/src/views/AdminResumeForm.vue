<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = '' // Ajuste conforme sua variável de ambiente se necessário
const route = useRoute()
const router = useRouter()
const id = route.params.id

const item = ref({
  title: { pt: '', en: '' },
  description: { pt: '', en: '' },
  institution: '',
  startDate: '',
  endDate: '',
  isPresent: false,
  type: 'Experience'
})

const pageTitle = computed(() => id ? 'Editar Item' : 'Novo Item')

const getToken = () => localStorage.getItem('authToken')

onMounted(async () => {
  if (id) {
    try {
      const res = await fetch(`${API_URL}/api/resume/${id}`)
      if (res.ok) item.value = await res.json()
    } catch (error) {
      console.error(error)
    }
  }
})

const handleSubmit = async () => {
  const token = getToken()
  const method = id ? 'PUT' : 'POST'
  const url = id ? `${API_URL}/api/resume/${id}` : `${API_URL}/api/resume`
  
  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(item.value)
    })
    router.push({ name: 'admin-resume' })
  } catch (error) {
    alert('Erro ao salvar')
  }
}
</script>

<template>
  <div class="admin-form-container">
    <h1 class="admin-page-title">{{ pageTitle }}</h1>
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label>Tipo</label>
        <select v-model="item.type" class="form-input">
          <option value="Experience">Experience</option>
          <option value="Education">Education</option>
        </select>
      </div>
      <div class="form-group">
        <label>Instituição / Empresa</label>
        <input v-model="item.institution" class="form-input" required />
      </div>
      <div class="form-group" style="display:flex; gap:10px;">
        <div style="flex:1">
          <label>Início</label>
          <input v-model="item.startDate" class="form-input" placeholder="Ex: 2022" required />
        </div>
        <div style="flex:1">
          <label>Fim</label>
          <input v-model="item.endDate" class="form-input" :disabled="item.isPresent" placeholder="Ex: 2023" />
        </div>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="item.isPresent" /> Atualmente
        </label>
      </div>
      <hr style="margin: 20px 0; border: 1px solid #ccc;" />
      <div class="form-group">
        <label>Título (PT)</label>
        <input v-model="item.title.pt" class="form-input" required />
      </div>
      <div class="form-group">
        <label>Descrição (PT)</label>
        <textarea v-model="item.description.pt" class="form-textarea" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label>Título (EN)</label>
        <input v-model="item.title.en" class="form-input" required />
      </div>
      <div class="form-group">
        <label>Descrição (EN)</label>
        <textarea v-model="item.description.en" class="form-textarea" rows="3"></textarea>
      </div>

      <button type="submit" class="submit-button">Salvar</button>
    </form>
  </div>
</template>

<style scoped>
.admin-form-container { max-width: 800px; margin: 0 auto; }
.admin-page-title { font-size: 36px; font-weight: 700; margin-bottom: 30px; }
</style>