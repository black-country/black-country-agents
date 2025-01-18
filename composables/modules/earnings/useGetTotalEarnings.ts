import { earnings_api } from '@/api_factory/modules/earnings'
import { useUser } from '@/composables/auth/user'

export const useGetTotalEarnings = () => {
    const loadingEarningSum = ref(false);
    const { user } = useUser()
    const earningSum = ref({} as any);
    const { $_get_total_earnings } = earnings_api
    const getEarningsSum = async () => {
        loadingEarningSum.value = true;
        try {
            const res = await $_get_total_earnings(user.value.id) as any;
            if (res.type !== 'ERROR') {
                earningSum.value = res?.data
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            loadingEarningSum.value = false;
        }
    };

    onMounted(() => {
        getEarningsSum()
    });

    return {
        getEarningsSum,
        loadingEarningSum,
        earningSum
    };
};
