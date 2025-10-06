import { ref } from "vue"
import { amenities_api } from "@/api_factory/modules/amenities"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useDeleteAmenity = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const deleteAmenity = async (id: string) => {
    loading.value = true
    try {
      const res = (await amenities_api.$_delete_amenity(id)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Amenity deleted successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to delete amenity",
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

  return {
    loading,
    deleteAmenity
  }
}