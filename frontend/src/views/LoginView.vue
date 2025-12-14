<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/utils/api'

const API_URL = ''
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const handleLogin = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(data.message || 'Credenciais inválidas.')
      }
      throw new Error(data.message || 'Erro desconhecido.')
    }

    // Login bem-sucedido
    auth.setToken(data.token)
    auth.setRefreshToken(data.refreshToken)

    // Redireciona para o dashboard do admin
    router.push({ name: 'admin-dashboard' })
  } catch (error) {
    console.error('Erro no login:', error)
    errorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="neobrutalism login-page-wrapper">
    <div class="login-container section-padding">
      <h2 class="section-title">Admin Login</h2>

      <form class="contact-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="form-input"
            v-model="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-input"
            v-model="password"
            required
          />
        </div>

        <div
          v-if="errorMessage"
          class="feedback-message error"
          style="color: red; margin-bottom: 15px; text-align: center"
        >
          {{ errorMessage }}
        </div>

        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Aguarde...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para centralizar o formulário de login */
.login-page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
}

.login-container {
  max-width: 500px;
  width: 100%;
  margin: 0 20px;
}
</style>