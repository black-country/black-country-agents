import { GATEWAY_ENDPOINT } from '../axios.config'
export const earnings_api = {
    $_get_earnings: (id: any, metadata: any) => {
        const url =  `/agents/${id}/earnings?page=${metadata.page}&perPage=${metadata.perPage}`
        return GATEWAY_ENDPOINT.get(url);
      },
      $_get_total_earnings: (id: any) => {
        const url =  `/agents/${id}/earnings/sum`
        return GATEWAY_ENDPOINT.get(url);
      },
}