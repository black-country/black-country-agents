import { ref } from "vue"
import { amenity_api } from "@/api_factory/modules/amenity"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useDeleteAllAmenitiesByProperty = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const deleteAllAmenitiesByProperty = async (propertyId: string) => {
    loading.value = true
    try {
      const res = (await amenity_api.$_delete_all_amenities_by_property(propertyId)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "All amenities deleted successfully",
          toastType: "success",
          duration: 3000,
        })
        return true
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to delete amenities",
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

  return { loading, deleteAllAmenitiesByProperty }
}