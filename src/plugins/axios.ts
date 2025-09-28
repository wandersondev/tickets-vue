/**
 * plugins/axios.ts
 * - Axios instance com baseURL e interceptor para header "authentication: Bearer <token>"
 */
import axios from 'axios'

/** Cria uma instância do Axios configurada para a API local. */
export const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 15000
})

// Interceptor para anexar o token no header "authentication"
api.interceptors.request.use((config) => {
  /** Lê o token do localStorage (persistência simples do frontend). */
  const token = localStorage.getItem('auth_token')
  if (token) {
    // Cabeçalho customizado exigido pelo backend
    config.headers = config.headers ?? {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
