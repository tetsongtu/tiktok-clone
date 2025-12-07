<script lang="ts">
	import { IconUserCircle, IconSmiley, IconSpinner } from '$lib/components/icons';
	import { userStore } from '$lib/stores';
	import { Modal, Button } from '$lib/components';
	import { GUEST_USER, VALIDATION } from '$lib/constants';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();

	type View = 'options' | 'login' | 'register';
	let view = $state<View>('options');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);
	let touched = $state<Record<string, boolean>>({});

	const viewConfig = {
		options: {
			title: 'Log in to TikTok',
			footerText: "Don't have an account?",
			footerAction: 'Sign up'
		},
		login: {
			title: 'Log in',
			footerText: "Don't have an account?",
			footerAction: 'Sign up'
		},
		register: {
			title: 'Sign up for TikTok',
			footerText: 'Already have an account?',
			footerAction: 'Log in'
		}
	};

	const config = $derived(viewConfig[view]);
	const isFormValid = $derived(
		email && password && !errors.email && !errors.password &&
		(view !== 'register' || (confirmPassword && !errors.confirmPassword))
	);

	function validateField(field: string) {
		const newErrors = { ...errors };

		if (field === 'email') {
			if (!email) newErrors.email = 'Email là bắt buộc';
			else if (!VALIDATION.EMAIL_PATTERN.test(email)) newErrors.email = 'Email không hợp lệ';
			else delete newErrors.email;
		}

		if (field === 'password') {
			if (!password) newErrors.password = 'Mật khẩu là bắt buộc';
			else if (password.length < VALIDATION.PASSWORD_MIN_LENGTH)
				newErrors.password = `Mật khẩu phải có ít nhất ${VALIDATION.PASSWORD_MIN_LENGTH} ký tự`;
			else delete newErrors.password;
		}

		if (field === 'confirmPassword' && view === 'register') {
			if (!confirmPassword) newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
			else if (confirmPassword !== password) newErrors.confirmPassword = 'Mật khẩu không khớp';
			else delete newErrors.confirmPassword;
		}

		errors = newErrors;
	}

	function handleBlur(field: string) {
		touched[field] = true;
		validateField(field);
	}

	function resetForm() {
		view = 'options';
		email = '';
		password = '';
		confirmPassword = '';
		errors = {};
		touched = {};
		isSubmitting = false;
	}

	function resetAndClose() {
		resetForm();
		onClose();
	}

	async function handleSuccess(userData?: typeof GUEST_USER) {
		if (userData) {
			userStore.login(userData);
		}
		resetAndClose();
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		touched = { email: true, password: true, confirmPassword: true };
		validateField('email');
		validateField('password');
		if (view === 'register') validateField('confirmPassword');

		if (Object.keys(errors).length) return;

		isSubmitting = true;
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await handleSuccess(GUEST_USER);
		} catch {
			errors = { ...errors, form: 'Đã có lỗi xảy ra. Vui lòng thử lại.' };
		} finally {
			isSubmitting = false;
		}
	}

	function switchView() {
		if (view === 'login') view = 'register';
		else if (view === 'register') view = 'login';
		else view = 'login';
		errors = {};
		touched = {};
		confirmPassword = '';
	}
</script>

<Modal
	{isOpen}
	onClose={resetAndClose}
	onBack={view !== 'options' ? () => (view = 'options') : undefined}
	title={config.title}
