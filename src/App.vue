<script setup>
import { RouterView } from 'vue-router'
import { onMounted, ref, watchEffect } from 'vue'
import ThemeButton from './components/ThemeButton.vue'

const styles = {
  NEOBRUTALISM: 'neobrutalism',
  NEOMORPHISM: 'neomorphism',
  GLASSMORPHISM: 'glassmorphism',
  FLAT: 'flat'
}

const currentStyle = ref(styles.NEOBRUTALISM)
const themePortfolio = 'themePortfolio'

onMounted(() => {
  currentStyle.value = localStorage.getItem(themePortfolio) || styles.NEOBRUTALISM
})

const getStyle = (style) => {
  localStorage.setItem(themePortfolio, style)
  return (currentStyle.value = style)
}

watchEffect(() => {
  document.body.classList.remove(
    'theme-glassmorphism',
    'theme-flat',
    'theme-neomorphism',
    'theme-neobrutalism'
  )

  if (currentStyle.value) {
    document.body.classList.add(`theme-${currentStyle.value}`)
  }
})
</script>

<template>
  <div>
    <RouterView :class="currentStyle" :currentStyle="currentStyle" />

    <ThemeButton @change-style="getStyle" :currentStyle="currentStyle" />
  </div>
</template>
