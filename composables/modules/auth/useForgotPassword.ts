import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useForgotPassword = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const forgotPassword = async (payload: { email: string; app: 'customer' | 'property-owner' | 'admin' }) => {
    loading.value = true
    try {
      const res = await auth_api.$_forgot_password(payload)
      if ([200, 201].includes(res.status)) {
        showToast({ 
          title: "Success", 
          message: "Password reset OTP sent to your email!", 
          toastType: "success", 
          duration: 3000 
        })
        return res.data
      } else {
        showToast({ 
          title: "Error", 
          message: res?.data?.error || "Failed to send OTP", 
          toastType: "error", 
          duration: 3000 
        })
        return null
      }
    } catch (err: any) {
      showToast({ 
        title: "Error", 
        message: err?.response?.data?.message || err?.message || "Something went wrong", 
        toastType: "error", 
        duration: 3000 
      })
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, forgotPassword }
}