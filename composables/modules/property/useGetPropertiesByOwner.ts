import { ref } from "vue"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetPropertiesByOwner = () => {
  const loading = ref(false)
  const properties = ref([])
  const { showToast } = useCustomToast()

  const fetchPropertiesByOwner = async (ownerId: string) => {
    loading.value = true
    try {
      const res = (await property_api.$_get_properties_by_owner(ownerId)) as any
      if (res.type !== "ERROR") {
        properties.value = res.data
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to fetch properties",
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

  return { loading, properties, fetchPropertiesByOwner }
}