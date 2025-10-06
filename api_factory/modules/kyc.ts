import { GATEWAY_ENDPOINT } from '../axios.config'

interface KYCField {
    name: string;
    value: string;
}

interface SubmitKYCPayload {
    type: 'NIN' | 'CAC';
    for: 'individual' | 'business';
    fields: KYCField[];
}

interface UpdateKYCPayload {
    type?: 'NIN' | 'CAC';
    for?: 'individual' | 'business';
    fields?: KYCField[];
}

export const kyc_api = {
    // KYC endpoints
    $_submit_kyc: (payload: SubmitKYCPayload) => {
        const url = '/kyc'
        return GATEWAY_ENDPOINT.post(url, payload)
    },
    
    $_get_kyc_by_property_owner: (propertyOwnerId: string) => {
        const url = `/kyc/property-owner/${propertyOwnerId}`
        return GATEWAY_ENDPOINT.get(url)
    },
    
    $_update_kyc: (id: string, payload: UpdateKYCPayload) => {
        const url = `/kyc/${id}`
        return GATEWAY_ENDPOINT.patch(url, payload)
    },
    
    $_delete_kyc: (id: string) => {
        const url = `/kyc/${id}`
        return GATEWAY_ENDPOINT.delete(url)
    },

    // Signature endpoints
    $_attach_signature: (formData: FormData) => {
        const url = '/property-owners/profile'
        return GATEWAY_ENDPOINT.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    
    $_remove_signature: (propertyOwnerId: string) => {
        const url = `/property-owners/${propertyOwnerId}/signature`
        return GATEWAY_ENDPOINT.delete(url)
    }
}