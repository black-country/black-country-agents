import { ref } from "vue"
import { amenity_category_api } from "@/api_factory/modules/amenity_category"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateAmenityCategory = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createAmenityCategory = async (payload: any) => {
    loading.value = true
    try {
      const res = (await amenity_category_api.$_create_amenity_category(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Amenity category created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to create amenity category",
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

  return { loading, createAmenityCategory }
}