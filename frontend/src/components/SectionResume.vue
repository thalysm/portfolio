<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import educationIcon from '@/assets/icons/Education.svg?url'
import experienceIcon from '@/assets/icons/Experience.svg?url'

const { t, locale } = useI18n()
const API_URL = ''
const resumeItems = ref([])

const getLoc = (obj) => obj ? (obj[locale.value] || obj.pt || obj) : ''

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/resume`)
    if (res.ok) resumeItems.value = await res.json()
  } catch (e) { console.error(e) }
})

const education = computed(() => resumeItems.value
  .filter(i => i.type === 'Education')
  .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)))

const experience = computed(() => resumeItems.value
  .filter(i => i.type === 'Experience')
  .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)))

const formatPeriod = (item) => {
  return `${item.startDate} - ${item.isPresent ? (locale.value === 'pt' ? 'Presente' : 'Present') : item.endDate}`
}
</script>

<template>
  <section class="section-resume section-padding">
    <h2 class="section-title">{{ t('resume') }}</h2>
    <div class="resume-timeline-wrapper">
      <div class="timeline-group education-group">
        <div class="resume-subtitle timeline-header header-education">
          <div class="header-content">
            <h3 class="title-text">{{ t('education') }}</h3>
            <div class="icon-circle"><img :src="educationIcon" /></div>
          </div>
        </div>
        <div v-for="edu in education" :key="edu._id" class="timeline-item timeline-left">
          <div class="timeline-dot"></div>
          <div class="timeline-content resume-item">
            <h4>{{ getLoc(edu.title) }}</h4>
            <h5>{{ edu.institution }} | {{ formatPeriod(edu) }}</h5>
            <p>{{ getLoc(edu.description) }}</p>
          </div>
        </div>
      </div>

      <div class="timeline-group experience-group">
        <div class="resume-subtitle timeline-header header-experience">
          <div class="header-content">
            <div class="icon-circle"><img :src="experienceIcon" /></div>
            <h3 class="title-text">{{ t('experience') }}</h3>
          </div>
        </div>
        <div v-for="exp in experience" :key="exp._id" class="timeline-item timeline-right">
          <div class="timeline-dot"></div>
          <div class="timeline-content resume-item">
            <h4>{{ getLoc(exp.title) }}</h4>
            <h5>{{ exp.institution }} | {{ formatPeriod(exp) }}</h5>
            <p>{{ getLoc(exp.description) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>