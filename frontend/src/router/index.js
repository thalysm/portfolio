import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // --- Novas Rotas Públicas ---
    {
      path: '/blog',
      name: 'blog-list',
      component: () => import('../views/BlogListView.vue')
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: () => import('../views/BlogPostView.vue')
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue')
    },

    // --- Rotas de Admin ---
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminLayout.vue'),
      meta: { requiresAuth: true },
      // --- ALTERAÇÃO AQUI ---
      // Adicionamos um redirect para que /admin sozinho vá para /admin/dashboard
      redirect: { name: 'admin-dashboard' }, 
      children: [
        {
          path: 'dashboard', // <-- Mudado de '' para 'dashboard'
          name: 'admin-dashboard',
          component: () => import('../views/AdminDashboard.vue')
        },
        // Projetos
        {
          path: 'projects',
          name: 'admin-projects',
          component: () => import('../views/AdminProjectList.vue')
        },
        {
          path: 'projects/form', 
          name: 'admin-project-new',
          component: () => import('../views/AdminProjectForm.vue')
        },
        {
          path: 'projects/form/:id',
          name: 'admin-project-edit',
          component: () => import('../views/AdminProjectForm.vue')
        },
        // Posts
        {
          path: 'posts',
          name: 'admin-posts',
          component: () => import('../views/AdminPostList.vue')
        },
        {
          path: 'posts/form',
          name: 'admin-post-new',
          component: () => import('../views/AdminPostForm.vue')
        },
        {
          path: 'posts/form/:id',
          name: 'admin-post-edit',
          component: () => import('../views/AdminPostForm.vue')
        },
        // Mensagens
        {
          path: 'messages',
          name: 'admin-messages',
          component: () => import('../views/AdminMessages.vue')
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// --- Guarda de Rota (Proteção do Admin) ---
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('authToken') 

    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else if (to.name === 'login' && localStorage.getItem('authToken')) {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router