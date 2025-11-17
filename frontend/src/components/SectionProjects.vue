<script setup>
import { ref, computed, onMounted } from 'vue'

defineProps({
  currentStyle: String
})

const API_URL = ''

const categories = ref(['All', 'Web Development', 'Application', 'Web Design'])
const selectedCategory = ref('All')

const currentPage = ref(1)
const itemsPerPage = ref(6)

const allProjects = ref([])

onMounted(async () => {
  await fetchProjects()
})

const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/api/projects`)
    if (!response.ok) {
      throw new Error('Falha ao buscar projetos')
    }
    allProjects.value = await response.json()
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    allProjects.value = []
  }
}

const getProjectImageUrl = (imagePath) => {
  if (!imagePath) {
    return ''
  }
  return `${API_URL}${imagePath}`
}

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return allProjects.value
  }
  return allProjects.value.filter((project) => project.category === selectedCategory.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage.value)
})

const paginatedProjects = computed(() => {
  if (totalPages.value > 0 && currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }

  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProjects.value.slice(start, end)
})

function setCategory(category) {
  selectedCategory.value = category
  currentPage.value = 1
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<template>
  <section class="section-projects">
    <div class="section-padding">
      <h2 class="section-title">Projects</h2>

      <div class="projects-filter">
        <button
          v-for="category in categories"
          :key="category"
          @click="setCategory(category)"
          class="filter-button"
          :class="{ active: selectedCategory === category }"
        >
          {{ category }}
        </button>
      </div>

      <div class="projects-grid">
        <div v-for="project in paginatedProjects" :key="project._id" class="project-card">
          <img
            :src="getProjectImageUrl(project.image)"
            :alt="project.title"
            class="project-image"
          />
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            
            
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <a 
              v-if="project.projectLink"
              :href="project.projectLink"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link-button submit-button"
            >
              Ver Projeto
            </a>
          </div>
        </div>
      </div>

      <div v-if="paginatedProjects.length === 0" class="no-projects-message" style="text-align: center; margin-top: 20px;">
        <p>Nenhum projeto encontrado.</p>
      </div>

      <div class="pagination-controls" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">
          Prev
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="pagination-button"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-link-button {
  display: inline-block;
  text-decoration: none;
  text-align: center;
  margin-top: 15px; /* Espaço entre a descrição e o botão */
}
</style>