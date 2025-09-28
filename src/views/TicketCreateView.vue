<template>
  <!--
    TicketCreateView
    - Formulário para criar novo ticket (POST /tickets)
  -->
  <v-container class="py-6" style="max-width: 720px;">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">Novo Ticket</v-card-title>
      <v-card-text>
        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          class="mb-4"
          :text="error"
        />
        <v-form ref="formRef" v-model="isValid" @submit.prevent="onSubmit">
          <v-text-field
            v-model="titulo"
            label="Título"
            :rules="[rules.required, rules.min(4)]"
            prepend-inner-icon="mdi-format-title"
            density="comfortable"
          />
          <v-textarea
            v-model="descricao"
            label="Descrição"
            :rules="[rules.required, rules.min(10)]"
            prepend-inner-icon="mdi-text"
            auto-grow
            rows="5"
            density="comfortable"
          />

          <v-btn
            color="primary"
            :loading="submitting"
            type="submit"
          >
            Criar ticket
          </v-btn>
          <v-btn class="ml-2" variant="text" to="/tickets">Cancelar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
/**
 * TicketCreateView.vue
 * - Envia payload de criação para /tickets e redireciona após sucesso
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createTicket } from '../api/tickets'

const router = useRouter()

const titulo = ref('')
const descricao = ref('')

const isValid = ref(false)
const submitting = ref(false)
const error = ref<string | null>(null)
const formRef = ref()

/** Regras simples de validação para Vuetify. */
const rules = {
  required: (v: string) => !!v || 'Obrigatório',
  min: (n: number) => (v: string) => (v?.length >= n) || `Mínimo de ${n} caracteres`
}

/** Submete criação do ticket. */
async function onSubmit() {
  error.value = null
  // @ts-expect-error Vuetify ref type
  const ok = await formRef.value?.validate()
  if (!ok.valid) return
  submitting.value = true
  try {
    const created = await createTicket({ titulo: titulo.value, descricao: descricao.value })
    router.push(`/tickets/${created.id}`)
  } catch (err: unknown) {
    error.value = 'Falha ao criar o ticket. Tente novamente.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* Sem estilos adicionais por ora */
</style>
