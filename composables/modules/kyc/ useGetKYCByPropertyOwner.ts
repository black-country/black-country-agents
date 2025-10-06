
import { ref } from "vue"
import { kyc_api } from "@/api_factory/modules/kyc"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetKYCByPropertyOwner = () => {
  const loading = ref(false)
  const kyc = ref(null)
  const { showToast } = useCustomToast()

  const fetchKYCByPropertyOwner = async (propertyOwnerId: string) => {
    loading.value = true
    try {
      const res = (await kyc_api.$_get_kyc_by_property_owner(propertyOwnerId)) as any
      if (res.type !== "ERROR") {
        kyc.value = res.data
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to fetch KYC details",
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
    kyc,
    fetchKYCByPropertyOwner
  }
}