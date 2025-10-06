import { ref } from "vue"
import { amenities_api } from "@/api_factory/modules/amenities"
import { useCustomToast } from "@/composables/core/useCustomToast"

// ============================================
// AMENITY CATEGORIES COMPOSABLES
// ============================================

export const useGetAllAmenityCategories = () => {
  const loading = ref(false)
  const categories = ref([])
  const totalPages = ref(0)
  const totalItems = ref(0)
  const { showToast } = useCustomToast()

  const fetchAllCategories = async (params = {}) => {
    loading.value = true
    try {
      const res = (await amenities_api.$_get_all_amenity_categories(params)) as any
      if (res.type !== "ERROR") {
        categories.value = res.data.data || res.data
        totalPages.value = res.data.totalPages || 0
        totalItems.value = res.data.totalItems || 0
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to fetch categories",
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
    categories,
    totalPages,
    totalItems,
    fetchAllCategories
  }
}