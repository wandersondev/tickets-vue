<template>
  <!--
    RegisterView
    - Formulário de cadastro de usuário
  -->
  <v-container class="py-10" style="max-width: 520px;">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">Criar conta</v-card-title>
      <v-card-subtitle>Informe seus dados para se registrar.</v-card-subtitle>

      <v-card-text>
        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          class="mb-4"
          :text="error"
        />
        <v-alert
          v-if="success"
          type="success"
          variant="tonal"
          class="mb-4"
          :text="success"
        />
        <v-form ref="formRef" v-model="isValid" @submit.prevent="onSubmit">
          <v-text-field
            v-model="nome"
            label="Nome"
            prepend-inner-icon="mdi-account"
            :rules="[rules.required]"
            density="comfortable"
            autocomplete="name"
          />
          <v-text-field
            v-model="email"
            label="E-mail"
            type="email"
            prepend-inner-icon="mdi-email"
            :rules="[rules.required, rules.email]"
            density="comfortable"
            autocomplete="email"
          />
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            prepend-inner-icon="mdi-lock"
            :rules="[rules.required, rules.min(6)]"
            density="comfortable"
            autocomplete="new-password"
          />

          <v-btn
            block
            color="primary"
            class="mt-2"
            :loading="submitting"
            type="submit"
          >
            Criar conta
          </v-btn>

          <div class="text-center mt-4">
            <span>Já possui conta?</span>
            <v-btn variant="text" to="/login">Entrar</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
/**
 * RegisterView.vue
 * - Envia POST /usuarios e exibe feedback
 */
import { ref } from 'vue'
import { registerUser } from '../api/auth'

const nome = ref('')
const email = ref('')
const senha = ref('')

const isValid = ref(false)
const submitting = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const formRef = ref()

/** Regras simples de validação para Vuetify. */
const rules = {
  required: (v: string) => !!v || 'Obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
  min: (n: number) => (v: string) => (v?.length >= n) || `Mínimo de ${n} caracteres`
}

/** Submete o cadastro de usuário. */
async function onSubmit() {
  error.value = null
  success.value = null
  // @ts-expect-error Vuetify ref type
  const ok = await formRef.value?.validate()
  if (!ok.valid) return
  submitting.value = true
  try {
    await registerUser({ nome: nome.value, email: email.value, senha: senha.value })
    success.value = 'Conta criada com sucesso! Você já pode fazer login.'
  } catch (err: unknown) {
    error.value = 'Falha ao cadastrar. Verifique os dados e tente novamente.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* Sem estilos adicionais por ora */
</style>
