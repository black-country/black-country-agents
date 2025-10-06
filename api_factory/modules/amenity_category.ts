import { GATEWAY_ENDPOINT } from '../axios.config'

interface CreateAmenityCategoryPayload {
  name: string;
  description: string;
  isActive?: boolean;
}

interface UpdateAmenityCategoryPayload {
  name?: string;
  description?: string;
}

interface CategoryQueryParams {
  isActive?: boolean;
  name?: string;
}

export const amenity_category_api = {
  $_create_amenity_category: (payload: CreateAmenityCategoryPayload) => {
    const url = '/amenities/categories'
    return GATEWAY_ENDPOINT.post(url, payload)
  },
  
  $_get_all_amenity_categories: (params?: CategoryQueryParams) => {
    const url = '/amenities/categories'
    return GATEWAY_ENDPOINT.get(url, { params })
  },
  
  $_get_amenity_category_by_id: (categoryId: string) => {
    const url = `/amenities/categories/${categoryId}`
    return GATEWAY_ENDPOINT.get(url)
  },
  
  $_update_amenity_category: (categoryId: string, payload: UpdateAmenityCategoryPayload) => {
    const url = `/amenities/categories/${categoryId}`
    return GATEWAY_ENDPOINT.patch(url, payload)
  },
  
  $_delete_amenity_category: (categoryId: string) => {
    const url = `/amenities/categories/${categoryId}`
    return GATEWAY_ENDPOINT.delete(url)
  },
  
  $_toggle_category_active: (categoryId: string) => {
    const url = `/amenities/categories/${categoryId}/toggle-active`
    return GATEWAY_ENDPOINT.patch(url)
  }
}