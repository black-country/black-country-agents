
import { ref } from "vue"
import { amenity_api } from "@/api_factory/modules/amenity"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useUpdateAmenity = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const updateAmenity = async (amenityId: string, payload: any) => {
    loading.value = true
    try {
      const res = (await amenity_api.$_update_amenity(amenityId, payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Amenity updated successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to update amenity",
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

  return { loading, updateAmenity }
}