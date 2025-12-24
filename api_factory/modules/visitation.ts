import { GATEWAY_ENDPOINT } from "../axios.config";

export const visitation_api = {
    $_fetch_visitations: (tenantId: string | number, houseId: string | number) => {
        const url = `/visitations?tenantId=${tenantId}&houseId=${houseId}`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_delete_visitation: (id: string | number) => {
        const url = `/visitations/${id}`;
        return GATEWAY_ENDPOINT.delete(url);
      },
      $_create_visitation: (id: string | number, payload: any) => {
        const url = `/houses/${id}/visitations`;
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_set_visitation_availability: (id: string | number, payload: any) => {
        const url = `/houses/${id}/visitations/availability-days`;
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_fetch_scheduled_visitations: (agentId: string | number) => {
        const url = `/agents/${agentId}/visitations`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_fetch_availability_by_house_id: (houseId: string | number) => {
        const url = `/houses/${houseId}/visitations/availability-days`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_update_availability_status: (houseId: string | number, availabilityDayId: string | number, payload: any) => {
        const url = `/houses/${houseId}/visitations/availability-days/${availabilityDayId}`;
        return GATEWAY_ENDPOINT.patch(url, payload);
      },
      $_update_scheduled_visitation_status: (visitationId: string | number, payload: any) => {
        const url = `/visitations/${visitationId}/status`;
        return GATEWAY_ENDPOINT.patch(url, payload);
      }
};
