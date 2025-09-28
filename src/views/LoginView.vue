<template>
  <!--
    LoginView
    - Formulário de autenticação com validação e feedback de erro
  -->
  <v-container class="py-10" style="max-width: 480px;">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">Entrar</v-card-title>
      <v-card-subtitle>Use suas credenciais para acessar seus tickets.</v-card-subtitle>

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
            v-model="email"
            label="E-mail"
            type="email"
            prepend-inner-icon="mdi-email"
            :rules="[rules.required, rules.email]"
            autocomplete="email"
            density="comfortable"
          />
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            prepend-inner-icon="mdi-lock"
            :rules="[rules.required]"
            autocomplete="current-password"
            density="comfortable"
          />

          <v-btn
            block
            color="primary"
            class="mt-2"
            :loading="submitting"
            type="submit"
          >
            Entrar
          </v-btn>

          <div class="text-center mt-4">
            <span>Ainda não tem conta?</span>
            <v-btn variant="text" to="/register">Registre-se</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
/**
 * LoginView.vue
 * - Autentica usuário e armazena token no Pinia/localStorage
 */
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { loginUser } from '../api/auth'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const email = ref('')
const senha = ref('')
const isValid = ref(false)
const submitting = ref(false)
const error = ref<string | null>(null)

const formRef = ref()

/** Regras simples de validação para Vuetify. */
const rules = {
  required: (v: string) => !!v || 'Obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido'
}

/** Submete o formulário de login. */
async function onSubmit() {
  error.value = null
  // @ts-expect-error Vuetify ref type
  const ok = await formRef.value?.validate()
  if (!ok.valid) return
  submitting.value = true
  try {
    const { token } = await loginUser({ email: email.value, senha: senha.value })
    auth.setToken(token)
    auth.setEmail(email.value)
    const redirect = (route.query.redirect as string) || '/tickets'
    router.push(redirect)
  } catch (err: unknown) {
    error.value = 'Falha ao autenticar. Verifique e-mail/senha.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* Sem estilos adicionais por ora */
</style>
