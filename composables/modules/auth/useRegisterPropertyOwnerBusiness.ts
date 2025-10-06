import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"


export const useRegisterPropertyOwnerBusiness = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const registerPropertyOwnerBusiness = async (payload: {
    email: string
    phone: string
    password: string
    businessName: string
    address: string
  }) => {
    loading.value = true
    try {
      const res = await auth_api.$_register_property_owner_business({ 
        ...payload, 
        app: 'property-owner',
        propertyOwnerType: 'business'
      })
      if ([200, 201].includes(res.status)) {
        showToast({ 
          title: "Success", 
          message: "Business property owner registration successful!", 
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

  return { loading, registerPropertyOwnerBusiness }
}