<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import PhotoMenu from '@/assets/images/PhotoMenu.png'

const isMobileMenuOpen = ref(false)
const selectedItem = ref('home')

const sections = ['home', 'resume', 'projects', 'blog', 'contact']

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  const scrollY = window.scrollY
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
  <header class="menu">
    <img :src="PhotoMenu" class="photo-menu" />

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
        >Home</RouterLink
      >
      <RouterLink
        to="/#resume"
        class="menu-item"
        :class="{ selected: selectedItem === 'resume' }"
        @click="closeMobileMenu"
        >Resume</RouterLink
      >
      <RouterLink
        to="/#projects"
        class="menu-item"
        :class="{ selected: selectedItem === 'projects' }"
        @click="closeMobileMenu"
        >Projects</RouterLink
      >
      <RouterLink
        to="/#blog"
        class="menu-item"
        :class="{ selected: selectedItem === 'blog' }"
        @click="closeMobileMenu"
        >Blog</RouterLink
      >
      <RouterLink
        to="/#contact"
        class="menu-item"
        :class="{ selected: selectedItem === 'contact' }"
        @click="closeMobileMenu"
        >Contact</RouterLink
      >
    </div>

    <div class="hidden-photo"></div>
  </header>
</template>
