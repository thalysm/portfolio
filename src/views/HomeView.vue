<script setup>
import Menu from '@/components/Menu.vue'
import SectionHome from '@/components/SectionHome.vue'

defineProps({
  currentStyle: String
})
</script>

<template>
  <main>
    <Menu />
    <SectionHome :currentStyle="currentStyle" />
  </main>
</template>
