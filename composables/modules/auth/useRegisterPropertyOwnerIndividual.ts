import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRegisterPropertyOwnerIndividual = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const registerPropertyOwnerIndividual = async (payload: {
    email: string
    phone: string
    password: string
    address: string
    legalName: string
  }) => {
    loading.value = true
    try {
      const res = await auth_api.$_register_property_owner_individual({ 
        ...payload, 
        app: 'property-owner',
        propertyOwnerType: 'individual'
      })
      if ([200, 201].includes(res.status)) {
        showToast({ 
          title: "Success", 
          message: "Property owner registration successful!", 
          toastType: "success", 
          duration: 3000 
        })
        return res.data
      } else {
        showToast({ 
          title: "Error", 
          message: res?.data?.error || "Registration failed", 
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

  return { loading, registerPropertyOwnerIndividual }
}