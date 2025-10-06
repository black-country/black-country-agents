import { GATEWAY_ENDPOINT } from '../axios.config'

interface CreateAmenityPayload {
  name: string;
  icon: string;
  categoryId: string;
  propertyId: string;
}

interface UpdateAmenityPayload {
  name?: string;
  icon?: string;
}

interface AmenityQueryParams {
  categoryId?: string;
  propertyId?: string;
  name?: string;
}

export const amenity_api = {
  $_create_amenity: (payload: CreateAmenityPayload) => {
    const url = '/amenities'
    return GATEWAY_ENDPOINT.post(url, payload)
  },
  
  $_get_all_amenities: (params?: AmenityQueryParams) => {
    const url = '/amenities'
    return GATEWAY_ENDPOINT.get(url, { params })
  },
  
  $_get_amenity_by_id: (amenityId: string) => {
    const url = `/amenities/${amenityId}`
    return GATEWAY_ENDPOINT.get(url)
  },
  
  $_get_amenities_by_property: (propertyId: string) => {
    const url = `/amenities/property/${propertyId}`
    return GATEWAY_ENDPOINT.get(url)
  },
  
  $_get_amenities_by_category: (categoryId: string) => {
    const url = `/amenities/category/${categoryId}`
    return GATEWAY_ENDPOINT.get(url)
  },
  
  $_update_amenity: (amenityId: string, payload: UpdateAmenityPayload) => {
    const url = `/amenities/${amenityId}`
    return GATEWAY_ENDPOINT.patch(url, payload)
  },
  
  $_delete_amenity: (amenityId: string) => {
    const url = `/amenities/${amenityId}`
    return GATEWAY_ENDPOINT.delete(url)
  },
  
  $_delete_all_amenities_by_property: (propertyId: string) => {
    const url = `/amenities/property/${propertyId}`
    return GATEWAY_ENDPOINT.delete(url)
  }
}