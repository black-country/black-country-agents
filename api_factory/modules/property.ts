import { GATEWAY_ENDPOINT } from '../axios.config'

interface CreatePropertyPayload {
  name: string;
  description: string;
  price: number;
  type: string;
  status: string;
  country: string;
  state: string;
  city: string;
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  [key: string]: any;
}

interface UpdatePropertyPayload {
  name?: string;
  description?: string;
  price?: number;
  isFeatured?: boolean;
  [key: string]: any;
}

interface PropertyQueryParams {
  page?: number;
  perPage?: number;
  type?: string;
  status?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const property_api = {
  $_create_property: (payload: CreatePropertyPayload) => {
    const url = '/properties'
    return GATEWAY_ENDPOINT.post(url, payload)
  },
  
  $_get_all_properties: (params?: PropertyQueryParams) => {
    const url = '/properties'
    return GATEWAY_ENDPOINT.get(url, { params })
  },
  
  $_get_property_by_id: (propertyId: string) => {
    const url = `/properties/${propertyId}`
    return GATEWAY_ENDPOINT.get(url)
  },
  
  $_get_properties_by_owner: (propertyOwnerId: string) => {
    const url = `/owners/${propertyOwnerId}/properties`
    return GATEWAY_ENDPOINT.get(url)
  },
  
  $_update_property: (propertyId: string, payload: UpdatePropertyPayload) => {
    const url = `/properties/${propertyId}`
    return GATEWAY_ENDPOINT.patch(url, payload)
  },
  
  $_delete_property: (propertyId: string) => {
    const url = `/properties/${propertyId}`
    return GATEWAY_ENDPOINT.delete(url)
  },
  
  $_toggle_property_active: (propertyId: string) => {
    const url = `/properties/${propertyId}/toggle-active`
    return GATEWAY_ENDPOINT.patch(url)
  },
  
  $_toggle_property_featured: (propertyId: string) => {
    const url = `/properties/${propertyId}/toggle-featured`
    return GATEWAY_ENDPOINT.patch(url)
  },
  
  $_add_media_to_property: (propertyId: string, payload: { mediaUrls: string[] }) => {
    const url = `/properties/${propertyId}/media/photos`
    return GATEWAY_ENDPOINT.post(url, payload)
  },
  
  $_remove_media_from_property: (propertyId: string, mediaUrl: string) => {
    const url = `/properties/${propertyId}/media/photos?mediaUrl=${encodeURIComponent(mediaUrl)}`
    return GATEWAY_ENDPOINT.delete(url)
  },
  
  $_add_virtual_tour: (propertyId: string, payload: { virtualTourUrl: string }) => {
    const url = `/properties/${propertyId}/virtual-tour`
    return GATEWAY_ENDPOINT.post(url, payload)
  },
  
  $_remove_virtual_tour: (propertyId: string) => {
    const url = `/properties/${propertyId}/virtual-tour`
    return GATEWAY_ENDPOINT.delete(url)
  }
}