import { GATEWAY_ENDPOINT } from "../axios.config";

export const property_api = {
$_fetch_properties: (page = 1, perPage = 20, searchQuery = '', agentId: string) => {
  let url = `/houses?page=${page}&perPage=${perPage}&status=published&agentId=${agentId}`
  
  if (searchQuery) {
      url += `&search=${searchQuery}`
  }

  return GATEWAY_ENDPOINT.get(url)
},

  $_fetch_single_property: (id: any) => {
    const url = `/houses/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_similar_properties: (id: any) => {
    const url = `/houses/${id}/similar`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_bookmark_listing: (payload: any) => {
    const url = '/bookmarked-houses';
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_fetch_bookmarked_listings: () => {
    const url = '/bookmarked-houses';
    return GATEWAY_ENDPOINT.get(url);
  }
};
