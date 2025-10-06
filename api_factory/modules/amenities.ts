import { GATEWAY_ENDPOINT } from '../axios.config'

interface GetAmenitiesParams {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    isActive?: boolean;
}

interface CreateAmenityPayload {
    name: string;
    description: string;
    icon: string;
    categoryId: string;
}

interface UpdateAmenityPayload {
    name?: string;
    description?: string;
    icon?: string;
    categoryId?: string;
}

interface CreateCategoryPayload {
    name: string;
    description?: string;
    icon?: string;
}

interface UpdateCategoryPayload {
    name?: string;
    description?: string;
    icon?: string;
}

interface GetCategoriesParams {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
}

export const amenities_api = {
    // Amenities endpoints
    $_create_amenity: (payload: CreateAmenityPayload) => {
        const url = '/amenities'
        return GATEWAY_ENDPOINT.post(url, payload)
    },
    
    $_get_all_amenities: (params: GetAmenitiesParams = {}) => {
        const { 
            page = 1, 
            limit = 10, 
            search, 
            categoryId,
            isActive
        } = params;

        const queryParams: Record<string, string | number> = {
            page,
            limit
        };

        if (search) queryParams.search = search;
        if (categoryId) queryParams.categoryId = categoryId;
        if (isActive !== undefined) queryParams.isActive = String(isActive);

        const searchParams = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
            searchParams.append(key, String(value));
        });

        const url = `/amenities?${searchParams.toString()}`;
        return GATEWAY_ENDPOINT.get(url);
    },
    
    $_get_amenity_by_id: (id: string) => {
        const url = `/amenities/${id}`
        return GATEWAY_ENDPOINT.get(url)
    },
    
    $_update_amenity: (id: string, payload: UpdateAmenityPayload) => {
        const url = `/amenities/${id}`
        return GATEWAY_ENDPOINT.patch(url, payload)
    },
    
    $_delete_amenity: (id: string) => {
        const url = `/amenities/${id}`
        return GATEWAY_ENDPOINT.delete(url)
    },
    
    $_toggle_amenity_status: (id: string) => {
        const url = `/amenities/${id}/toggle-active`
        return GATEWAY_ENDPOINT.patch(url)
    },

    // Amenity Categories endpoints
    $_create_amenity_category: (payload: CreateCategoryPayload) => {
        const url = '/amenities/categories'
        return GATEWAY_ENDPOINT.post(url, payload)
    },
    
    $_get_all_amenity_categories: (params: GetCategoriesParams = {}) => {
        const { 
            page = 1, 
            limit = 10, 
            search,
            isActive
        } = params;

        const queryParams: Record<string, string | number> = {
            page,
            limit
        };

        if (search) queryParams.search = search;
        if (isActive !== undefined) queryParams.isActive = String(isActive);

        const searchParams = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
            searchParams.append(key, String(value));
        });

        const url = `/amenities/categories?${searchParams.toString()}`;
        return GATEWAY_ENDPOINT.get(url);
    },
    
    $_update_amenity_category: (id: string, payload: UpdateCategoryPayload) => {
        const url = `/amenities/categories/${id}`
        return GATEWAY_ENDPOINT.patch(url, payload)
    },
    
    $_delete_amenity_category: (id: string) => {
        const url = `/amenities/categories/${id}`
        return GATEWAY_ENDPOINT.delete(url)
    },
    
    $_toggle_category_status: (id: string) => {
        const url = `/amenities/categories/${id}/toggle-active`
        return GATEWAY_ENDPOINT.patch(url)
    }
}