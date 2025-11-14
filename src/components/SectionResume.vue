<script setup>
defineProps({
  currentStyle: String
})

const experiences = [
  {
    role: 'Front-End Developer',
    company: 'Tech Solutions Inc.',
    period: '2022 - Present',
    description:
      'Developed and maintained responsive web applications using Vue.js and React. Collaborated with UI/UX designers to implement modern interfaces.'
  },
  {
    role: 'UI/UX Designer (Intern)',
    company: 'DesignFlow Studio',
    period: '2021 - 2022',
    description:
      'Assisted in creating wireframes, prototypes, and user flows for various mobile and web projects.'
  }
]

const education = [
  {
    degree: 'Bachelor of Computer Engineering',
    institution: 'Federal University of Uberaba',
    period: '2017 - 2021'
  }
]
</script>

<template>
  <section class="section-resume section-padding">
    <h2 class="section-title">Resume</h2>
    <div class="resume-timeline-wrapper">
      <div class="timeline-group education-group">
        <h3 class="resume-subtitle timeline-header">Education</h3>
        <div v-for="edu in education" :key="edu.institution" class="timeline-item timeline-left">
          <div class="timeline-dot"></div>
          <div class="timeline-content resume-item">
            <h4>{{ edu.degree }}</h4>
            <h5>{{ edu.institution }} | {{ edu.period }}</h5>
          </div>
        </div>
      </div>

      <div class="timeline-group experience-group">
        <h3 class="resume-subtitle timeline-header">Experience</h3>
        <div v-for="exp in experiences" :key="exp.company" class="timeline-item timeline-right">
          <div class="timeline-dot"></div>
          <div class="timeline-content resume-item">
            <h4>{{ exp.role }}</h4>
            <h5>{{ exp.company }} | {{ exp.period }}</h5>
            <p>{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
