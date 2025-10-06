
// import { ref } from "vue"
// import { property_api } from "@/api_factory/modules/property"
// import { useCustomToast } from "@/composables/core/useCustomToast"

// export const useGetPropertyById = () => {
//   const loading = ref(false)
//   const property = ref(null)
//   const { showToast } = useCustomToast()

//   const fetchPropertyById = async (propertyId: string) => {
//     loading.value = true
//     try {
//       const res = (await property_api.$_get_property_by_id(propertyId)) as any
//       if (res.type !== "ERROR") {
//         property.value = res.data
//         return res.data
//       } else {
//         showToast({
//           title: "Error",
//           message: res?.data?.error || "Failed to fetch property",
//           toastType: "error",
//           duration: 3000,
//         })
//         return null
//       }
//     } catch (error: any) {
//       showToast({
//         title: "Error",
//         message: error?.message || "Something went wrong",
//         toastType: "error",
//         duration: 3000,
//       })
//       return null
//     } finally {
//       loading.value = false
//     }
//   }

//   return { loading, property, fetchPropertyById }
// }


import { ref } from "vue"
import { useRoute } from "vue-router"
import { property_api } from "@/api_factory/modules/property"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetPropertyById = () => {
  const loading = ref(false)
  const property = ref(null)
  const { showToast } = useCustomToast()
  const route = useRoute()

  const fetchPropertyById = async (propertyId?: string) => {
    const id = propertyId || route.params.id as any

    if (!id) {
      showToast({
        title: "Error",
        message: "Property ID not provided or found in route.",
        toastType: "error",
        duration: 3000,
      })
      return null
    }

    loading.value = true
    try {
      const res = (await property_api.$_get_property_by_id(id)) as any
      console.log(res.data, 'res here')
      if ([200, 201].includes(res.status)) {
        property.value = res.data
        return res.data
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to fetch property",
          toastType: "error",
          duration: 3000,
        })
        return null
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchPropertyById()
  })

  return { loading, property, fetchPropertyById }
}
