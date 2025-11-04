<script setup>
import { ref } from 'vue'

defineProps({
  currentStyle: String
})

const placeholderImg = new URL('/src/assets/images/PhotoSectionHome.png', import.meta.url)

const projects = ref([
  {
    title: 'Portfolio Website',
    description:
      'This very portfolio, built with Vue.js 3, demonstrating various UI design styles.',
    image: placeholderImg,
    tags: ['Vue.js', 'Vite', 'SCSS']
  },
  {
    title: 'E-commerce App',
    description:
      'A concept mobile app for online shopping, designed in Figma and built with React Native.',
    image: placeholderImg,
    tags: ['React Native', 'Figma', 'UI/UX']
  },
  {
    title: 'Data Analysis Tool',
    description: 'A Python-based tool for visualizing complex datasets for academic research.',
    image: placeholderImg,
    tags: ['Python', 'Data Viz']
  }
])
</script>

<template>
  <section class="section-projects section-padding">
    <h2 class="section-title">Projects</h2>
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.title" class="project-card">
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
  </section>
</template>
