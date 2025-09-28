<template>
  <!--
    App.vue
    - Layout base com Vuetify e router-view
  -->
  <v-app>
    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
/**
 * App.vue
 * - Componente principal que organiza layout e rotas
 */
import AppHeader from './components/AppHeader.vue'
</script>

<style>
/* Estilos globais mínimos */
html, body, #app {
  height: 100%;
}
</style>
