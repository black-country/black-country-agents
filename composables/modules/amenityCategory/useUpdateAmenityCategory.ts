import { ref } from "vue"
import { amenity_category_api } from "@/api_factory/modules/amenity_category"
import { useCustomToast } from "@/composables/core/useCustomToast"


export const useUpdateAmenityCategory = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const updateAmenityCategory = async (categoryId: string, payload: any) => {
    loading.value = true
    try {
      const res = (await amenity_category_api.$_update_amenity_category(categoryId, payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Amenity category updated successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to update amenity category",
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

  return { loading, updateAmenityCategory }
}