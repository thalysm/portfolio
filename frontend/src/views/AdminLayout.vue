<script setup>
import { ref } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const logout = () => {
  localStorage.removeItem('authToken')
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="neobrutalism admin-layout">
    <button class="menu-toggle admin-menu-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <aside class="admin-sidebar" :class="{ 'is-open': isMobileMenuOpen }">
      <h3 class="admin-title">Admin Panel</h3>
      <nav class="admin-nav">
        <RouterLink
          to="/admin/dashboard" class="menu-item"
          active-class="selected"
          @click="closeMobileMenu"
          >Dashboard</RouterLink
        >
        <RouterLink
          to="/admin/projects"
          class="menu-item"
          active-class="selected"
          @click="closeMobileMenu"
          >Projetos</RouterLink
        >
        <RouterLink
          to="/admin/posts"
          class="menu-item"
          active-class="selected"
          @click="closeMobileMenu"
          >Posts</RouterLink
        >
        <RouterLink
          to="/admin/messages"
          class="menu-item"
          active-class="selected"
          @click="closeMobileMenu"
          >Mensagens</RouterLink
        >
      </nav>
      <div class="admin-footer">
        <RouterLink to="/" class="menu-item back-to-site" @click="closeMobileMenu"
          >Voltar ao Site</RouterLink
        >
        <button @click="logout" class="menu-item logout-button">Logout</button>
      </div>
    </aside>

    <main class="admin-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Aplicamos o Neobrutalism via classe no root, mas precisamos do layout */

.admin-layout {
  display: grid;
  grid-template-columns: 250px 1fr; /* Sidebar fixa e conteúdo flexível */
  min-height: 100vh;
  background-color: #f2f2f2;
}

.admin-sidebar {
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  background-color: #f2f2f2;
  border-right: 3px solid #000;
  height: 100vh;
  position: fixed;
  width: 250px;
  left: 0;
  top: 0;
  transition: transform 0.3s ease-out;
  z-index: 1100; /* Acima do menu-toggle */
}

.admin-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* --- ESTILO DE BOTÃO ATUALIZADO --- */
.admin-sidebar .menu-item {
  display: block;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 15px;
  border-radius: 8px;
  text-align: center;

  /* Estilos base (como o .filter-button) */
  background-color: transparent;
  color: #333;
  border: 3px solid black;
  transition: all 0.2s ease;
  box-shadow: none; /* Sem sombra por padrão */
}

.admin-sidebar .menu-item:hover {
  background-color: #e0e0e0;
}

/* Estilo ATIVO (baseado no .filter-button.active) */
.admin-sidebar .menu-item.selected {
  background: #5093fe;
  color: #000;
  border: 3px solid black;
  box-shadow: 5px 5px 0px 0px #1f1f1f;
}
/* --- FIM DA ATUALIZAÇÃO --- */

.admin-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.logout-button {
  width: 100%;
  background-color: #f2f2f2;
}

.logout-button:hover {
  background-color: #ffcccc;
  border-color: #cc0000;
  box-shadow: 5px 5px 0px 0px #cc0000;
  color: #cc0000;
}

.back-to-site {
  background-color: #e0e0e0;
}

.admin-content {
  grid-column: 2 / 3;
  padding: 40px;
}

.admin-menu-toggle {
  display: none; /* Escondido no desktop */
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1200; /* Acima da sidebar */
}

/* --- Media Queries para Responsividade --- */
@media (max-width: 768px) {
  .admin-layout {
    grid-template-columns: 1fr; /* Coluna única */
  }

  .admin-sidebar {
    transform: translateX(-100%); /* Escondido por padrão */
  }

  .admin-sidebar.is-open {
    transform: translateX(0);
    box-shadow: 10px 0px 0px 100vw rgba(0, 0, 0, 0.5); /* Overlay */
  }

  .admin-content {
    grid-column: 1 / 2; /* Ocupa a coluna única */
    padding: 20px;
    padding-top: 80px; /* Espaço para o botão de menu */
  }

  .admin-menu-toggle {
    display: flex;
  }
}
</style>