<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentStyle: String
})

const photosSectionHome = {
  NEOBRUTALISM: new URL('/src/assets/images/PhotoSectionHome.png', import.meta.url),
  NEOMORPHISM: new URL('/src/assets/images/PhotoSectionHomeNeomorphism.png', import.meta.url),
  GLASSMORPHISM: new URL('/src/assets/images/PhotoSectionHomeGlassmorphism.png', import.meta.url),
  FLAT: new URL('/src/assets/images/PhotoSectionHomeFlat.png', import.meta.url)
}

const habilities = [
  {
    name: 'JavaScript',
    icon: new URL('/src/assets/images/javascript.svg', import.meta.url)
  },
  {
    name: 'React Native',
    icon: new URL('/src/assets/images/reactnative.svg', import.meta.url)
  },
  {
    name: 'Flutter',
    icon: new URL('/src/assets/images/flutter.svg', import.meta.url)
  },
  {
    name: 'Python',
    icon: new URL('/src/assets/images/python.svg', import.meta.url)
  },
  {
    name: 'Figma',
    icon: new URL('/src/assets/images/figma.svg', import.meta.url)
  },
  {
    name: 'Adobe XD',
    icon: new URL('/src/assets/images/adobexd.svg', import.meta.url)
  }
]

const dynamicPhotoSrc = computed(() => {
  const styleKey = props.currentStyle ? props.currentStyle.toUpperCase() : 'NEOBRUTALISM'
  return photosSectionHome[styleKey] || photosSectionHome.NEOBRUTALISM
})
</script>

<template>
  <section class="section-home">
    <div>
      <span class="span-section-home"> Hi, My name is </span>
      <h1 class="name-section-home">Thalys Marques</h1>
      <p class="text-section-home">
        A passionate Front-End developer with a Bachelor of Computer Engineering. My journey in the
        world of programming started with the goal of combining my love for technology with creating
        intuitive and enjoyable interfaces. With knowledge in UI/UX, I have the ability to design
        digital experiences that delight users. Born in Uberaba, Minas Gerais, I bring a unique
        perspective and an innovative approach to my projects. My focus is always on balancing
        aesthetics and functionality, ensuring that every detail is carefully considered. I am
        always seeking constant learning, aiming to enhance my skills and stay updated with the
        latest trends in the field of Front-End development.
      </p>
      <div class="hability-list">
        <div class="label" v-for="hability in habilities" :key="hability.name">
          <div class="label-internal">
            <img :src="hability.icon" />
            <p>{{ hability.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <img :src="dynamicPhotoSrc" class="photo-section-home" />
  </section>
</template>
