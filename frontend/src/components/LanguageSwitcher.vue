<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const switchLanguage = (lang) => {
  locale.value = lang
}
</script>

<template>
  <div class="language-switcher">
    <button 
      @click="switchLanguage('pt')" 
      :class="{ active: locale === 'pt' }"
      class="lang-btn"
    >
      PT
    </button>
    <span class="separator">|</span>
    <button 
      @click="switchLanguage('en')" 
      :class="{ active: locale === 'en' }"
      class="lang-btn"
    >
      EN
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.lang-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #888;
  padding: 5px;
  font-size: 14px;
}
.lang-btn.active {
  color: #5093fe;
  font-weight: 800;
}
.separator {
  color: #ccc;
  margin: 0 5px;
}
</style>