
import { ref } from "vue"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRemoveVirtualTour = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const removeVirtualTour = async (propertyId: string) => {
    loading.value = true
    try {
      const res = (await property_api.$_remove_virtual_tour(propertyId)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Virtual tour removed successfully",
          toastType: "success",
          duration: 3000,
        })
        return true
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to remove virtual tour",
          toastType: "error",
          duration: 3000,
        })
        return false
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error?.message || "Something went wrong",
        toastType: "error",
        duration: 3000,
      })
      return false
    } finally {
      loading.value = false
    }
  }

  return { loading, removeVirtualTour }
}