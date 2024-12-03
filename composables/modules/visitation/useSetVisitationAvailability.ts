import { visitation_api } from "@/api_factory/modules/visitation";
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();
const route = useRoute() as any

const payload = ref({
    list: []
})
const loading = ref(false);

export const useCreateVisitationSchedule = () => {
    const router = useRouter()
  const createVisitationSchedule = async (id: any) => {
    loading.value = true;
    const res = (await visitation_api.$_set_visitation_availability(route.params.id || id, payload.value)) as any;
   console.log(res, 'here')
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: `Visitation was created for ${res?.data?.date} successfully at  ${res?.data?.time}`,
        toastType: "success",
        duration: 3000,
      });
      router.push('/dashboard/listings/visitation-schedule-success')
    } else {
      showToast({
        title: "Error",
        message: res.data.error,
        toastType: "error",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  const setPayload = (data: any) => {
    console.log(data.list, 'payload here')
    payload.value.list = data.list
  }

  return { createVisitationSchedule, loading, setPayload };
};
