import { GATEWAY_ENDPOINT } from "../axios.config";

export const property_api = {
$_fetch_properties: (page = 1, perPage = 20, searchQuery = '', agentId: string, segmentId = '') => {
  let url = `/houses?page=${page}&perPage=${perPage}&status=published&agentId=${agentId}`
  
  if (searchQuery) {
      url += `&search=${searchQuery}`
  }

  if (segmentId) {
    url += `&segmentId=${segmentId}`
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
  },
  $_mainlaind_island_property_filter: (originLongitude: string | any, originLatitude: string | any) => {
    let url = `/utilities/location-segments?originLongitude=${originLongitude}&originLatitude=${originLatitude}`
    return GATEWAY_ENDPOINT.get(url)
  },
};
