/**
 * api/tickets.ts
 * - Chamadas de tickets: criar, listar e detalhar (todas autenticadas)
 */
import { api } from '../plugins/axios'

/** Ticket simplificado para listagem. */
export interface TicketItem {
  id: number
  titulo: string
  status: string
  nomeSolicitante: string
  dataAbertura: string
}

/** Ticket completo (detalhe). */
export interface TicketDetail {
  id: number
  titulo: string
  descricao: string
  status: string
  nomeSolicitante: string
  nomeAgente: string | null
  dataAbertura: string
  dataUltimaAtualizacao: string
  dataFechamento: string | null
}

/** Payload de criação de ticket. */
export interface CreateTicketPayload {
  titulo: string
  descricao: string
}

/** POST /tickets - Cria um ticket (autenticado). */
export async function createTicket(payload: CreateTicketPayload): Promise<TicketDetail> {
  const { data } = await api.post<TicketDetail>('/tickets', payload, {
    headers: { 'Content-Type': 'application/json' }
  })
  return data
}

/** GET /tickets - Lista tickets do usuário autenticado. */
export async function listMyTickets(): Promise<TicketItem[]> {
  const { data } = await api.get<TicketItem[]>('/tickets')
  return data
}

/** GET /tickets/{id} - Retorna detalhes de um ticket. */
export async function getTicketById(id: number | string): Promise<TicketDetail> {
  const { data } = await api.get<TicketDetail>(`/tickets/${id}`)
  return data
}
