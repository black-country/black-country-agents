import { ref, onMounted } from 'vue';
import { property_api } from '@/api_factory/modules/property';

export const useFetchPropertiesByLocation = () => {
    const loading = ref(false);
    const propertyLocation = ref([] as any);
    const error = ref(null) as Record<string, any>
    const userLocation = ref({
        latitude: null,
        longitude: null
    }) as any

    const { $_mainlaind_island_property_filter } = property_api;

    const fetchUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser.'));
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (err) => reject(err)
                );
            }
        });
    };

    const fetchPropertiesByLocation = async () => {
        loading.value = true;
        error.value = null;

        try {
            const location = await fetchUserLocation();
            userLocation.value = location;

            const res = await $_mainlaind_island_property_filter(
                userLocation.value.longitude,
                userLocation.value.latitude
            ) as any;

            console.log(res, 'rse here')

            if (res.type !== 'ERROR') {
                propertyLocation.value = res?.data ?? [];
            } else {
                error.value = 'Error fetching properties.';
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch user location or properties.';
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchPropertiesByLocation();
    });

    return {
        loading,
        propertyLocation,
        fetchPropertiesByLocation,
        error,
        userLocation
    };
};
