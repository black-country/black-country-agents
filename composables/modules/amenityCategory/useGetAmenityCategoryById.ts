import { ref } from "vue"
import { amenity_category_api } from "@/api_factory/modules/amenity_category"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetAmenityCategoryById = () => {
  const loading = ref(false)
  const category = ref(null)
  const { showToast } = useCustomToast()

  const fetchAmenityCategoryById = async (categoryId: string) => {
    loading.value = true
    try {
      const res = (await amenity_category_api.$_get_amenity_category_by_id(categoryId)) as any
      if (res.type !== "ERROR") {
        category.value = res.data
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to fetch amenity category",
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

  return { loading, category, fetchAmenityCategoryById }
}