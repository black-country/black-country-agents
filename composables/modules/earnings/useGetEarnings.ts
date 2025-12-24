import { earnings_api } from '@/api_factory/modules/earnings'
import { useUser } from '@/composables/auth/user'

// Debounce function to limit the rate at which a function can be called
function debounce(fn: Function, delay: number) {
    let timeoutId: number | undefined;
    const debounced = function (...args: any) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };

    debounced.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    return debounced;
}

export const useGetEarnings = () => {
    const { user } = useUser()
    const loading = ref(false);
    const earningsList = ref([] as any);
    const searchQuery = ref<string>("");
    const metadata = ref({
        page: 1,
        perPage: 7,
        total: 100,
        pages: 0,
    });

    // Filters including dates and agentId
    const { $_get_earnings } = earnings_api;
    const getEarnings = async () => {
        console.log(user, 'here')
        loading.value = true;
        try {
            const res = await $_get_earnings(user.value.id, metadata.value) as any;
        console.log(res, 'res hee')
            if (res.type !== 'ERROR') {
                // Sort properties by 'createdAt' in descending order
                earningsList.value = res?.data?.result
                metadata.value = res?.data?.metadata;
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            loading.value = false;
        }
    };

    // Debounced version of getEarnings to avoid multiple API calls
    const debouncedGetEarnings = debounce(getEarnings, 300); // 300ms delay

    watch( [metadata.value.page, metadata.value.perPage], // Watch only page and perPage
        () => {
            // debouncedGetEarnings(); // Use the debounced version here
            getEarnings()
        }
    );

    const setPaginationObj = (val: number) => {
        if (metadata.value.page !== val) {
            metadata.value.page = val;
        }
    };

    onMounted(() => {
        getEarnings()
        // Call debounced function once on mount
        // debouncedGetEarnings();
    });

    onBeforeUnmount(() => {
        // Clear timeout to avoid memory leaks
        debouncedGetEarnings.cancel?.();
    });

    return {
        getEarnings,
        loading,
        earningsList,
        searchQuery,
        metadata,
        setPaginationObj
    };
};
