<script setup>
import { ref } from 'vue'

defineProps({
  currentStyle: String
})

const placeholderImg = new URL('/src/assets/images/PhotoSectionHomeFlat.png', import.meta.url)

const blogPosts = ref([
  {
    title: 'Understanding Vue 3 Composition API',
    date: 'October 28, 2025',
    snippet:
      'A deep dive into why the Composition API is a game-changer for Vue development, improving code organization and reusability...',
    image: placeholderImg,
    tags: ['Vue.js', 'JavaScript', 'Tutorial']
  },
  {
    title: 'Neobrutalism in Web Design',
    date: 'October 15, 2025',
    snippet:
      'Exploring the rising trend of Neobrutalism, its core principles, and how to implement it effectively in your own projects...',
    image: placeholderImg,
    tags: ['Design', 'CSS', 'UI/UX']
  }
])
</script>

<template>
  <section class="section-blog section-padding">
    <h2 class="section-title">Blog</h2>
    <div class="blog-grid">
      <div v-for="post in blogPosts" :key="post.title" class="blog-card">
        <img :src="post.image" :alt="post.title" class="blog-image" />
        <div class="blog-info">
          <span class="blog-date">{{ post.date }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.snippet }}</p>
          <div class="blog-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
