import { ref } from "vue"
import { media_api } from "@/api_factory/modules/media"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useUploadSingleMedia = () => {
  const loading = ref(false)
  const uploadProgress = ref(0)
  const { showToast } = useCustomToast()

  const uploadSingleMedia = async (propertyId: string, mediaType: 'photos' | 'videos' | 'plans', file: File) => {
    loading.value = true
    uploadProgress.value = 0
    try {
      const res = (await media_api.$_upload_single_media(propertyId, mediaType, file)) as any
      if (res.type !== "ERROR") {
        uploadProgress.value = 100
        showToast({
          title: "Success",
          message: "Media uploaded successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to upload media",
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

  return { loading, uploadProgress, uploadSingleMedia }
}