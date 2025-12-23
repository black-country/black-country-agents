// composables/modules/auth/useRegister.ts
import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRegister = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()
  const router = useRouter()

  const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
});

  const register = async (data: {
    name: string
    email: string
    phone: string
    password: string
  }) => {
    loading.value = true
    error.value = null
    try {
      const res = (await auth_api.register(data)) as any
      router.push('/login')
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Registration successful",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } 
    }  finally {
      loading.value = false
    }
  }

  return { loading, error, register, form }
}
