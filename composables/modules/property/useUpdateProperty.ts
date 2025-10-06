import { ref } from "vue"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useUpdateProperty = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const updateProperty = async (propertyId: string, payload: any) => {
    loading.value = true
    try {
      const res = (await property_api.$_update_property(propertyId, payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Property updated successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to update property",
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

  return { loading, updateProperty }
}