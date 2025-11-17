<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = ''
const route = useRoute()
const router = useRouter()
const projectId = route.params.id

const currentTab = ref('pt')

const project = ref({
  title: { pt: '', en: '' },
  description: { pt: '', en: '' },
  category: '', 
  tags: '',
  image: '',
  projectLink: ''
})

const categories = ref([])
const isSubmitting = ref(false)
const error = ref(null)
const uploadMessage = ref('')
const imagePreview = ref(null)

const pageTitle = computed(() => (projectId ? 'Editar Projeto' : 'Adicionar Novo Projeto'))


const getToken = () => localStorage.getItem('authToken')

const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/api/categories`)
  if (res.ok) categories.value = await res.json()
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  const token = getToken()
  const formData = new FormData()
  formData.append('image', file)
  uploadMessage.value = 'Carregando...'
  
  try {
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
    const data = await res.json()
    project.value.image = data.url
    imagePreview.value = `${API_URL}${data.url}`
    uploadMessage.value = 'Sucesso!'
  } catch (err) {
    uploadMessage.value = 'Erro no upload'
  }
}

onMounted(async () => {
  await fetchCategories()
  if (projectId) {
    try {
      const res = await fetch(`${API_URL}/api/projects/${projectId.value}`)
      if (res.ok) {
        const data = await res.json()
        if (typeof data.title === 'string') data.title = { pt: data.title, en: '' }
        if (typeof data.description === 'string') data.description = { pt: data.description, en: '' }
        
        project.value = {
          ...data,
          tags: data.tags.join(', '),
          category: typeof data.category === 'object' ? data.category._id : data.category
        }
        imagePreview.value = `${API_URL}${data.image}`
      }
    } catch (err) {
      error.value = err.message
    }
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  const token = getToken()
  const method = projectId.value ? 'PUT' : 'POST'
  const url = projectId.value ? `${API_URL}/api/projects/${projectId.value}` : `${API_URL}/api/projects`

  const payload = {
    ...project.value,
    tags: project.value.tags.split(',').map(t => t.trim())
  }

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Erro ao salvar')
    router.push({ name: 'admin-projects' })
  } catch (err) {
    error.value = err.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="admin-form-container">
    <h1 class="admin-page-title">{{ pageTitle }}</h1>

    <div class="language-tabs">
      <button 
        type="button" 
        :class="{ active: currentTab === 'pt' }" 
        @click="currentTab = 'pt'"
      >
        Português
      </button>
      <button 
        type="button" 
        :class="{ active: currentTab === 'en' }" 
        @click="currentTab = 'en'"
      >
        English
      </button>
    </div>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Categoria</label>
        <select v-model="project.category" class="form-input" required>
          <option value="" disabled>Selecione...</option>
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">
            {{ cat.name.pt }}
          </option>
        </select>
      </div>
      
      <div v-if="currentTab === 'pt'">
        <div class="form-group">
          <label>Título (PT)</label>
          <input v-model="project.title.pt" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Descrição (PT)</label>
          <textarea v-model="project.description.pt" class="form-textarea" rows="4" required></textarea>
        </div>
      </div>

      <div v-if="currentTab === 'en'">
        <div class="form-group">
          <label>Título (EN)</label>
          <input v-model="project.title.en" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Descrição (EN)</label>
          <textarea v-model="project.description.en" class="form-textarea" rows="4" required></textarea>
        </div>
      </div>

      <hr style="margin: 30px 0; border: 1px solid #ccc;">

      <div class="form-group">
        <label>Tags</label>
        <input v-model="project.tags" class="form-input" />
      </div>
      <div class="form-group">
        <label>Link</label>
        <input v-model="project.projectLink" class="form-input" />
      </div>
      <div class="form-group">
        <label>Imagem</label>
        <input type="file" @change="handleImageUpload" class="form-input" />
        <img v-if="imagePreview" :src="imagePreview" style="max-width: 200px; margin-top: 10px; border: 2px solid #000;" />
      </div>
      
      <button type="submit" class="submit-button" :disabled="isSubmitting">Salvar</button>
    </form>
  </div>
</template>

<style scoped>
.admin-form-container { max-width: 800px; margin: 0 auto; }
.admin-page-title { font-size: 36px; font-weight: 700; margin-bottom: 30px; }

.language-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.language-tabs button {
  flex: 1;
  padding: 10px;
  cursor: pointer;
  background: #fff;
  border: 2px solid #000;
  font-weight: 600;
  transition: all 0.2s;
}
.language-tabs button.active {
  background: #5093fe;
  color: #fff;
  box-shadow: 3px 3px 0 0 #1f1f1f;
}
</style>