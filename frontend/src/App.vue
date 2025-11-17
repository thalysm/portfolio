<script setup>
import { RouterView, useRoute } from 'vue-router' // Importado useRoute
import { onMounted, ref, watchEffect, computed } from 'vue' // Importado computed
import ThemeButton from './components/ThemeButton.vue'

const route = useRoute() // Instanciado o route

const styles = {
  NEOBRUTALISM: 'neobrutalism',
  NEOMORPHISM: 'neomorphism',
  GLASSMORPHISM: 'glassmorphism',
  FLAT: 'flat'
}

// Objeto para mapear os temas aos seus respectivos favicons
const faviconPaths = {
  neobrutalism: '/favicon/neobrutalism.png',
  neomorphism: '/favicon/neomorphism.png',
  glassmorphism: '/favicon/glassmorphism.png',
  flat: '/favicon/flat.png'
}
const defaultFavicon = '/favicon.ico'

const currentStyle = ref(styles.NEOBRUTALISM)
const themePortfolio = 'themePortfolio'

onMounted(() => {
  currentStyle.value = localStorage.getItem(themePortfolio) || styles.NEOBRUTALISM
})

const getStyle = (style) => {
  localStorage.setItem(themePortfolio, style)
  return (currentStyle.value = style)
}

// Computed property para esconder o botão nas rotas /admin
const showThemeButton = computed(() => {
  return !route.path.startsWith('/admin')
})

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

    <ThemeButton
      v-if="showThemeButton"
      @change-style="getStyle"
      :currentStyle="currentStyle"
    />
  </div>
</template>