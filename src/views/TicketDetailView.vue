<template>
  <!--
    TicketDetailView
    - Exibe detalhes de um ticket
  -->
  <v-container class="py-6" style="max-width: 900px;">
    <v-btn variant="text" color="secondary" to="/tickets" class="mb-4">
      <v-icon icon="mdi-chevron-left" class="mr-1" /> Voltar
    </v-btn>

    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mb-4"
      :text="error"
    />

    <v-skeleton-loader v-if="loading" type="card" />

    <v-card v-else-if="ticket">
      <v-card-title class="text-h6 font-weight-bold d-flex align-center justify-space-between">
        <div>
          #{{ ticket.id }} — {{ ticket.titulo }}
        </div>
        <v-chip :color="statusColor(ticket.status)" text-color="white" size="small">
          {{ ticket.status }}
        </v-chip>
      </v-card-title>

      <v-card-text>
        <div class="mb-4">
          <div class="text-overline mb-1">Descrição</div>
          <div class="text-body-1" style="white-space: pre-wrap;">{{ ticket.descricao }}</div>
        </div>

        <v-divider class="my-4" />

        <div class="d-flex flex-wrap gap-4">
          <div>
            <div class="text-overline mb-1">Solicitante</div>
            <div>{{ ticket.nomeSolicitante }}</div>
          </div>
          <div>
            <div class="text-overline mb-1">Agente</div>
            <div>{{ ticket.nomeAgente ?? '—' }}</div>
          </div>
          <div>
            <div class="text-overline mb-1">Abertura</div>
            <div>{{ formatDate(ticket.dataAbertura) }}</div>
          </div>
          <div>
            <div class="text-overline mb-1">Última atualização</div>
            <div>{{ formatDate(ticket.dataUltimaAtualizacao) }}</div>
          </div>
          <div>
            <div class="text-overline mb-1">Fechamento</div>
            <div>{{ ticket.dataFechamento ? formatDate(ticket.dataFechamento) : '—' }}</div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <div v-else class="text-center my-10">
      <v-icon icon="mdi-information-outline" size="32" class="mb-2" />
      <div>Ticket não encontrado.</div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
/**
 * TicketDetailView.vue
 * - Busca GET /tickets/:id e exibe dados
 */
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTicketById, type TicketDetail } from '../api/tickets'

const route = useRoute()

const loading = ref(true)
const error = ref<string | null>(null)
const ticket = ref<TicketDetail | null>(null)

/** Carrega detalhes do ticket pelo ID da rota. */
async function fetchDetail() {
  loading.value = true
  error.value = null
  try {
    const id = route.params.id as string
    ticket.value = await getTicketById(id)
  } catch (err: unknown) {
    error.value = 'Não foi possível carregar o ticket.'
  } finally {
    loading.value = false
  }
}

/** Cor do chip conforme status. */
function statusColor(status: string): string {
  const map: Record<string, string> = {
    ABERTO: 'primary',
    FECHADO: 'grey',
    ANDAMENTO: 'secondary'
  }
  return map[status] ?? 'primary'
}

/** Formata data ISO para exibição local. */
function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}

onMounted(fetchDetail)
</script>

<style scoped>
/* Sem estilos adicionais por ora */
</style>
