import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/blog', name: 'blog-list', component: () => import('../views/BlogListView.vue') },
    { path: '/blog/:id', name: 'blog-post', component: () => import('../views/BlogPostView.vue') },
    { path: '/projects/:id', name: 'project-detail', component: () => import('../views/ProjectDetailView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminLayout.vue'),
      meta: { requiresAuth: true },
      redirect: { name: 'admin-dashboard' },
      children: [
        { path: 'dashboard', name: 'admin-dashboard', component: () => import('../views/AdminDashboard.vue') },
        
        // Categorias
        { path: 'categories', name: 'admin-categories', component: () => import('../views/AdminCategoryList.vue') },
        { path: 'categories/form/:id?', name: 'admin-category-new', component: () => import('../views/AdminCategoryForm.vue') },
        { path: 'categories/edit/:id', name: 'admin-category-edit', component: () => import('../views/AdminCategoryForm.vue') },

        // Currículo
        { path: 'resume', name: 'admin-resume', component: () => import('../views/AdminResumeList.vue') },
        { path: 'resume/form/:id?', name: 'admin-resume-new', component: () => import('../views/AdminResumeForm.vue') },
        { path: 'resume/edit/:id', name: 'admin-resume-edit', component: () => import('../views/AdminResumeForm.vue') },

        // Projetos
        { path: 'projects', name: 'admin-projects', component: () => import('../views/AdminProjectList.vue') },
        { path: 'projects/form/:id?', name: 'admin-project-new', component: () => import('../views/AdminProjectForm.vue') },
        { path: 'projects/edit/:id', name: 'admin-project-edit', component: () => import('../views/AdminProjectForm.vue') },

        // Posts
        { path: 'posts', name: 'admin-posts', component: () => import('../views/AdminPostList.vue') },
        { path: 'posts/form/:id?', name: 'admin-post-new', component: () => import('../views/AdminPostForm.vue') },
        { path: 'posts/edit/:id', name: 'admin-post-edit', component: () => import('../views/AdminPostForm.vue') },

        { path: 'messages', name: 'admin-messages', component: () => import('../views/AdminMessages.vue') }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('authToken')) next({ name: 'login' })
  else next()
})

export default router