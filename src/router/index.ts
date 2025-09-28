/**
 * router/index.ts
 * - Define rotas públicas e protegidas + guarda de navegação
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const TicketsListView = () => import('../views/TicketsListView.vue')
const TicketCreateView = () => import('../views/TicketCreateView.vue')
const TicketDetailView = () => import('../views/TicketDetailView.vue')

/** Rotas da aplicação. */
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/tickets' },
  { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
  { path: '/register', name: 'register', component: RegisterView, meta: { public: true } },
  { path: '/tickets', name: 'tickets-list', component: TicketsListView, meta: { requiresAuth: true } },
  { path: '/tickets/create', name: 'ticket-create', component: TicketCreateView, meta: { requiresAuth: true } },
  { path: '/tickets/:id', name: 'ticket-detail', component: TicketDetailView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * Guarda global: bloqueia acesso às rotas protegidas sem token,
 * redirecionando para /login e preservando a rota pretendida na query.
 */
router.beforeEach((to) => {
  const isPublic = to.meta.public === true
  const token = localStorage.getItem('auth_token')
  if (!isPublic && !token) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }
  return true
})

export default router
