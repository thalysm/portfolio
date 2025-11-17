<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'
const route = useRoute()
const router = useRouter()

const projectId = ref(route.params.id || null)

const project = ref({
  title: '',
  description: '',
  category: 'Web Development',
  tags: '', 
  image: '',
  projectLink: '' // 1. Adicionado o campo aqui
})

const pageTitle = computed(() => (projectId.value ? 'Editar Projeto' : 'Adicionar Novo Projeto'))
const isSubmitting = ref(false)
const error = ref(null)
const uploadMessage = ref('')
const imagePreview = ref(null)

const getToken = () => {
  return localStorage.getItem('authToken')
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const token = getToken()
  if (!token) {
    error.value = 'Não autorizado. Faça login novamente.'
    return
  }

  const formData = new FormData()
  formData.append('image', file)

  uploadMessage.value = 'A carregar imagem...'
  error.value = null
  imagePreview.value = URL.createObjectURL(file) 

  try {
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error('Falha no upload da imagem.')
    }

    const data = await response.json()
    project.value.image = data.url
    uploadMessage.value = 'Imagem carregada com sucesso!'
  } catch (err) {
    error.value = err.message
    imagePreview.value = null
  }
}

onMounted(async () => {
  if (projectId.value) {
    try {
      const response = await fetch(`${API_URL}/api/projects/${projectId.value}`)
      if (!response.ok) {
        throw new Error('Projeto não encontrado')
      }
      const data = await response.json()
      project.value.title = data.title
      project.value.description = data.description
      project.value.category = data.category
      project.value.tags = data.tags.join(', ')
      project.value.image = data.image
      project.value.projectLink = data.projectLink || '' // 2. Adicionado o carregamento do link
      imagePreview.value = `${API_URL}${data.image}`
    } catch (err) {
      error.value = err.message
    }
  }
})

const handleSubmit = async () => {
  if (!project.value.image) {
    error.value = 'Por favor, faça primeiro o upload de uma imagem.'
    return
  }

  isSubmitting.value = true
  error.value = null
  const token = getToken()

  try {
    const isEditMode = !!projectId.value
    const url = isEditMode
      ? `${API_URL}/api/projects/${projectId.value}`
      : `${API_URL}/api/projects`
      
    const method = isEditMode ? 'PUT' : 'POST'

    const payload = {
      ...project.value,
      tags: project.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload) // 3. O projectLink já está incluído aqui
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Falha ao salvar o projeto.')
    }

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

    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Título</label>
        <input type="text" id="title" class="form-input" v-model="project.title" required />
      </div>

      <div class="form-group">
        <label for="category">Categoria</label>
        <select id="category" class="form-input" v-model="project.category" required>
          <option value="Web Development">Web Development</option>
          <option value="Application">Application</option>
          <option value="Web Design">Web Design</option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea
          id="description"
          rows="5"
          class="form-textarea"
          v-model="project.description"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="tags">Tags (separadas por vírgula)</label>
        <input type="text" id="tags" class="form-input" v-model="project.tags" />
      </div>
      
      <div class="form-group">
        <label for="projectLink">Link do Projeto (Opcional)</label>
        <input 
          type="url" 
          id="projectLink" 
          class="form-input" 
          v-model="project.projectLink" 
          placeholder="https://exemplo.com"
        />
      </div>
      <div class="form-group">
        <label for="image">Imagem de Destaque</label>
        <input
          type="file"
          id="image"
          class="form-input"
          @change="handleImageUpload"
          accept="image/*"
        />
        <div class="upload-status" v-if="uploadMessage">{{ uploadMessage }}</div>
        <div v-if="imagePreview" class="image-preview-container">
          <p>Preview:</p>
          <img :src="imagePreview" alt="Preview" class="image-preview" />
        </div>
      </div>

      <div v-if="error" class="error-text" style="color: red; margin-bottom: 15px">
        {{ error }}
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'A guardar...' : 'Salvar Projeto' }}
        </button>
        <RouterLink :to="{ name: 'admin-projects' }" class="submit-button cancel-button">
          Cancelar
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.admin-form-container {
  max-width: 800px;
  margin: 0 auto;
}
.admin-page-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.cancel-button {
  background-color: #f2f2f2;
  color: #333;
  text-decoration: none;
}
.cancel-button:hover {
  background-color: #e0e0e0;
}

.upload-status {
  margin-top: 10px;
  font-weight: 600;
}

.image-preview-container {
  margin-top: 15px;
}
.image-preview {
  max-width: 100%;
  height: auto;
  max-height: 250px;
  margin-top: 10px;
  border: 3px solid #000;
}
</style>