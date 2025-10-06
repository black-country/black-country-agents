import { ref } from "vue"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateProperty = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createProperty = async (payload: any) => {
    loading.value = true
    try {
      const res = (await property_api.$_create_property(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Property created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to create property",
          toastType: "error",
          duration: 3000,
        })
        return null
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error?.message || "Something went wrong",
        toastType: "error",
        duration: 3000,
      })
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, createProperty }
}
