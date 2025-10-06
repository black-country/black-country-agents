import { ref } from "vue"
import { amenity_category_api } from "@/api_factory/modules/amenity_category"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetAllAmenityCategories = () => {
  const loading = ref(false)
  const categories = ref([])
  const { showToast } = useCustomToast()

  const fetchAllAmenityCategories = async (params?: any) => {
    loading.value = true
    try {
      const res = (await amenity_category_api.$_get_all_amenity_categories(params)) as any
      if (res.type !== "ERROR") {
        categories.value = res.data
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to fetch amenity categories",
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

  return { loading, categories, fetchAllAmenityCategories }
}