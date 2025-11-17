<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from '@/components/EditorToolbar.vue' // Importamos a barra

const API_URL = ''
const route = useRoute()
const router = useRouter()

const postId = ref(route.params.id || null)

// O objeto do post (content é tratado pelo editor)
const post = ref({
  title: '',
  snippet: '',
  tags: '',
  image: ''
})

// Configuração do Tiptap
const editor = useEditor({
  content: '',
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'tiptap-editor' // Classe para estilizar o editor
    }
  }
})

// Refs de estado
const pageTitle = computed(() => (postId.value ? 'Editar Post' : 'Adicionar Novo Post'))
const isSubmitting = ref(false)
const error = ref(null)
const uploadMessage = ref('')
const imagePreview = ref(null)

// Helper para buscar o token
const getToken = () => {
  return localStorage.getItem('authToken')
}

// 1. Lógica de Upload (igual à de Projetos)
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
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
    if (!response.ok) throw new Error('Falha no upload da imagem.')

    const data = await response.json()
    post.value.image = data.url
    uploadMessage.value = 'Imagem carregada com sucesso!'
  } catch (err) {
    error.value = err.message
    imagePreview.value = null
  }
}

// 2. Carregar dados do post (se estiver a editar)
onMounted(async () => {
  if (postId.value) {
    try {
      const response = await fetch(`${API_URL}/api/posts/${postId.value}`)
      if (!response.ok) throw new Error('Post não encontrado')

      const data = await response.json()
      post.value.title = data.title
      post.value.snippet = data.snippet
      post.value.tags = data.tags.join(', ')
      post.value.image = data.image
      imagePreview.value = `${API_URL}${data.image}`
      
      // Define o conteúdo do editor Tiptap
      if (editor.value) {
        editor.value.commands.setContent(data.content)
      }
    } catch (err) {
      error.value = err.message
    }
  }
})

// 3. Submeter o formulário (Criar ou Atualizar)
const handleSubmit = async () => {
  if (!post.value.image) {
    error.value = 'Por favor, faça primeiro o upload de uma imagem.'
    return
  }

  const htmlContent = editor.value.getHTML()
  if (htmlContent === '<p></p>' || !htmlContent) {
     error.value = 'O campo "Conteúdo" não pode estar vazio.'
     return
  }

  isSubmitting.value = true
  error.value = null
  const token = getToken()

  try {
    const isEditMode = !!postId.value
    const url = isEditMode ? `${API_URL}/api/posts/${postId.value}` : `${API_URL}/api/posts`
    const method = isEditMode ? 'PUT' : 'POST'

    const payload = {
      ...post.value,
      content: htmlContent, // Adiciona o conteúdo do editor
      tags: post.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Falha ao salvar o post.')
    }

    router.push({ name: 'admin-posts' })
  } catch (err) {
    error.value = err.message
  } finally {
    isSubmitting.value = false
  }
}

// 4. Limpar o editor Tiptap ao sair
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<template>
  <div class="admin-form-container">
    <h1 class="admin-page-title">{{ pageTitle }}</h1>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Título do Post</label>
        <input type="text" id="title" class="form-input" v-model="post.title" required />
      </div>

      <div class="form-group">
        <label for="snippet">Snippet (Resumo para o card)</label>
        <input
          type="text"
          id="snippet"
          class="form-input"
          v-model="post.snippet"
          required
          maxlength="200"
        />
      </div>

      <div class="form-group">
        <label for="content">Conteúdo</label>
        <EditorToolbar :editor="editor" />
        <EditorContent :editor="editor" />
        </div>

      <div class="form-group">
        <label for="tags">Tags (separadas por vírgula)</label>
        <input type="text" id="tags" class="form-input" v-model="post.tags" />
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
          {{ isSubmitting ? 'A guardar...' : 'Salvar Post' }}
        </button>
        <RouterLink :to="{ name: 'admin-posts' }" class="submit-button cancel-button">
          Cancelar
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<style>
/* Estilos GLOBAIS para o Tiptap (sem 'scoped') */
/* Para que o estilo Neobrutalism seja aplicado */

.tiptap-editor {
  /* Reutiliza o estilo do .form-textarea */
  border: 3px solid black;
  background-color: #f2f2f2;
  box-shadow: 5px 5px 0px 0px #1f1f1f;
  padding: 12px 15px;
  min-height: 250px;
  outline: none;
}

.tiptap-editor:focus {
  /* Poderíamos adicionar um outline de foco se quiséssemos */
}

/* Estilos de conteúdo do Tiptap */
.tiptap-editor > .ProseMirror {
  min-height: 250px;
}
.tiptap-editor > .ProseMirror h1 {
  font-size: 2.5em;
  font-weight: 700;
  margin-bottom: 1rem;
}
.tiptap-editor > .ProseMirror h2 {
  font-size: 2em;
  font-weight: 700;
  margin-bottom: 0.8rem;
}
.tiptap-editor > .ProseMirror p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}
.tiptap-editor > .ProseMirror ul,
.tiptap-editor > .ProseMirror ol {
  padding-left: 25px;
  margin-bottom: 0.8rem;
}
.tiptap-editor > .ProseMirror blockquote {
  border-left: 3px solid #000;
  padding-left: 1rem;
  font-style: italic;
  margin-left: 0.5rem;
}
.tiptap-editor > .ProseMirror hr {
  border: none;
  border-top: 3px solid #000;
  margin: 1rem 0;
}
</style>

<style scoped>
/* Estilos locais (scoped) */
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