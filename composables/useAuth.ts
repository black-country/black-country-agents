// composables/useAuth.ts
export const useAuth = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock authentication logic
      if (email && password) {
        await navigateTo('/dashboard')
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Authentication failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const forgotPassword = async (email: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      return { success: true }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to send reset email'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const verifyEmail = async (code: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (code.length === 6) {
        return { success: true }
      } else {
        throw new Error('Invalid verification code')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Verification failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const resetPassword = async (newPassword: string, confirmPassword: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      return { success: true }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Password reset failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    login,
    forgotPassword,
    verifyEmail,
    resetPassword
  }
}