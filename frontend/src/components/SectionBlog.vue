<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineProps({
  currentStyle: String
})

const { t, locale } = useI18n()
const API_URL = ''

const blogPosts = ref([])

// Carousel State
const scrollContainer = ref(null)
const activeIndex = ref(0)
const autoPlayInterval = ref(null)
const isMobile = ref(false)

// Helper para pegar o texto traduzido (se for objeto) ou a string (se for antigo)
const getLoc = (obj) => {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[locale.value] || obj.pt || ''
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const scrollToIndex = (index) => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  const card = container.querySelector('.blog-card')
  if (!card) return
  
  const cardWidth = card.offsetWidth
  const gap = 20
  const targetX = index * (cardWidth + gap)
  
  container.scrollTo({
    left: targetX,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  const card = container.querySelector('.blog-card')
  if (!card) return
  
  const cardWidth = card.offsetWidth
  const gap = 20
  const scrollX = container.scrollLeft
  
  const index = Math.round(scrollX / (cardWidth + gap))
  if (index !== activeIndex.value && index >= 0 && index < blogPosts.value.length) {
    activeIndex.value = index
  }
}

const startAutoPlay = () => {
  if (!isMobile.value) return
  pauseAutoPlay()
  autoPlayInterval.value = setInterval(() => {
    let nextIndex = activeIndex.value + 1
    if (nextIndex >= blogPosts.value.length) nextIndex = 0
    scrollToIndex(nextIndex)
  }, 4000)
}

const pauseAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

onMounted(async () => {
  await fetchPosts()
  checkMobile()
  window.addEventListener('resize', checkMobile)
  setTimeout(startAutoPlay, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  pauseAutoPlay()
})

const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/posts?limit=3`)
    if (!response.ok) {
      throw new Error('Falha ao buscar posts')
    }
    blogPosts.value = await response.json()
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    blogPosts.value = []
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
  <section class="section-blog">
    <div class="section-padding">
      <h2 class="section-title">{{ t('blog') }}</h2>
      <div 
        class="blog-grid" 
        ref="scrollContainer"
        @scroll="handleScroll"
        @touchstart="pauseAutoPlay"
        @touchend="startAutoPlay"
        @mouseenter="pauseAutoPlay"
        @mouseleave="startAutoPlay"
      >
        <RouterLink
          v-for="post in blogPosts"
          :key="post._id"
          :to="{ name: 'blog-post', params: { id: post._id } }"
          class="blog-card"
          style="text-decoration: none"
        >
          <img :src="getPostImageUrl(post.image)" :alt="getLoc(post.title)" class="blog-image" />
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

      <!-- Carousel Dots -->
      <div class="carousel-dots" v-if="blogPosts.length > 1">
        <span 
          v-for="(post, index) in blogPosts" 
          :key="index"
          class="dot"
          :class="{ active: activeIndex === index }"
          @click="scrollToIndex(index)"
        ></span>
      </div>

      <div v-if="blogPosts.length === 0" style="text-align: center; margin-top: 20px">
        <p>Nenhum post encontrado.</p>
      </div>

      <div style="text-align: center; margin-top: 40px">
        <RouterLink
          :to="{ name: 'blog-list' }"
          class="submit-button"
          style="text-decoration: none"
        >
          {{ t('viewMore') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>