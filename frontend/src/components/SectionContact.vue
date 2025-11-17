<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  currentStyle: String
})

const { t } = useI18n()
const API_URL = ''

// Refs para os campos do formulário
const name = ref('')
const email = ref('')
const message = ref('')

// Refs para o estado da UI
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  // Limpa mensagens anteriores
  successMessage.value = ''
  errorMessage.value = ''

  if (!name.value || !email.value || !message.value) {
    errorMessage.value = t('fillAllFields')
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value
      })
    })

    if (response.status === 201) {
      successMessage.value = t('successMessage')
      // Limpa o formulário
      name.value = ''
      email.value = ''
      message.value = ''
    } else {
      // Erro do servidor
      const data = await response.json()
      errorMessage.value = data.message || t('serverError')
    }
  } catch (error) {
    console.error('Erro ao enviar formulário:', error)
    errorMessage.value = t('serverError')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="section-contact section-padding">
    <h2 class="section-title">{{ t('contact') }}</h2>
    <div class="contact-content">
      <p>
        {{ t('contactDesc') }}
      </p>
      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">{{ t('name') }}</label>
          <input type="text" id="name" name="name" class="form-input" v-model="name" />
        </div>
        <div class="form-group">
          <label for="email">{{ t('email') }}</label>
          <input type="email" id="email" name="email" class="form-input" v-model="email" />
        </div>
        <div class="form-group">
          <label for="message">{{ t('message') }}</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            class="form-textarea"
            v-model="message"
          ></textarea>
        </div>

        <div
          v-if="successMessage"
          class="feedback-message success"
          style="color: green; margin-bottom: 15px; text-align: center"
        >
          {{ successMessage }}
        </div>
        <div
          v-if="errorMessage"
          class="feedback-message error"
          style="color: red; margin-bottom: 15px; text-align: center"
        >
          {{ errorMessage }}
        </div>

        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? t('sending') : t('sendMessage') }}
        </button>
      </form>
    </div>
  </section>
</template>