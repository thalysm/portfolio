<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const API_URL = ''
const blogPosts = ref([])
const loading = ref(true)
const error = ref(null)

const currentStyle = ref('neobrutalism')

const getLoc = (obj) => {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[locale.value] || obj.pt || ''
}

onMounted(async () => {
  await fetchPosts()
})

const fetchPosts = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`${API_URL}/api/posts`)
    if (!response.ok) {
      throw new Error('Falha ao buscar posts')
    }
    blogPosts.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const getPostImageUrl = (imagePath) => {
  if (!imagePath) return ''
  return `${API_URL}${imagePath}`
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return isoString
  }
}
</script>

<template>
  <main>
    <Menu />

    <div class="section-padding blog-list-page">
      <h2 class="section-title">Blog</h2>

      <div v-if="loading" style="text-align: center">A carregar posts...</div>
      <div v-if="error" style="text-align: center; color: red">{{ error }}</div>

      <div class="blog-grid" v-if="!loading && blogPosts.length > 0">
        <RouterLink
          v-for="post in blogPosts"
          :key="post._id"
          :to="{ name: 'blog-post', params: { id: post._id } }"
          class="blog-card"
          style="text-decoration: none; color: inherit"
        >
          <img :src="getPostImageUrl(post.image)" :alt="post.title" class="blog-image" />
          <div class="blog-info">
            <span class="blog-date">{{ formatDate(post.createdAt) }}</span>
            <h3>{{ getLoc(post.title) }}</h3>
            <p>{{ getLoc(post.snippet) }}</p>
            <div class="blog-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </RouterLink>
      </div>

      <div v-if="!loading && blogPosts.length === 0" style="text-align: center">
        Nenhum post encontrado.
      </div>
    </div>

    <Footer :currentStyle="currentStyle" />
  </main>
</template>

<style scoped>
.blog-list-page {
  min-height: calc(100vh - 200px);
  padding-top: 150px;
}
</style>