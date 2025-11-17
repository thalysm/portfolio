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
          to="/admin/dashboard" 
          class="menu-item" 
          active-class="selected"
          @click="closeMobileMenu"
        >
          Dashboard
        </RouterLink>

        <div class="nav-divider">Gerenciamento</div>

        <RouterLink 
          to="/admin/categories" 
          class="menu-item" 
          active-class="selected"
          @click="closeMobileMenu"
        >
          Categorias
        </RouterLink>

        <RouterLink 
          to="/admin/resume" 
          class="menu-item" 
          active-class="selected"
          @click="closeMobileMenu"
        >
          Currículo
        </RouterLink>

        <RouterLink 
          to="/admin/projects" 
          class="menu-item" 
          active-class="selected"
          @click="closeMobileMenu"
        >
          Projetos
        </RouterLink>

        <RouterLink 
          to="/admin/posts" 
          class="menu-item" 
          active-class="selected"
          @click="closeMobileMenu"
        >
          Blog Posts
        </RouterLink>

        <div class="nav-divider">Sistema</div>

        <RouterLink 
          to="/admin/messages" 
          class="menu-item" 
          active-class="selected"
          @click="closeMobileMenu"
        >
          Mensagens
        </RouterLink>
      </nav>

      <div class="admin-footer">
        <RouterLink to="/" class="menu-item back-to-site" @click="closeMobileMenu">
          Ver Site
        </RouterLink>
        <button @click="logout" class="menu-item logout-button">
          Sair
        </button>
      </div>
    </aside>

    <main class="admin-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f2f2f2;
}

/* --- Sidebar Styles --- */
.admin-sidebar {
  width: 260px;
  background-color: #f2f2f2;
  border-right: 3px solid #000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
}

.admin-title {
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 30px;
  text-transform: uppercase;
  border-bottom: 3px solid #000;
  padding-bottom: 15px;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-divider {
  font-size: 12px;
  text-transform: uppercase;
  color: #666;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 5px;
  padding-left: 5px;
}

/* --- Menu Item Styles (Neobrutalism) --- */
.menu-item {
  display: block;
  text-decoration: none;
  padding: 12px 15px;
  font-weight: 600;
  color: #000;
  border: 3px solid #000;
  background-color: #fff;
  box-shadow: 3px 3px 0px 0px #000;
  transition: all 0.2s ease;
  text-align: center;
  cursor: pointer;
}

.menu-item:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px 0px #000;
}

.menu-item:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px 0px #000;
}

.menu-item.selected {
  background-color: #5093fe; /* Azul do tema */
  color: #fff;
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px 0px #000;
}

/* --- Footer Styles --- */
.admin-footer {
  margin-top: auto;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.back-to-site {
  background-color: #ceff1a; /* Verde Neon */
}

.logout-button {
  background-color: #ffcccc; /* Vermelho claro */
}

.logout-button:hover {
  background-color: #ff9999;
}

/* --- Content Area --- */
.admin-content {
  flex: 1;
  margin-left: 260px; /* Largura da sidebar */
  padding: 40px;
  width: calc(100% - 260px);
}

/* --- Mobile Menu Toggle --- */
.admin-menu-toggle {
  display: none;
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 200;
  background: #fff;
  border: 3px solid #000;
  padding: 10px;
  cursor: pointer;
}

.admin-menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #000;
  margin: 5px 0;
}

/* --- Responsividade --- */
@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
    width: 80%;
    max-width: 300px;
    box-shadow: 5px 0 15px rgba(0,0,0,0.2);
  }

  .admin-sidebar.is-open {
    transform: translateX(0);
  }

  .admin-content {
    margin-left: 0;
    width: 100%;
    padding: 20px;
    padding-top: 70px; /* Espaço para o botão toggle */
  }

  .admin-menu-toggle {
    display: block;
  }
}
</style>