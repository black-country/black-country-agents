import { ref } from "vue"
import { enquiry_api } from "@/api_factory/modules/enquiry"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateEnquiry = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const createEnquiry = async (payload: {
    name: string
    email?: string
    phone: string
    message: string
  }) => {
    loading.value = true
    error.value = null
    try {
      const res = (await enquiry_api.createEnquiry(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Enquiry created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to create enquiry",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to create enquiry",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, createEnquiry }
}
