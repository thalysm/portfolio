<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PhotoMenu from '@/assets/images/PhotoMenu.png'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const isMobileMenuOpen = ref(false)
const selectedItem = ref('home')
const isScrolled = ref(false)

const sections = ['home', 'resume', 'projects', 'blog', 'contact']

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  const scrollY = window.scrollY
  isScrolled.value = scrollY > 10
  let currentSection = ''
  const offset = 150

  for (const id of sections) {
    const element = document.getElementById(id)
    if (element) {
      if (scrollY >= element.offsetTop - offset) {
        currentSection = id
      }
    }
  }
  selectedItem.value = currentSection || 'home'
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="menu" :class="{ 'is-scrolled': isScrolled }">
    <RouterLink to="/#home" @click="closeMobileMenu">
      <img :src="PhotoMenu" class="photo-menu" />
    </RouterLink>

    <button class="menu-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="menu-items" :class="{ 'is-open': isMobileMenuOpen }">
      <RouterLink
        to="/#home"
        class="menu-item"
        :class="{ selected: selectedItem === 'home' }"
        @click="closeMobileMenu"
        >{{ t('home') }}</RouterLink
      >
      <RouterLink
        to="/#resume"
        class="menu-item"
        :class="{ selected: selectedItem === 'resume' }"
        @click="closeMobileMenu"
        >{{ t('resume') }}</RouterLink
      >
      <RouterLink
        to="/#projects"
        class="menu-item"
        :class="{ selected: selectedItem === 'projects' }"
        @click="closeMobileMenu"
        >{{ t('projects') }}</RouterLink
      >
      <RouterLink
        to="/#blog"
        class="menu-item"
        :class="{ selected: selectedItem === 'blog' }"
        @click="closeMobileMenu"
        >{{ t('blog') }}</RouterLink
      >
      <RouterLink
        to="/#contact"
        class="menu-item"
        :class="{ selected: selectedItem === 'contact' }"
        @click="closeMobileMenu"
        >{{ t('contact') }}</RouterLink
      >
      <LanguageSwitcher />
    </div>
    
    <div class="hidden-photo"></div>
  </header>
</template>