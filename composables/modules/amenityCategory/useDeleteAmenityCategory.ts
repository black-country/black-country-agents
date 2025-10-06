
import { ref } from "vue"
import { amenity_category_api } from "@/api_factory/modules/amenity_category"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useDeleteAmenityCategory = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const deleteAmenityCategory = async (categoryId: string) => {
    loading.value = true
    try {
      const res = (await amenity_category_api.$_delete_amenity_category(categoryId)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Amenity category deleted successfully",
          toastType: "success",
          duration: 3000,
        })
        return true
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to delete amenity category",
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

  return { loading, deleteAmenityCategory }
}