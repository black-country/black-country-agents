import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"
import { useUser } from "@/composables/modules/auth/user"

// ===== LOGIN =====
export const useLogin = () => {
  const loading = ref(false)
  const { createUser, user, token } = useUser()
  const { showToast } = useCustomToast()

  const login = async (payload: { email: string; password: string; app: 'admin' | 'customer' | 'property-owner' }) => {
    loading.value = true
    try {
      const res = await auth_api.$_login(payload)
      console.log(res, 'rse here')
      if ([200, 201].includes(res.status)) {
        showToast({ 
          title: "Success", 
          message: "Login successful!", 
          toastType: "success", 
          duration: 3000 
        })
        createUser(res.data)
        return res.data
      } else {
        showToast({ 
          title: "Error", 
          message: res?.data?.error || "Login failed", 
          toastType: "error", 
          duration: 3000 
        })
        return null
      }
    } catch (err: any) {
      showToast({ 
        title: "Error", 
        message: err?.response?.data?.message || err?.message || "Invalid credentials", 
        toastType: "error", 
        duration: 3000 
      })
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, login }
}