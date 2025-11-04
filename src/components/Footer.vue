<script setup></script>

<style scoped>
.social-icon {
  width: 20px;
  height: 20px;
  margin: 0 8px;
}
</style>

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
        Developed with 🖤 | Thalys Marques | {{ new Date().getFullYear() }} All Rights Reserved.
      </p>
    </div>
  </footer>
</template>
