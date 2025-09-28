<template>
  <!--
    TicketsListView
    - Lista de tickets do usuário autenticado
  -->
  <v-container class="py-6">
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h5 font-weight-bold">Meus Tickets</h2>
      <v-btn color="primary" to="/tickets/create">
        <v-icon icon="mdi-plus" class="mr-1" /> Novo Ticket
      </v-btn>
    </div>

    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mb-4"
      :text="error"
    />
    <v-skeleton-loader
      v-if="loading"
      type="table"
      class="mb-4"
    />

    <v-data-table
      v-else
      :items="tickets"
      :headers="headers"
      item-key="id"
      density="comfortable"
    >
      <template #item.status="{ value }">
        <v-chip :color="statusColor(value)" text-color="white" size="small">
          {{ value }}
        </v-chip>
      </template>

      <template #item.dataAbertura="{ value }">
        {{ formatDate(value) }}
      </template>

      <template #item.actions="{ item }">
        <v-btn
          size="small"
          variant="text"
          color="secondary"
          :to="`/tickets/${item.id}`"
        >
          Detalhes
          <v-icon icon="mdi-chevron-right" />
        </v-btn>
      </template>

      <template #no-data>
        <div class="text-center my-6">
          <v-icon icon="mdi-information-outline" class="mb-2" size="32" />
          <div>Nenhum ticket encontrado.</div>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
/**
 * TicketsListView.vue
 * - Consome GET /tickets e exibe em tabela com ações
 */
import { onMounted, ref } from 'vue'
import { listMyTickets, type TicketItem } from '../api/tickets'

const loading = ref(true)
const error = ref<string | null>(null)
const tickets = ref<TicketItem[]>([])

/** Colunas da tabela de tickets. */
const headers = [
  { title: 'ID', key: 'id', width: 80 },
  { title: 'Título', key: 'titulo' },
  { title: 'Status', key: 'status', width: 140 },
  { title: 'Solicitante', key: 'nomeSolicitante', width: 200 },
  { title: 'Abertura', key: 'dataAbertura', width: 200 },
  { title: '', key: 'actions', width: 120 }
]

/** Carrega lista de tickets. */
async function fetchTickets() {
  loading.value = true
  error.value = null
  try {
    tickets.value = await listMyTickets()
  } catch (err: unknown) {
    error.value = 'Não foi possível carregar os tickets.'
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

onMounted(fetchTickets)
</script>

<style scoped>
/* Sem estilos adicionais por ora */
</style>
