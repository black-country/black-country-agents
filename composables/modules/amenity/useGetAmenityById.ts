import { ref } from "vue"
import { amenity_api } from "@/api_factory/modules/amenity"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetAmenityById = () => {
  const loading = ref(false)
  const amenity = ref(null)
  const { showToast } = useCustomToast()

  const fetchAmenityById = async (amenityId: string) => {
    loading.value = true
    try {
      const res = (await amenity_api.$_get_amenity_by_id(amenityId)) as any
      if (res.type !== "ERROR") {
        amenity.value = res.data
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to fetch amenity",
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

  return { loading, amenity, fetchAmenityById }
}