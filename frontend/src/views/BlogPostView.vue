<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'

const API_URL = ''
const route = useRoute()

const post = ref(null)
const loading = ref(true)
const error = ref(null)

// Prop simulada para Menu e Footer
const currentStyle = ref('neobrutalism')

onMounted(async () => {
  await fetchPost()
})

const fetchPost = async () => {
  loading.value = true
  error.value = null
  try {
    const postId = route.params.id
    const response = await fetch(`${API_URL}/api/posts/${postId}`)
    if (!response.ok) {
      throw new Error('Post não encontrado')
    }
    post.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Helper para construir a URL da imagem
const getPostImageUrl = (imagePath) => {
  if (!imagePath) return ''
  return `${API_URL}${imagePath}`
}

// Helper para formatar a data
const formatDate = (isoString) => {
  if (!isoString) return ''
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (e) {
    return isoString
  }
}
</script>

<template>
  <main>
    <Menu />

    <div class="post-view-page section-padding">
      <div v-if="loading" style="text-align: center">A carregar post...</div>
      <div v-if="error" style="text-align: center; color: red">{{ error }}</div>

      <article v-if="post" class="post-container">
        <h1 class="post-title">{{ post.title }}</h1>
        <span class="post-date">{{ formatDate(post.createdAt) }}</span>

        <img
          :src="getPostImageUrl(post.image)"
          :alt="post.title"
          class="post-image"
        />

        <div class="ProseMirror" v-html="post.content"></div>

        <div class="blog-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </article>

      <div class="back-link-container">
        <RouterLink to="/blog" class="submit-button cancel-button">
          &larr; Voltar para o Blog
        </RouterLink>
      </div>
    </div>

    <Footer :currentStyle="currentStyle" />
  </main>
</template>

<style>
/* ESTILOS GLOBAIS (sem 'scoped')
  Necessários para estilizar o conteúdo v-html do Tiptap.
  Copiado do AdminPostForm.vue
*/
.ProseMirror {
  outline: none;
}

.ProseMirror h1 {
  font-size: 2.5em !important; /* Usamos !important para garantir a sobreposição */
  font-weight: 700;
  margin: 1.5rem 0 1rem 0;
}
.ProseMirror h2 {
  font-size: 2em !important;
  font-weight: 700;
  margin: 1.2rem 0 0.8rem 0;
}
.ProseMirror p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}
.ProseMirror ul,
.ProseMirror ol {
  padding-left: 25px;
  margin-bottom: 0.8rem;
}
.ProseMirror blockquote {
  border-left: 3px solid #000;
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0 1rem 0.5rem;
}
.ProseMirror hr {
  border: none;
  border-top: 3px solid #000;
  margin: 1.5rem 0;
}
</style>

<style scoped>
/* Estilos locais (scoped) */
.post-view-page {
  padding-top: 150px; /* Ajuste para compensar o menu fixo */
  padding-bottom: 80px;
}

.post-container {
  max-width: 800px; /* Largura de leitura confortável */
  margin: 0 auto;
}

.post-title {
  font-size: 48px; /* Título principal grande */
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.2;
}

.post-date {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  display: block;
}

.post-image {
  width: 100%;
  height: auto;
  max-height: 450px;
  object-fit: cover;
  margin-bottom: 30px;
}

.blog-tags {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* O estilo .tag já é global */

.back-link-container {
  max-width: 800px;
  margin: 40px auto 0 auto;
}

/* Botão de voltar (reutiliza .submit-button) */
.cancel-button {
  background-color: #f2f2f2;
  color: #333;
  text-decoration: none;
  display: inline-block;
}
.cancel-button:hover {
  background-color: #e0e0e0;
}
</style>