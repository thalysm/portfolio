<script setup>
import Menu from '@/components/Menu.vue'
import SectionHome from '@/components/SectionHome.vue'
import SectionResume from '@/components/SectionResume.vue'
import SectionProjects from '@/components/SectionProjects.vue'
import SectionBlog from '@/components/SectionBlog.vue'
import SectionContact from '@/components/SectionContact.vue'
import SectionDuolingo from '@/components/SectionDuolingo.vue'
import Footer from '@/components/Footer.vue'

defineProps({
  currentStyle: String
})
</script>

<template>
  <main>
    <Menu />
    <SectionHome :currentStyle="currentStyle" id="home" />
    <SectionResume :currentStyle="currentStyle" id="resume" />
    <SectionDuolingo :currentStyle="currentStyle" id="duolingo" />
    <SectionProjects :currentStyle="currentStyle" id="projects" />
    <SectionBlog :currentStyle="currentStyle" id="blog" />
    <SectionContact :currentStyle="currentStyle" id="contact" />
    <Footer :currentStyle="currentStyle" />
  </main>
</template>
