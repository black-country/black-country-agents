import { ref } from "vue"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useAddMediaToProperty = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const addMediaToProperty = async (propertyId: string, mediaUrls: string[]) => {
    loading.value = true
    try {
      const res = (await property_api.$_add_media_to_property(propertyId, { mediaUrls })) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Media added successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to add media",
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

  return { loading, addMediaToProperty }
}