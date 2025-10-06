import { ref } from "vue"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useAddVirtualTour = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const addVirtualTour = async (propertyId: string, virtualTourUrl: string) => {
    loading.value = true
    try {
      const res = (await property_api.$_add_virtual_tour(propertyId, { virtualTourUrl })) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Virtual tour added successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to add virtual tour",
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

  return { loading, addVirtualTour }
}