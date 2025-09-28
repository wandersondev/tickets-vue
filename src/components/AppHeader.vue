<template>
  <!--
    AppHeader
    - Barra superior com navegação e ações de usuário (login/logout)
  -->
  <v-app-bar color="primary" density="comfortable">
    <v-app-bar-title class="font-weight-bold">
      Tickets
    </v-app-bar-title>

    <template #append>
      <v-btn variant="text" class="mr-2" to="/tickets" :ripple="false" v-if="isAuthenticated">
        <v-icon icon="mdi-view-list" class="mr-1" /> Meus Tickets
      </v-btn>
      <v-btn variant="text" class="mr-2" to="/tickets/create" :ripple="false" v-if="isAuthenticated">
        <v-icon icon="mdi-plus" class="mr-1" /> Novo Ticket
      </v-btn>

      <div class="d-flex align-center">
        <v-chip v-if="isAuthenticated" class="mr-2" color="secondary" text-color="white" size="small">
          <v-icon icon="mdi-account" size="16" class="mr-1" /> {{ emailLabel }}
        </v-chip>

        <v-btn v-if="!isAuthenticated" color="secondary" to="/login">
          <v-icon icon="mdi-login" class="mr-1" /> Entrar
        </v-btn>
        <v-btn v-else variant="outlined" color="white" @click="onLogout">
          <v-icon icon="mdi-logout" class="mr-1" /> Sair
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
/**
 * AppHeader.vue
 * - Cabeçalho com navegação contextual e ações de autenticação
 */
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

/** Se usuário está autenticado. */
const isAuthenticated = computed(() => auth.isAuthenticated)
/** Exibe email do usuário autenticado (quando disponível). */
const emailLabel = computed(() => auth.email ?? 'Usuário')

/** Efetua logout limpando token e redirecionando para login. */
function onLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
/* Estilos mínimos para espaçamento */
</style>
