import { ref, onMounted } from "vue"
import { auth_api } from "@/api_factory/modules/auth"

export const useFetchProfile = () => {
  const loading = ref(false)
  const profile = ref(null)
  const error = ref(null)

  const fetchProfile = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await auth_api.getProfile() as any

      if ([200, 201].includes(res?.status)) {
        profile.value = res.data
        return res.data
      } else {
        error.value = res?.message || "Unable to fetch profile"
      }
      
    } catch (err: any) {
      error.value = err?.message || "Network error fetching profile"
    } finally {
      // ✅ Always stop loading (success OR error)
      loading.value = false
    }
  }

  onMounted(() => {
    fetchProfile()
  })

  return { loading, fetchProfile, profile, error }
}
