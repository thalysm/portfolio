<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({ currentStyle: String })

const { t, locale } = useI18n()
const API_URL = ''

const categories = ref([])
const selectedCategory = ref('All')
const currentPage = ref(1)
const itemsPerPage = ref(6)
const allProjects = ref([])

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

onMounted(async () => {
  await fetchCategories()
  await fetchProjects()
})

const getProjectImageUrl = (path) => path ? `${API_URL}${path}` : ''

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return allProjects.value
  // Filtra comparando o ID da categoria
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

      <div class="projects-grid">
        <div v-for="project in paginatedProjects" :key="project._id" class="project-card">
          <img :src="getProjectImageUrl(project.image)" :alt="getLoc(project.title)" class="project-image" />
          <div class="project-info">
            <h3>{{ getLoc(project.title) }}</h3>
            <p>{{ getLoc(project.description) }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <a v-if="project.projectLink" :href="project.projectLink" target="_blank" class="submit-button" style="text-decoration:none; text-align:center; margin-top:10px; display:block;">{{ t('viewProject') }}</a>
            <RouterLink :to="{name: 'project-detail', params: {id: project._id}}" class="submit-button" style="text-decoration:none; text-align:center; margin-top:10px; display:block;">{{ t('details') }}</RouterLink>
          </div>
        </div>
      </div>

      <div class="pagination-controls" v-if="totalPages > 1">
        <button @click="currentPage--" :disabled="currentPage === 1" class="pagination-button">{{ t('prev') }}</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages" class="pagination-button">{{ t('next') }}</button>
      </div>
    </div>
  </section>
</template>