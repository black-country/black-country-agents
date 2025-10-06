import { ref } from "vue"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useDeleteProperty = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const deleteProperty = async (propertyId: string) => {
    loading.value = true
    try {
      const res = (await property_api.$_delete_property(propertyId)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Property deleted successfully",
          toastType: "success",
          duration: 3000,
        })
        return true
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to delete property",
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

  return { loading, deleteProperty }
}
