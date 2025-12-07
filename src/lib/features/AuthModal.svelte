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

	const config = $derived({
		options: { title: 'Log in to TikTok', footer: "Don't have an account?", action: 'Sign up' },
		login: { title: 'Log in', footer: "Don't have an account?", action: 'Sign up' },
		register: { title: 'Sign up for TikTok', footer: 'Already have an account?', action: 'Log in' },
	}[view]);

	const isFormValid = $derived(
		email && password && !errors.email && !errors.password &&
		(view !== 'register' || (confirmPassword && !errors.confirmPassword))
	);

	function validate(field: string) {
		const e = { ...errors };
		if (field === 'email') {
			if (!email) e.email = 'Email là bắt buộc';
			else if (!VALIDATION.EMAIL_PATTERN.test(email)) e.email = 'Email không hợp lệ';
			else delete e.email;
		}
		if (field === 'password') {
			if (!password) e.password = 'Mật khẩu là bắt buộc';
			else if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) e.password = `Mật khẩu phải có ít nhất ${VALIDATION.PASSWORD_MIN_LENGTH} ký tự`;
			else delete e.password;
		}
		if (field === 'confirmPassword' && view === 'register') {
			if (!confirmPassword) e.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
			else if (confirmPassword !== password) e.confirmPassword = 'Mật khẩu không khớp';
			else delete e.confirmPassword;
		}
		errors = e;
	}

	function reset() {
		view = 'options'; email = ''; password = ''; confirmPassword = '';
		errors = {}; touched = {}; isSubmitting = false;
	}

	function close() { reset(); onClose(); }

	async function submit(e: Event) {
		e.preventDefault();
		touched = { email: true, password: true, confirmPassword: true };
		validate('email'); validate('password');
		if (view === 'register') validate('confirmPassword');
		if (Object.keys(errors).length) return;

		isSubmitting = true;
		await new Promise((r) => setTimeout(r, 1000));
		userStore.login(GUEST_USER);
		close();
	}

	function switchView() {
		view = view === 'login' ? 'register' : view === 'register' ? 'login' : 'login';
		errors = {}; touched = {}; confirmPassword = '';
	}
</script>

<Modal {isOpen} onClose={close} onBack={view !== 'options' ? () => (view = 'options') : undefined} title={config.title}>
	<div class="p-6">
		{#if view === 'options'}
			<div class="flex flex-col gap-4">
				<button onclick={() => (view = 'login')} class="w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3">
					<IconUserCircle class="w-6 h-6" /><span class="font-semibold">Use email / username</span>
				</button>
				<button onclick={() => { userStore.login(GUEST_USER); close(); }} class="w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3">
					<IconSmiley class="w-6 h-6" /><span class="font-semibold">Continue as Guest</span>
				</button>
			</div>
		{:else}
			<form onsubmit={submit} class="flex flex-col gap-4" novalidate>
				{#if errors.form}<div class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{errors.form}</div>{/if}

				<div>
					<label for="email" class="mb-2 block">Email or username</label>
					<input id="email" type="email" bind:value={email} onblur={() => { touched.email = true; validate('email'); }}
						disabled={isSubmitting} class="p-4 border-2 rounded-lg w-full outline-none focus:border-primary {touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}" />
					{#if touched.email && errors.email}<span class="text-red-500 text-sm">{errors.email}</span>{/if}
				</div>

				<div>
					<label for="password" class="mb-2 block">Password</label>
					<input id="password" type="password" bind:value={password} onblur={() => { touched.password = true; validate('password'); }}
						disabled={isSubmitting} class="p-4 border-2 rounded-lg w-full outline-none focus:border-primary {touched.password && errors.password ? 'border-red-500' : 'border-gray-300'}" />
					{#if touched.password && errors.password}<span class="text-red-500 text-sm">{errors.password}</span>{/if}
				</div>

				{#if view === 'register'}
					<div>
						<label for="confirm" class="mb-2 block">Confirm Password</label>
						<input id="confirm" type="password" bind:value={confirmPassword} onblur={() => { touched.confirmPassword = true; validate('confirmPassword'); }}
							disabled={isSubmitting} class="p-4 border-2 rounded-lg w-full outline-none focus:border-primary {touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}" />
						{#if touched.confirmPassword && errors.confirmPassword}<span class="text-red-500 text-sm">{errors.confirmPassword}</span>{/if}
					</div>
				{/if}

				<Button variant="primary" class="w-full mt-4" disabled={isSubmitting || !isFormValid}>
					{#snippet children()}
						{#if isSubmitting}<IconSpinner class="w-5 h-5 animate-spin mr-2" />{/if}
						{view === 'login' ? 'Đăng nhập' : 'Đăng ký'}
					{/snippet}
				</Button>
			</form>
		{/if}

		<div class="mt-6 text-center">
			<span class="text-gray-600">{config.footer}</span>
			<button onclick={switchView} disabled={isSubmitting} class="text-primary font-semibold ml-2 hover:underline">{config.action}</button>
		</div>
	</div>
</Modal>
