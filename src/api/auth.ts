/**
 * api/auth.ts
 * - Chamadas de autenticação: registrar e logar
 */
import { api } from '../plugins/axios'

/** Payload para registrar usuário. */
export interface RegisterPayload {
  nome: string
  email: string
  senha: string
}

/** Payload de login. */
export interface LoginPayload {
  email: string
  senha: string
}

/** Resposta de login contendo o token JWT. */
export interface LoginResponse {
  token: string
}

/** POST /usuarios - Cria um novo usuário. */
export async function registerUser(payload: RegisterPayload): Promise<void> {
  await api.post('/usuarios', payload, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/** POST /login - Autentica e retorna token. */
export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/login', payload, {
     
    headers: { 'Content-Type': 'application/json' }
  })
  return data
}
