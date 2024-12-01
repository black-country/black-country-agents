import { ref, computed } from 'vue';

export function usePropertyImages(property: any) {
  const propertyImages = ref<{ name: string; image: string }[]>([]);

  // Extract property cover images
  const extractPropertyImages = () => {
    if (property.images && Array.isArray(property.images)) {
      const coverImages = property.images.map((image: string) => ({
        name: 'Property Cover Image',
        image,
      }));
      propertyImages.value.push(...coverImages);
    } else {
      console.warn('Property images not found or not an array');
    }
  };

  // Extract common area images
  const extractCommonAreaImages = () => {
    if (property.commonAreas && Array.isArray(property.commonAreas)) {
      const commonAreaImages = property.commonAreas.flatMap((area: any) =>
        area.images && Array.isArray(area.images)
          ? area.images.map((image: string) => ({
              name: `Common Area - ${area.name}`,
              image,
            }))
          : []
      );
      propertyImages.value.push(...commonAreaImages);
    } else {
      console.warn('Property commonAreas not found or not an array');
    }
  };

  // Extract room feature images
  const extractRoomFeatureImages = () => {
    if (property.rooms && Array.isArray(property.rooms)) {
      const roomImages = property.rooms.flatMap((room: any) =>
        room.features && Array.isArray(room.features)
          ? room.features.flatMap((feature: any) =>
              feature.images && Array.isArray(feature.images)
                ? feature.images.map((image: string) => ({
                    name: `Room ${room.name} Feature - ${feature.name}`,
                    image,
                  }))
                : []
            )
          : []
      );
      propertyImages.value.push(...roomImages);
    } else {
      console.warn('Property rooms not found or not an array');
    }
  };

  // Combine all extraction functions
  const extractAllImages = () => {
    extractPropertyImages();
    extractCommonAreaImages();
    extractRoomFeatureImages();
  };

  // Call the function to populate the array
  extractAllImages();

  return {
    propertyImages: computed(() => propertyImages.value),
  };
}
