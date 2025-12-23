import { GATEWAY_ENDPOINT } from '../axios.config'

export const enquiry_api = {
  createEnquiry: (payload: {
    name: string
    email?: string
    phone: string
    message: string
  }) => {
    const url = "/enquiry"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

}