>
	<div class="p-6">
		{#if view === 'options'}
			<!-- Options View -->
			<div class="flex flex-col gap-4" role="group" aria-label="Login options">
				<button
					onclick={() => (view = 'login')}
					class="w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
				>
					<IconUserCircle class="w-6 h-6" />
					<span class="font-semibold">Use email / username</span>
				</button>

				<button
					onclick={() => handleSuccess(GUEST_USER)}
					class="w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
				>
					<IconSmiley class="w-6 h-6" />
					<span class="font-semibold">Continue as Guest</span>
				</button>
			</div>
		{:else}
			<!-- Login/Register Form -->
			<form onsubmit={handleSubmit} class="flex flex-col gap-4" novalidate>
				{#if errors.form}
					<div class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm" role="alert">
						{errors.form}
					</div>
				{/if}

				<div>
					<label for="auth-email" class="font-normal mb-2 text-base block">Email or username</label>
					<input
						id="auth-email"
						type="email"
						bind:value={email}
						onblur={() => handleBlur('email')}
						placeholder="Nhập email của bạn"
						disabled={isSubmitting}
						aria-invalid={touched.email && !!errors.email}
						aria-describedby={errors.email ? 'email-error' : undefined}
						class="p-4 text-base border-2 rounded-lg outline-none w-full transition-colors focus:border-primary disabled:bg-gray-100 {touched.email && errors.email
							? 'border-red-500'
							: 'border-gray-300'}"
					/>
					{#if touched.email && errors.email}
						<span id="email-error" class="text-red-500 text-sm" role="alert">{errors.email}</span>
					{/if}
				</div>

				<div>
					<label for="auth-password" class="font-normal mb-2 text-base block">Password</label>
					<input
						id="auth-password"
						type="password"
						bind:value={password}
						onblur={() => handleBlur('password')}
						placeholder="Nhập mật khẩu"
						disabled={isSubmitting}
						aria-invalid={touched.password && !!errors.password}
						aria-describedby={errors.password ? 'password-error' : undefined}
						class="p-4 text-base border-2 rounded-lg outline-none w-full transition-colors focus:border-primary disabled:bg-gray-100 {touched.password && errors.password
							? 'border-red-500'
							: 'border-gray-300'}"
					/>
					{#if touched.password && errors.password}
						<span id="password-error" class="text-red-500 text-sm" role="alert">{errors.password}</span>
					{/if}
				</div>

				{#if view === 'register'}
					<div>
						<label for="auth-confirm-password" class="font-normal mb-2 text-base block">Confirm Password</label>
						<input
							id="auth-confirm-password"
							type="password"
							bind:value={confirmPassword}
							onblur={() => handleBlur('confirmPassword')}
							placeholder="Xác nhận mật khẩu"
							disabled={isSubmitting}
							aria-invalid={touched.confirmPassword && !!errors.confirmPassword}
							aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
							class="p-4 text-base border-2 rounded-lg outline-none w-full transition-colors focus:border-primary disabled:bg-gray-100 {touched.confirmPassword && errors.confirmPassword
								? 'border-red-500'
								: 'border-gray-300'}"
						/>
						{#if touched.confirmPassword && errors.confirmPassword}
							<span id="confirm-password-error" class="text-red-500 text-sm" role="alert">{errors.confirmPassword}</span>
						{/if}
					</div>
				{/if}

				{#if view === 'login'}
					<button type="button" onclick={() => {}} class="text-gray-500 text-sm hover:underline text-left">
						Forgot password?
					</button>
				{/if}

				<Button variant="primary" class="w-full mt-4" disabled={isSubmitting || !isFormValid}>
					{#snippet children()}
						{#if isSubmitting}
							<IconSpinner class="w-5 h-5 animate-spin mr-2" />
							{view === 'login' ? 'Đang đăng nhập...' : 'Đang đăng ký...'}
						{:else}
							{view === 'login' ? 'Đăng nhập' : 'Đăng ký'}
						{/if}
					{/snippet}
				</Button>
			</form>
		{/if}

		<!-- Footer -->
		<div class="mt-6 text-center">
			<p class="flex items-center justify-center gap-2">
				<span class="text-gray-600">{config.footerText}</span>
				<button
					onclick={switchView}
					disabled={isSubmitting}
					class="text-primary font-semibold hover:underline disabled:opacity-50"
				>
					{config.footerAction}
				</button>
			</p>
		</div>
	</div>
</Modal>
