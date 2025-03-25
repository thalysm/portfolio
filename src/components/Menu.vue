<script setup>
import PhotoMenu from '@/assets/images/PhotoMenu.png'
</script>

<template>
  <header class="menu">
    <img :src="PhotoMenu" class="photo-menu" />
    <div class="menu-items">
      <p class="menu-item selected">Home</p>
      <p class="menu-item">Resume</p>
      <p class="menu-item">Projects</p>
      <p class="menu-item">Blog</p>
      <p class="menu-item">Contact</p>
    </div>
    <div class="hidden-photo"></div>
    <!-- <div class="switch">
      <div class="switch__1">
        <input id="switch-1" type="checkbox" />
        <label for="switch-1"></label>
      </div>
    </div> -->
  </header>
</template>
