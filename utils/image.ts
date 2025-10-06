// utils/image.ts
export const generatePlaceholderImage = (width: number = 400, height: number = 300, seed?: string): string => {
  const seedParam = seed ? `?seed=${seed}` : ''
  return `https://picsum.photos/${width}/${height}${seedParam}`
}

export const getImageAlt = (property: any): string => {
  return `${property.title} - ${property.type} in ${property.address}`
}