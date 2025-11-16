<script setup>
import { ref, computed } from 'vue'

defineProps({
  currentStyle: String
})

const placeholderImg = new URL('/src/assets/images/PhotoSectionHome.png', import.meta.url)

const categories = ref(['All', 'Web Development', 'Application', 'Web Design'])
const selectedCategory = ref('All')

const currentPage = ref(1)
const itemsPerPage = ref(6)

const allProjects = ref([
  {
    title: 'Portfolio Website',
    description:
      'This very portfolio, built with Vue.js 3, demonstrating various UI design styles.',
    image: placeholderImg,
    tags: ['Vue.js', 'Vite', 'SCSS'],
    category: 'Web Development'
  },
  {
    title: 'E-commerce App',
    description:
      'A concept mobile app for online shopping, designed in Figma and built with React Native.',
    image: placeholderImg,
    tags: ['React Native', 'Figma', 'UI/UX'],
    category: 'Application'
  },
  {
    title: 'Data Analysis Tool',
    description: 'A Python-based tool for visualizing complex datasets for academic research.',
    image: placeholderImg,
    tags: ['Python', 'Data Viz'],
    category: 'Web Development'
  },
  {
    title: 'UI/UX Redesign Agency',
    description: 'A complete redesign concept for a digital agency, focusing on modern UI trends.',
    image: placeholderImg,
    tags: ['Figma', 'Adobe XD', 'UI/UX'],
    category: 'Web Design'
  },
  {
    title: 'Fitness Tracker Mobile',
    description: 'Mobile application to track workouts and nutrition, built using Flutter.',
    image: placeholderImg,
    tags: ['Flutter', 'Firebase', 'Mobile'],
    category: 'Application'
  },
  {
    title: 'Dynamic Blog Platform',
    description: 'A full-stack blog platform developed with Vue.js and a Node.js backend.',
    image: placeholderImg,
    tags: ['Vue.js', 'Node.js', 'Full-Stack'],
    category: 'Web Development'
  }
])

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
        <div v-for="project in paginatedProjects" :key="project.title" class="project-card">
          <img :src="project.image" :alt="project.title" class="project-image" />
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination-controls">
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
