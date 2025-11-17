<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  currentStyle: String
})

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p>
        <a href="https://github.com/thalysm" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/images/Github.svg" alt="GitHub" class="social-icon" />
        </a>
        <a href="https://www.behance.net/thalysmarquesc" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/images/Behance.svg" alt="Behance" class="social-icon" />
        </a>
        <a
          href="https://www.instagram.com/thalysmarquesc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="@/assets/images/Instagram.svg" alt="Instagram" class="social-icon" />
        </a>
      </p>
      <p>
        {{ t('footerText', { year: new Date().getFullYear() }) }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.social-icon {
  width: 20px;
  height: 20px;
  margin: 0 8px;
  transition: transform 0.2s;
}

.social-icon:hover {
  transform: scale(1.1);
}
</style>