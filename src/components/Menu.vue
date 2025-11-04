<script setup>
import { ref } from 'vue'
import PhotoMenu from '@/assets/images/PhotoMenu.png'

const isMobileMenuOpen = ref(false)
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
      <p class="menu-item selected">Home</p>
      <p class="menu-item">Resume</p>
      <p class="menu-item">Projects</p>
      <p class="menu-item">Blog</p>
      <p class="menu-item">Contact</p>
    </div>

    <div class="hidden-photo"></div>
  </header>
</template>
