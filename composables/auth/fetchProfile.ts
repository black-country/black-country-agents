import { auth_api } from '@/api_factory/modules/auth'
import { useUser } from '@/composables/auth/user'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();


export const use_tenant_profile = () => {
  const profileObj = ref({}) as any
  const loading = ref(false);
  const { updateUser, user } = useUser()
 console.log(user.value.id)
  const fetch_profile = async () => {
    loading.value = true;
    try {
      console.log(user.value, 'here oo')
      const res = await auth_api.$_fetch_profile(user.value.id);
     console.log(res.data, 'fdata hereooo')
      if(res.status == 200 || res.status == 201){
         profileObj.value = res.data
		 updateUser(profileObj.value)
      }

    } catch (error) {
      showToast({
        title: "Error",
        message: 'Error Fetching profile.',
        toastType: "error",
        duration: 3000
      });
        
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetch_profile()
  })

  return { fetch_profile, loading, profileObj };
};
