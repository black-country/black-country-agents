import { visitation_api } from "@/api_factory/modules/visitation";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useUser } from "@/composables/auth/user";
import { ref, onMounted, computed } from "vue";

export const useFetchScheduledVisitations = () => {
  const { showToast } = useCustomToast();
  const visitations = ref([]);
  const { user } = useUser();
  const loading = ref(false);

  // Search query and filter settings
  const searchQuery = ref('');
  const filteredVisitations = computed(() => {
    if (!searchQuery.value) return visitations.value;
    
    return visitations.value.filter(visit => {
      const fullName = `${visit.tenant.firstName} ${visit.tenant.lastName}`.toLowerCase();
      const propertyName = visit?.house?.name?.toLowerCase();
      const status = visit.status.toLowerCase();

      // Apply search filter on full name, property name, and status
      return fullName.includes(searchQuery.value.toLowerCase()) ||
             (propertyName && propertyName.includes(searchQuery.value.toLowerCase())) ||
             status.includes(searchQuery.value.toLowerCase());
    });
  });

  const getScheduledVisitations = async () => {
    loading.value = true;
    const res = (await visitation_api.$_fetch_scheduled_visitations(user.value.id)) as any;
    if (res.type !== "ERROR") {
      visitations.value = res.data.result;
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

  onMounted(() => {
    getScheduledVisitations();
  });

  return { getScheduledVisitations, loading, visitations, searchQuery, filteredVisitations };
};
