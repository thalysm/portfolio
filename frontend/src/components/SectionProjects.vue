<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({ currentStyle: String })

const { t, locale } = useI18n()
const API_URL = ''

const categories = ref([])
const selectedCategory = ref('All')
const currentPage = ref(1)
const itemsPerPage = ref(6)
const allProjects = ref([])

// Carousel State
const scrollContainer = ref(null)
const activeIndex = ref(0)
const autoPlayInterval = ref(null)
const isMobile = ref(false)

// Helper para pegar texto traduzido de objeto
const getLoc = (obj) => obj ? (obj[locale.value] || obj.pt || obj) : ''

const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/api/categories`)
    if (res.ok) categories.value = await res.json()
  } catch (e) { console.error(e) }
}

const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_URL}/api/projects`)
    if (res.ok) allProjects.value = await res.json()
  } catch (e) { console.error(e) }
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const scrollToIndex = (index) => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  // Assuming cards are consistent width
  const card = container.querySelector('.project-card')
  if (!card) return
  
  const cardWidth = card.offsetWidth
  const gap = 20 // CSS gap
  
  const targetX = index * (cardWidth + gap)
  
  container.scrollTo({
    left: targetX,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  const card = container.querySelector('.project-card')
  if (!card) return
  
  const cardWidth = card.offsetWidth
  const gap = 20
  const scrollX = container.scrollLeft
  
  // Simple approximation
  const index = Math.round(scrollX / (cardWidth + gap))
  if (index !== activeIndex.value && index >= 0 && index < paginatedProjects.value.length) {
    activeIndex.value = index
  }
}

const startAutoPlay = () => {
  if (!isMobile.value) return
  pauseAutoPlay()
  autoPlayInterval.value = setInterval(() => {
    let nextIndex = activeIndex.value + 1
    if (nextIndex >= paginatedProjects.value.length) nextIndex = 0
    scrollToIndex(nextIndex)
  }, 4000) // 4 seconds slide
}

const pauseAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// Lifecycle
onMounted(async () => {
  await fetchCategories()
  await fetchProjects()
  checkMobile()
  window.addEventListener('resize', checkMobile)
  // Slight delay to ensure DOM is ready for calculations if needed
  setTimeout(startAutoPlay, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  pauseAutoPlay()
})

const getProjectImageUrl = (path) => path ? `${API_URL}${path}` : ''

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return allProjects.value
  return allProjects.value.filter(p => {
    const catId = typeof p.category === 'object' ? p.category._id : p.category
    return catId === selectedCategory.value
  })
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredProjects.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage.value))
</script>

<template>
  <section class="section-projects">
    <div class="section-padding">
      <h2 class="section-title">{{ t('projects') }}</h2>

      <div class="projects-filter">
        <button 
          class="filter-button" 
          :class="{ active: selectedCategory === 'All' }"
          @click="selectedCategory = 'All'; currentPage = 1"
        >
          {{ t('all') }}
        </button>
        <button
          v-for="cat in categories"
          :key="cat._id"
          @click="selectedCategory = cat._id; currentPage = 1"
          class="filter-button"
          :class="{ active: selectedCategory === cat._id }"
        >
          {{ getLoc(cat.name) }}
        </button>
      </div>

      <div 
        class="projects-grid" 
        ref="scrollContainer" 
        @scroll="handleScroll"
        @touchstart="pauseAutoPlay"
        @touchend="startAutoPlay"
        @mouseenter="pauseAutoPlay"
        @mouseleave="startAutoPlay"
      >
        <div v-for="project in paginatedProjects" :key="project._id" class="project-card">
          <img :src="getProjectImageUrl(project.image)" :alt="getLoc(project.title)" class="project-image" />
          <div class="project-info">
            <h3>{{ getLoc(project.title) }}</h3>
            <p>{{ getLoc(project.description) }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <a v-if="project.projectLink" :href="project.projectLink" target="_blank" class="submit-button" style="text-decoration:none; text-align:center; margin-top:10px; display:block;">{{ t('viewProject') }}</a>
          </div>
        </div>
      </div>

      <!-- Carousel Dots -->
      <div class="carousel-dots" v-if="paginatedProjects.length > 1">
        <span 
          v-for="(project, index) in paginatedProjects" 
          :key="index"
          class="dot"
          :class="{ active: activeIndex === index }"
          @click="scrollToIndex(index)"
        ></span>
      </div>

      <div class="pagination-controls" v-if="totalPages > 1 && !isMobile">
        <button @click="currentPage--" :disabled="currentPage === 1" class="pagination-button">{{ t('prev') }}</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages" class="pagination-button">{{ t('next') }}</button>
      </div>
    </div>
  </section>
</template>