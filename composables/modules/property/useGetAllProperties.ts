import { ref } from "vue"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetAllProperties = () => {
  const loading = ref(false)
  const properties = ref([])
  const { showToast } = useCustomToast()

  const fetchAllProperties = async (params?: any) => {
    loading.value = true
    try {
      const res = (await property_api.$_get_all_properties(params)) as any
      console.log(res, 'rse here oo')
      if (res.type !== "ERROR") {
        properties.value = res?.data?.result
        return res?.data?.result
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

  onMounted(() => {
    fetchAllProperties()
  })
  return { loading, properties, fetchAllProperties }
}