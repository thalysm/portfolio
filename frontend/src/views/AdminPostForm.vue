<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from '@/components/EditorToolbar.vue'

const API_URL = ''
const route = useRoute()
const router = useRouter()
const postId = ref(route.params.id || null)

const currentTab = ref('pt')

const post = ref({
  title: { pt: '', en: '' },
  snippet: { pt: '', en: '' },
  tags: '',
  image: ''
})

const isSubmitting = ref(false)
const imagePreview = ref(null)

// Configuração dos Editores
const editorPt = useEditor({
  content: '',
  extensions: [StarterKit],
  editorProps: { attributes: { class: 'tiptap-editor' } }
})

const editorEn = useEditor({
  content: '',
  extensions: [StarterKit],
  editorProps: { attributes: { class: 'tiptap-editor' } }
})

const getToken = () => localStorage.getItem('authToken')

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('image', file)
  
  try {
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    })
    const data = await res.json()
    post.value.image = data.url
    imagePreview.value = `${API_URL}${data.url}`
  } catch (err) {
    alert('Erro no upload da imagem')
  }
}

onMounted(async () => {
  if (postId.value) {
    try {
      const res = await fetch(`${API_URL}/api/posts/${postId.value}`)
      if (res.ok) {
        const data = await res.json()
        
        const safeTitle = typeof data.title === 'object' ? data.title : { pt: data.title, en: '' }
        const safeSnippet = typeof data.snippet === 'object' ? data.snippet : { pt: data.snippet, en: '' }
        const safeContent = typeof data.content === 'object' ? data.content : { pt: data.content, en: '' }

        post.value = {
          ...data,
          title: safeTitle,
          snippet: safeSnippet,
          tags: data.tags.join(', ')
        }
        imagePreview.value = `${API_URL}${data.image}`
        
        if (editorPt.value) editorPt.value.commands.setContent(safeContent.pt)
        if (editorEn.value) editorEn.value.commands.setContent(safeContent.en)
      }
    } catch (err) {
      console.error(err)
    }
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  const token = getToken()
  const url = postId.value ? `${API_URL}/api/posts/${postId.value}` : `${API_URL}/api/posts`
  const method = postId.value ? 'PUT' : 'POST'

  const payload = {
    ...post.value,
    content: {
      pt: editorPt.value.getHTML(),
      en: editorEn.value.getHTML()
    },
    tags: post.value.tags.split(',').map(t => t.trim())
  }

  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    })
    router.push({ name: 'admin-posts' })
  } catch (err) {
    alert('Erro ao salvar post')
  } finally {
    isSubmitting.value = false
  }
}

onBeforeUnmount(() => {
  if (editorPt.value) editorPt.value.destroy()
  if (editorEn.value) editorEn.value.destroy()
})
</script>

<template>
  <div class="admin-form-container">
    <h1 class="admin-page-title">{{ postId ? 'Editar' : 'Novo' }} Post</h1>

    <div class="language-tabs">
      <button type="button" :class="{ active: currentTab === 'pt' }" @click="currentTab = 'pt'">Português</button>
      <button type="button" :class="{ active: currentTab === 'en' }" @click="currentTab = 'en'">English</button>
    </div>

    <form class="contact-form" @submit.prevent="handleSubmit">
      
      <div v-show="currentTab === 'pt'">
        <div class="form-group">
          <label>Título (PT)</label>
          <input v-model="post.title.pt" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Snippet (PT)</label>
          <input v-model="post.snippet.pt" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Conteúdo (PT)</label>
          <EditorToolbar :editor="editorPt" />
          <EditorContent :editor="editorPt" />
        </div>
      </div>

      <div v-show="currentTab === 'en'">
        <div class="form-group">
          <label>Título (EN)</label>
          <input v-model="post.title.en" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Snippet (EN)</label>
          <input v-model="post.snippet.en" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Conteúdo (EN)</label>
          <EditorToolbar :editor="editorEn" />
          <EditorContent :editor="editorEn" />
        </div>
      </div>

      <hr style="margin: 30px 0; border: 1px solid #ccc;">

      <div class="form-group">
        <label>Tags</label>
        <input v-model="post.tags" class="form-input" />
      </div>
      <div class="form-group">
        <label>Imagem</label>
        <input type="file" @change="handleImageUpload" class="form-input" />
        <img v-if="imagePreview" :src="imagePreview" style="max-width: 200px; margin-top: 10px; border: 3px solid #000;" />
      </div>

      <button type="submit" class="submit-button" :disabled="isSubmitting">Salvar</button>
    </form>
  </div>
</template>

<style>
/* ESTILOS GLOBAIS DO TIPTAP (Restaurados) */
.tiptap-editor {
  border: 3px solid black;
  background-color: #f2f2f2;
  box-shadow: 5px 5px 0px 0px #1f1f1f;
  padding: 15px;
  min-height: 300px;
  outline: none;
}

.tiptap-editor .ProseMirror {
  min-height: 250px;
  outline: none;
}

.tiptap-editor .ProseMirror h1 {
  font-size: 2.5em;
  font-weight: 700;
  margin: 1rem 0;
  line-height: 1.2;
}
.tiptap-editor .ProseMirror h2 {
  font-size: 2em;
  font-weight: 700;
  margin: 1rem 0;
}
.tiptap-editor .ProseMirror p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}
.tiptap-editor .ProseMirror ul,
.tiptap-editor .ProseMirror ol {
  padding-left: 25px;
  margin-bottom: 10px;
}
.tiptap-editor .ProseMirror blockquote {
  border-left: 4px solid #000;
  padding-left: 15px;
  font-style: italic;
  margin: 15px 0;
  background: #e0e0e0;
  padding: 10px;
}
.tiptap-editor .ProseMirror hr {
  border: none;
  border-top: 3px solid #000;
  margin: 20px 0;
}
</style>

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
  padding: 12px;
  cursor: pointer;
  background: #fff;
  border: 3px solid #000;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.2s;
}
.language-tabs button.active {
  background: #5093fe;
  color: #fff;
  box-shadow: 5px 5px 0 0 #1f1f1f;
}
</style>