import { ref } from "vue"
import { amenity_api } from "@/api_factory/modules/amenity"
import { useCustomToast } from "@/composables/core/useCustomToast"


export const useDeleteAmenity = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const deleteAmenity = async (amenityId: string) => {
    loading.value = true
    try {
      const res = (await amenity_api.$_delete_amenity(amenityId)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Amenity deleted successfully",
          toastType: "success",
          duration: 3000,
        })
        return true
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to delete amenity",
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

  return { loading, deleteAmenity }
}