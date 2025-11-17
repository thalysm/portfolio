<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = ''
const route = useRoute()
const router = useRouter()
const id = route.params.id

const category = ref({ name: { pt: '', en: '' } })
const isSubmitting = ref(false)

const pageTitle = computed(() => id ? 'Editar Categoria' : 'Nova Categoria')
const getToken = () => localStorage.getItem('authToken')

onMounted(async () => {
  if (id) {
    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`)
      if (res.ok) category.value = await res.json()
    } catch (e) { console.error(e) }
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  const token = getToken()
  const method = id ? 'PUT' : 'POST'
  const url = id ? `${API_URL}/api/categories/${id}` : `${API_URL}/api/categories`

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(category.value)
    })
    if (!res.ok) throw new Error('Erro ao salvar')
    router.push({ name: 'admin-categories' })
  } catch (err) {
    alert(err.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="admin-form-container">
    <h1 class="admin-page-title">{{ pageTitle }}</h1>
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label>Nome (PT)</label>
        <input v-model="category.name.pt" class="form-input" required />
      </div>
      <div class="form-group">
        <label>Nome (EN)</label>
        <input v-model="category.name.en" class="form-input" required />
      </div>
      <button type="submit" class="submit-button" :disabled="isSubmitting">Salvar</button>
    </form>
  </div>
</template>

<style scoped>
.admin-form-container { max-width: 600px; margin: 0 auto; }
.admin-page-title { font-size: 36px; font-weight: 700; margin-bottom: 30px; }
</style>