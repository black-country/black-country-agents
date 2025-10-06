import { ref } from "vue"
import { amenity_api } from "@/api_factory/modules/amenity"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetAmenitiesByProperty = () => {
  const loading = ref(false)
  const amenities = ref([])
  const { showToast } = useCustomToast()

  const fetchAmenitiesByProperty = async (propertyId: string) => {
    loading.value = true
    try {
      const res = (await amenity_api.$_get_amenities_by_property(propertyId)) as any
      if (res.type !== "ERROR") {
        amenities.value = res.data
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to fetch amenities",
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

  return { loading, amenities, fetchAmenitiesByProperty }
}