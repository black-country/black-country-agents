import { auth_api } from '@/api_factory/modules/auth'
import { useCustomToast } from '../core/useCustomToast';
export const use_auth_forgot_password = () => {
	const { showToast } = useCustomToast();
	const Router = useRouter()
	const credential = {
		email: ref('')
	}

	const loading = ref(false)


	const disabled = computed(() => {
		return (
			loading.value || !credential.email.value
		);
	});

	const forgot_password = async () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(credential.email.value)) {
			showToast({
				title: "Error",
				message: "Invalid Email",
				toastType: "error",
				duration: 3000
			});
			return;
		}

		loading.value = true;

		try {
			const res = (await auth_api.$_verify_email({
				email: credential.email.value
			})) as any;

			if (res.type !== 'ERROR') {
				showToast({
					title: "Success",
					message: 'OTP was sent successfully',
					toastType: "success",
					duration: 3000
				});
				Router.push('/verify-email?email=' + credential.email.value);
			}
		} finally {
			loading.value = false;
		}
	};

	const setObj = (data: any) => {
		credential.email.value = data.email
	}

	return { credential, forgot_password, loading, disabled, setObj }
}
