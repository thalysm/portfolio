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

// Objeto para mapear os temas aos seus respectivos favicons
const faviconPaths = {
  neobrutalism: '/favicon/neobrutalism.png', // Exemplo de favicon para o tema neobrutalism
  neomorphism: '/favicon/neomorphism.png', // Exemplo de favicon para o tema neomorphism
  glassmorphism: '/favicon/glassmorphism.png', // Exemplo de favicon para o tema glassmorphism
  flat: '/favicon/flat.png' // Exemplo de favicon para o tema flat
}
const defaultFavicon = '/favicon.ico' // O favicon padrão

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
  // Lógica existente para as classes do body
  document.body.classList.remove(
    'theme-glassmorphism',
    'theme-flat',
    'theme-neomorphism',
    'theme-neobrutalism'
  )

  if (currentStyle.value) {
    document.body.classList.add(`theme-${currentStyle.value}`)
  }

  // Nova lógica para atualizar o favicon
  const faviconLink = document.querySelector("link[rel='icon']")
  if (faviconLink) {
    const newFaviconHref = faviconPaths[currentStyle.value] || defaultFavicon
    faviconLink.href = newFaviconHref
  }
})
</script>

<template>
  <div>
    <RouterView :class="currentStyle" :currentStyle="currentStyle" />

    <ThemeButton @change-style="getStyle" :currentStyle="currentStyle" />
  </div>
</template>
