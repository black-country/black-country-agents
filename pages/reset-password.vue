<template>
  <div class="min-h-screen bg-muted py-12 px-4 flex items-center">
    <div class="w-full max-w-md mx-auto">
      <div class="bg-white rounded-lg border border-border p-8">
        <h1 class="text-3xl font-bold mb-2">Reset Password</h1>
        <p class="text-foreground/60 mb-6">Enter your new password</p>

        <form @submit.prevent="handleResetPassword" class="space-y-4">
          <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {{ error }}
          </div>

          <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            {{ successMessage }}
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-2">New Password</label>
            <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="loading || form.password !== form.confirmPassword"
            class="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Resetting...</span>
            <span v-else>Reset Password</span>
          </button>
        </form>

        <p class="text-center text-foreground/60 mt-6">
          <NuxtLink to="/login" class="text-primary font-semibold hover:underline">
            Back to Sign In
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { definePageMeta } from '#imports'
import { useAuth } from '@/composables/modules/auth/useAuth'

const token = useRoute().query.token as string
const router = useRouter()
const { resetPassword, loading, error: authError } = useAuth()

definePageMeta({
  layout: 'auth',
})

const form = ref({
  password: '',
  confirmPassword: '',
})
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const handleResetPassword = async () => {
  error.value = null
  successMessage.value = null

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  try {
    await resetPassword(token, form.value.password)
    successMessage.value = 'Password reset successfully! Redirecting to login...'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err: any) {
    error.value = authError.value || 'Failed to reset password'
  }
}
</script>
