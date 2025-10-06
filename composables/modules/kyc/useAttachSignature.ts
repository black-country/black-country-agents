import { ref } from "vue"
import { kyc_api } from "@/api_factory/modules/kyc"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useAttachSignature = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const attachSignature = async (file: File) => {
    loading.value = true
    try {
      const formData = new FormData()
      formData.append('signature', file)

      const res = (await kyc_api.$_attach_signature(formData)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Signature attached successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to attach signature",
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
    attachSignature
  }
}