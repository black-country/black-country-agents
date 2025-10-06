import { ref } from "vue"
import { amenities_api } from "@/api_factory/modules/amenities"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useDeleteAmenityCategory = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const deleteCategory = async (id: string) => {
    loading.value = true
    try {
      const res = (await amenities_api.$_delete_amenity_category(id)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Category deleted successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to delete category",
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
    deleteCategory
  }
}