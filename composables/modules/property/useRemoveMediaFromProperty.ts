
import { ref } from "vue"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"


export const useRemoveMediaFromProperty = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const removeMediaFromProperty = async (propertyId: string, mediaUrl: string) => {
    loading.value = true
    try {
      const res = (await property_api.$_remove_media_from_property(propertyId, mediaUrl)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Media removed successfully",
          toastType: "success",
          duration: 3000,
        })
        return true
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to remove media",
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

  return { loading, removeMediaFromProperty }
}