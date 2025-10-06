export interface OnboardingData {
  step: number
  ownerType: 'individual' | 'business'
  legalName: string
  email: string
  address: string
  phone: string
  businessName?: string
  businessEmail?: string
  businessAddress?: string
  ninNumber?: string
  cacNumber?: string
  signatureName?: string
}

export const useOnboarding = () => {
  const currentStep = ref(1)
  const totalSteps = ref(4)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  const formData = ref<OnboardingData>({
    step: 1,
    ownerType: 'individual',
    legalName: '',
    email: '',
    address: '',
    phone: '',
    businessName: '',
    businessEmail: '',
    businessAddress: '',
    ninNumber: '',
    cacNumber: '',
    signatureName: ''
  })

  const nextStep = () => {
    if (currentStep.value < totalSteps.value) {
      currentStep.value++
      formData.value.step = currentStep.value
    }
  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
      formData.value.step = currentStep.value
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps.value) {
      currentStep.value = step
      formData.value.step = step
    }
  }

  const updateFormData = (data: Partial<OnboardingData>) => {
    formData.value = { ...formData.value, ...data }
  }

  const submitStep = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (currentStep.value === 2) {
        // Email verification step
        return { success: true, requiresVerification: true }
      } else if (currentStep.value === 3) {
        // KYC/CAC verification step
        return { success: true, requiresVerification: true }
      } else {
        nextStep()
        return { success: true }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Submission failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const completeOnboarding = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Navigate to login page
      await navigateTo('/auth/login')
      return { success: true }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete onboarding'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentStep: readonly(currentStep),
    totalSteps: readonly(totalSteps),
    formData: readonly(formData),
    isLoading: readonly(isLoading),
    error: readonly(error),
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    submitStep,
    completeOnboarding
  }
}