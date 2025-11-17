<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'

const { t, locale } = useI18n()
const API_URL = ''
const route = useRoute()
const post = ref(null)
const loading = ref(true)
const error = ref(null)

const currentStyle = ref('neobrutalism')

const localizedPost = computed(() => {
  if (!post.value) return null
  const get = (field) => (typeof field === 'object' ? (field[locale.value] || field.pt || '') : field)
  
  return {
    ...post.value,
    title: get(post.value.title),
    content: get(post.value.content)
  }
})

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/api/posts/${route.params.id}`)
    if (!res.ok) throw new Error('Post não encontrado')
    post.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const formatDate = (isoString) => {
  if (!isoString) return ''
  try {
    return new Date(isoString).toLocaleDateString(locale.value, {
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
      <div v-if="loading" style="text-align: center">Carregando...</div>
      <div v-if="error" style="text-align: center; color: red">{{ error }}</div>

      <article v-if="localizedPost" class="post-container">
        <h1 class="post-title">{{ localizedPost.title }}</h1>
        <span class="post-date">{{ formatDate(localizedPost.createdAt) }}</span>

        <img
          v-if="localizedPost.image"
          :src="`${API_URL}${localizedPost.image}`"
          :alt="localizedPost.title"
          class="post-image"
        />

        <div class="ProseMirror" v-html="localizedPost.content"></div>

        <div class="blog-tags">
          <span v-for="tag in localizedPost.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </article>

      <div class="back-link-container">
        <RouterLink to="/blog" class="submit-button cancel-button">
          {{ t('back') }}
        </RouterLink>
      </div>
    </div>

    <Footer :currentStyle="currentStyle" />
  </main>
</template>

<style>
/* Estilos globais para o conteúdo do Tiptap (v-html) */
.ProseMirror {
  outline: none;
  color: inherit;
}
.ProseMirror h1 { font-size: 2.5em; font-weight: 700; margin: 1.5rem 0 1rem 0; }
.ProseMirror h2 { font-size: 2em; font-weight: 700; margin: 1.2rem 0 0.8rem 0; }
.ProseMirror p { font-size: 16px; line-height: 1.6; margin-bottom: 0.8rem; }
.ProseMirror ul, .ProseMirror ol { padding-left: 25px; margin-bottom: 0.8rem; }
.ProseMirror blockquote { border-left: 3px solid #000; padding-left: 1rem; font-style: italic; margin: 1rem 0; }
.ProseMirror hr { border: none; border-top: 3px solid #000; margin: 1.5rem 0; }
</style>

<style scoped>
.post-view-page {
  padding-top: 150px;
  padding-bottom: 80px;
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
}

.post-title {
  font-size: 48px;
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
  border: 3px solid #000; /* Estilo padrão, temas sobrescrevem se necessário */
  border-radius: 8px;
}

.blog-tags {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.back-link-container {
  max-width: 800px;
  margin: 40px auto 0 auto;
}

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