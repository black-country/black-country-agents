import { visitation_api } from "@/api_factory/modules/visitation";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

const { showToast } = useCustomToast();

export const useUpdateScheduledVisitationStatus = () => {
  const updating = ref(false);

  const updateVisitationStatus = async (visitationId: string | number, payload: any) => {
    updating.value = true;
    try {
      const res = await visitation_api.$_update_scheduled_visitation_status(visitationId, payload) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: `Visitation status updated successfully.`,
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
    } catch (error) {
      showToast({
        title: "Error",
        message: error.message || "An error occurred while updating visitation status.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      updating.value = false;
    }
  };

  return { updateVisitationStatus, updating };
};
