<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'

const API_URL = ''
const route = useRoute()

const project = ref(null)
const loading = ref(true)
const error = ref(null)

const currentStyle = ref('neobrutalism')

onMounted(async () => {
  await fetchProject()
})

const fetchProject = async () => {
  loading.value = true
  error.value = null
  try {
    const projectId = route.params.id
    const response = await fetch(`${API_URL}/api/projects/${projectId}`)
    if (!response.ok) {
      throw new Error('Projeto não encontrado')
    }
    project.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const getProjectImageUrl = (imagePath) => {
  if (!imagePath) return ''
  return `${API_URL}${imagePath}`
}
</script>

<template>
  <main>
    <Menu />

    <div class="project-view-page section-padding">
      <div v-if="loading" style="text-align: center">A carregar projeto...</div>
      <div v-if="error" style="text-align: center; color: red">{{ error }}</div>

      <article v-if="project" class="project-container">
        <h1 class="project-title">{{ project.title }}</h1>
        <span class="project-category">{{ project.category }}</span>

        <img
          :src="getProjectImageUrl(project.image)"
          :alt="project.title"
          class="project-image"
        />

        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <div class="project-description">
          <p v-for="(paragraph, index) in project.description.split('\n')" :key="index">
            {{ paragraph }}
          </p>
        </div>

        <div class="project-link-container">
          <a
            v-if="project.projectLink"
            :href="project.projectLink"
            target="_blank"
            rel="noopener noreferrer"
            class="submit-button"
          >
            Ver Projeto
          </a>
        </div>

      </article>

      <div class="back-link-container">
        <RouterLink to="/#projects" class="submit-button cancel-button">
          &larr; Voltar
        </RouterLink>
      </div>
    </div>

    <Footer :currentStyle="currentStyle" />
  </main>
</template>

<style scoped>
.project-view-page {
  padding-top: 150px;
  padding-bottom: 80px;
}

.project-container {
  max-width: 900px;
  margin: 0 auto;
}

.project-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 5px;
  line-height: 1.2;
}

.project-category {
  font-size: 18px;
  color: #5093fe;
  font-weight: 600;
  margin-bottom: 25px;
  display: block;
}

.project-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  margin-bottom: 20px;
  border: 3px solid #000;
  box-shadow: 5px 5px 0px 0px #1f1f1f;
  border-radius: 8px;
}

.project-tags {
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-description {
  font-size: 16px;
  line-height: 1.7;
  color: #333;
}

.project-description p {
  margin-bottom: 1em;
}

/* --- ESTILOS ADICIONADOS --- */
.project-link-container {
  margin-top: 30px;
}
.project-link-container .submit-button {
  text-decoration: none;
  display: inline-block;
}
/* --- FIM DA ADIÇÃO --- */

.back-link-container {
  max-width: 900px;
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