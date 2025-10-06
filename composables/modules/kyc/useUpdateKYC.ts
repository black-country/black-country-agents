import { ref } from "vue"
import { kyc_api } from "@/api_factory/modules/kyc"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useUpdateKYC = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const updateKYC = async (id: string, payload: any) => {
    loading.value = true
    try {
      const res = (await kyc_api.$_update_kyc(id, payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "KYC updated successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to update KYC",
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
    updateKYC
  }
}