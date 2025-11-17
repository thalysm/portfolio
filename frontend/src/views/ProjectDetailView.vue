<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'

const { t, locale } = useI18n()
const API_URL = '' // Se estiver usando proxy no vite, pode deixar vazio ou ajustar conforme env
const route = useRoute()
const project = ref(null)
const loading = ref(true)
const error = ref(null)

// Prop simulada para manter compatibilidade com o layout
const currentStyle = ref('neobrutalism')

const localizedProject = computed(() => {
  if (!project.value) return null
  const get = (field) => (typeof field === 'object' ? (field[locale.value] || field.pt || '') : field)
  
  return {
    ...project.value,
    title: get(project.value.title),
    description: get(project.value.description),
    category: project.value.category // Assumindo que category pode ser populada ou não, mas aqui focamos no texto
  }
})

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/api/projects/${route.params.id}`)
    if (!res.ok) throw new Error('Projeto não encontrado')
    project.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <Menu />

    <div class="project-view-page section-padding">
      <div v-if="loading" style="text-align: center">Carregando...</div>
      <div v-if="error" style="text-align: center; color: red">{{ error }}</div>

      <article v-if="localizedProject" class="project-container">
        <h1 class="project-title">{{ localizedProject.title }}</h1>
        
        <img 
          v-if="localizedProject.image" 
          :src="`${API_URL}${localizedProject.image}`" 
          :alt="localizedProject.title" 
          class="project-image" 
        />

        <div class="project-tags">
          <span v-for="tag in localizedProject.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <p class="project-description">{{ localizedProject.description }}</p>

        <div class="project-link-container" v-if="localizedProject.projectLink">
          <a 
            :href="localizedProject.projectLink" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="submit-button"
            style="text-decoration: none; display: inline-block;"
          >
            {{ t('viewProject') }}
          </a>
        </div>
      </article>

      <div class="back-link-container">
        <RouterLink to="/#projects" class="submit-button cancel-button">
          {{ t('back') }}
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
  margin-bottom: 20px;
  line-height: 1.2;
}

.project-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  margin-bottom: 30px;
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
  white-space: pre-wrap;
}

.project-link-container {
  margin-top: 30px;
}

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