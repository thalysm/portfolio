
<script setup>
import { ref, onMounted, computed } from 'vue'
import { apiFetch } from '@/utils/api'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  currentStyle: String
})

const { t } = useI18n()
const data = ref(null)
const loading = ref(true)

const flags = {
  it: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/635a09df9323279d39934a991edd4510.svg',
  en: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/bbe17e16aa4a106032d8e3521eaed13e.svg',
  pt: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/27d253ae1272917fc9f4a79459aacd53.svg'
}

onMounted(async () => {
  try {
    const res = await apiFetch('/duolingo')
    if (res.ok) {
      data.value = await res.json()
    }
  } catch (e) {
    console.error('Failed to fetch Duolingo data', e)
  } finally {
    loading.value = false
  }
})

const avatarUrl = computed(() => {
  if (!data.value) return ''
  let url = data.value.picture
  if (url.startsWith('//')) {
    url = 'https:' + url
  }
  // Adiciona /medium se não tiver e se for url do duolingo
  if (url.includes('duolingo.com') && !url.endsWith('/medium')) {
    url += '/medium'
  }
  return url
})

const cardClass = computed(() => {
  return props.currentStyle ? props.currentStyle.toLowerCase() : 'neobrutalism'
})

const getCourseTitle = (course) => {
  const code = course.learningLanguage
  const key = `lang_${code}`
  const translation = t(key)
  return translation !== key ? translation : course.title
}
</script>

<template>
  <section class="section-duolingo" :class="currentStyle">
    <div class="section-padding">
      <h2 class="section-title">{{ t('languages') }}</h2>

      <div v-if="loading" style="text-align: center;">Loading...</div>
      
      <div v-else-if="data" class="duolingo-wrapper">
         <div class="duolingo-card" :class="cardClass">
            
            <!-- Header: Avatar + Info -->
            <div class="card-header">
               <div class="avatar-container">
                 <img :src="avatarUrl" class="avatar" alt="Avatar" />
                 <div class="status-indicator"></div>
               </div>
               
               <div class="user-details">
                 <h3>{{ data.name }}</h3>
                 <a :href="`https://www.duolingo.com/profile/${data.username}`" target="_blank" class="username">@{{ data.username }}</a>
               </div>

               <!-- Streaks & XP (Top Right or integrated) -->
               <div class="top-stats">
                  <div class="stat-badge streak">
                     <span class="icon">🔥</span>
                     <span class="value">{{ data.streak }}</span>
                     <span class="streak-label" style="margin-left:5px; font-weight:normal;">{{ t('streakDays') }}</span>
                  </div>
               </div>
            </div>

            <div class="card-body">
               <!-- XP Stat highlight -->
               <div class="xp-container">
                  <span class="xp-label">{{ t('totalXp') }}</span>
                  <span class="xp-value">{{ data.totalXp.toLocaleString() }}</span>
               </div>

               <div class="divider"></div>

               <div class="courses-grid">
                  <div v-for="course in data.courses" :key="course.id" class="course-pill">
                    <div class="flag-circle">
                      <img v-if="flags[course.learningLanguage]" :src="flags[course.learningLanguage]" :alt="course.title" />
                      <span v-else>{{ course.learningLanguage }}</span>
                    </div>
                    <div class="course-data">
                      <span class="lang-title">{{ getCourseTitle(course) }}</span>
                      <span class="lang-xp">{{ course.xp }} XP</span>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.duolingo-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.duolingo-card {
  width: 100%;
  max-width: 800px;
  padding: 25px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

/* --- Layout Internals --- */
.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  position: relative;
}

.avatar-container {
  position: relative;
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.user-details {
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
  }
  .username {
    font-size: 14px;
    opacity: 0.7;
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
      opacity: 1;
    }
  }
}

.top-stats {
  margin-left: auto;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: 700;
  
  &.streak {
    color: #ff9600;
    background: rgba(255, 150, 0, 0.1);
  }
}

.xp-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 10px;
  
  .xp-label {
    font-size: 14px;
    font-weight: 600;
    opacity: 0.8;
  }
  .xp-value {
    font-size: 18px;
    font-weight: 800;
  }
}

.divider {
  height: 1px;
  width: 100%;
  margin-bottom: 20px;
  opacity: 0.2;
  background-color: currentColor;
}

.courses-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.course-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 12px;
  
  .flag-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    background: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
  }
  
  .course-data {
    display: flex;
    flex-direction: column;
    .lang-title {
      font-size: 14px;
      font-weight: 700;
    }
    .lang-xp {
      font-size: 12px;
      opacity: 0.8;
    }
  }
}

/* Responsividade */
/* Responsividade */
@media (max-width: 600px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-wrap: wrap; /* Permite quebrar linha */
  }
  
  .top-stats {
    margin-left: 0;
    width: 100%; /* Força quebra de linha */
    margin-top: 10px;
    display: flex;
    justify-content: center; /* Centraliza o badge */
    padding-left: 0; /* Remove indentação para ocupar largura total */
  }
  
  .stat-badge {
    width: 100%;
    justify-content: center;
  }
  
  .stat-badge .streak-label {
    font-size: 11px; /* Fonte menor no mobile para não quebrar */
  }
  
  /* Ajuste para quando a tela for muito pequena e o padding quebrar */
  @media (max-width: 400px) {
    .top-stats {
        padding-left: 0;
        justify-content: center; /* Badge centered fully */
    }
    .card-header {
        justify-content: center;
        text-align: center;
    }
    .user-details {
        text-align: left; /* Mantem nome alinhado a esquerda do bloco dele, mas o bloco pode estar centralizado se mudarmos */
    }
  }
}

.stat-badge {
  white-space: nowrap; /* Evita quebra de linha interna */
}
</style>
