import { visitation_api } from "@/api_factory/modules/visitation";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

const { showToast } = useCustomToast();

export const useFetchAvailabilityByHouseId = () => {
  const loading = ref(false);
  const availability = ref(null);
  const route = useRoute() as any

  const fetchAvailability = async () => {
    loading.value = true;
    try {
      const res = await visitation_api.$_fetch_availability_by_house_id(route?.params?.id) as any
      if (res.type !== "ERROR") {
        availability.value = res?.data;
        showToast({
          title: "Success",
          message: "Availability data fetched successfully.",
          toastType: "success",
          duration: 3000,
        });
      } else {
        showToast({
          title: "Error",
          message: res.data.error,
          toastType: "error",
          duration: 3000,
        });
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "An error occurred while fetching availability.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    // if(route?.parms?.id){
        fetchAvailability()
    // }
  })

  return { fetchAvailability, loading, availability };
};
