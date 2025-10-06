import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"


export const useVerifyOtpEmail = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const verifyOtpEmail = async (payload: {
    email: string
    otp: string
    app: 'customer' | 'property-owner' | 'admin'
  }) => {
    loading.value = true
    try {
      const res = await auth_api.$_verify_otp_email({ 
        ...payload, 
        type: 'email_verification' 
      })
      if ([200, 201].includes(res.status)) {
        showToast({ 
          title: "Success", 
          message: "Email verified successfully!", 
          toastType: "success", 
          duration: 3000 
        })
        return res.data
      } else {
        showToast({ 
          title: "Error", 
          message: res?.data?.error || "Invalid or expired OTP", 
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

  return { loading, verifyOtpEmail }
}