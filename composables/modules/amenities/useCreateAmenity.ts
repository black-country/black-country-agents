import { ref } from "vue"
import { amenities_api } from "@/api_factory/modules/amenities"
import { useCustomToast } from "@/composables/core/useCustomToast"


export const useCreateAmenity = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createAmenity = async (payload: any) => {
    loading.value = true
    try {
      const res = (await amenities_api.$_create_amenity(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Amenity created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to create amenity",
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
    createAmenity
  }
}