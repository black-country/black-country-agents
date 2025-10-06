import { GATEWAY_ENDPOINT } from '../axios.config'

type MediaType = 'photos' | 'videos' | 'plans';

export const media_api = {
  $_upload_single_media: (propertyId: string, mediaType: MediaType, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const url = `/properties/media/single/${propertyId}/${mediaType}`
    return GATEWAY_ENDPOINT.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  $_upload_multiple_media: (propertyId: string, mediaType: MediaType, files: File[]) => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    
    const url = `/properties/media/multiple/${propertyId}/${mediaType}`
    return GATEWAY_ENDPOINT.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  $_remove_media: (propertyId: string, mediaType: MediaType, mediaUrl: string) => {
    const url = `/properties/media/${propertyId}/${mediaType}`
    return GATEWAY_ENDPOINT.delete(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: { mediaUrl }
    })
  }
}