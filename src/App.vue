<script setup>
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
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
  return (currentStyle.value = style)
}
</script>

<template>
  <div>
    <RouterView :class="currentStyle" />
    <ThemeButton @change-style="getStyle" :currentStyle="currentStyle" />
  </div>
</template>
