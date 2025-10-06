import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRegisterCustomer = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const registerCustomer = async (payload: {
    email: string
    firstName: string
    lastName: string
    phone: string
    password: string
  }) => {
    loading.value = true
    try {
      const res = await auth_api.$_register_customer({ ...payload, app: 'customer' })
      console.log(res, 'from composable')
      if ([200, 201].includes(res.status)) {
        showToast({ 
          title: "Success", 
          message: "Customer registration successful!", 
          toastType: "success", 
          duration: 3000 
        })
        return res
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, registerCustomer }
}