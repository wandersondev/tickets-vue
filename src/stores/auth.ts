/**
 * stores/auth.ts
 * - Store de autenticação (Pinia) para gerenciar o token JWT
 */
import { defineStore } from 'pinia'

/** Estado da autenticação contendo token e email (simples). */
interface AuthState {
  token: string | null
  email: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('auth_token'),
    email: localStorage.getItem('auth_email')
  }),
  getters: {
    /** Indica se há usuário autenticado. */
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    /** Define e persiste o token. */
    setToken(token: string | null) {
      this.token = token
      if (token) localStorage.setItem('auth_token', token)
      else localStorage.removeItem('auth_token')
    },
    /** Define e persiste o email do usuário autenticado. */
    setEmail(email: string | null) {
      this.email = email
      if (email) localStorage.setItem('auth_email', email)
      else localStorage.removeItem('auth_email')
    },
    /** Efetua logout limpando token e email. */
    logout() {
      this.setToken(null)
      this.setEmail(null)
    }
  }
})
