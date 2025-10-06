import { ref } from "vue"
import { media_api } from "@/api_factory/modules/media"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useUploadMultipleMedia = () => {
  const loading = ref(false)
  const uploadProgress = ref(0)
  const { showToast } = useCustomToast()

  const uploadMultipleMedia = async (propertyId: string, mediaType: 'photos' | 'videos' | 'plans', files: File[]) => {
    loading.value = true
    uploadProgress.value = 0
    
    if (files.length > 10) {
      showToast({
        title: "Error",
        message: "Maximum 10 files allowed per upload",
        toastType: "error",
        duration: 3000,
      })
      loading.value = false
      return null
    }

    try {
      const res = (await media_api.$_upload_multiple_media(propertyId, mediaType, files)) as any
      if (res.type !== "ERROR") {
        uploadProgress.value = 100
        showToast({
          title: "Success",
          message: `${files.length} media file(s) uploaded successfully`,
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

  return { loading, uploadProgress, uploadMultipleMedia }
}