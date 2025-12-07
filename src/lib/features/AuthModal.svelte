<script lang="ts">
	import { IconUserCircle, IconSmiley } from '~/lib/components/icons';
	import { userStore } from '~/lib/stores/userStore';
	import Modal from '~/lib/components/Modal.svelte';
	import Button from '~/lib/components/Button.svelte';
	import { GUEST_USER } from '~/lib/constants/guestUser';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();

	type View = 'options' | 'login' | 'register';
	let view = $state<View>('options');
	let email = $state('');
	let password = $state('');
	let errors = $state<Record<string, string>>({});

	const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const MIN_PASSWORD_LENGTH = 6;

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

	function resetAndClose() {
		view = 'options';
		email = '';
		password = '';
		errors = {};
		onClose();
	}

	function handleSuccess(userData?: any) {
		if (userData) {
			userStore.set(userData);
		}
		resetAndClose();
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		const newErrors: Record<string, string> = {};

		if (!email) newErrors.email = 'Email là bắt buộc';
		else if (!EMAIL_REGEX.test(email)) newErrors.email = 'Email không hợp lệ';

		if (!password) newErrors.password = 'Mật khẩu là bắt buộc';
		else if (password.length < MIN_PASSWORD_LENGTH)
			newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';

		if (Object.keys(newErrors).length) {
			errors = newErrors;
			return;
		}

		handleSuccess(GUEST_USER);
	}

	function switchView() {
		if (view === 'login') view = 'register';
		else if (view === 'register') view = 'login';
		else view = 'login';
		errors = {};
	}
</script>

<Modal
	{isOpen}
	onClose={resetAndClose}
	onBack={view === 'login' ? () => (view = 'options') : undefined}
	title={config.title}
>
	<div class="p-6">
		{#if view === 'options'}
			<!-- Options View -->
			<div class="flex flex-col gap-4">
				<button
					onclick={() => (view = 'login')}
					class="w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3"
				>
					<IconUserCircle class="w-6 h-6" />
					<span class="font-semibold">Use email / username</span>
				</button>

				<button
					onclick={() => handleSuccess(GUEST_USER)}
					class="w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3"
				>
					<IconSmiley class="w-6 h-6" />
					<span class="font-semibold">Continue as Guest</span>
				</button>
			</div>
		{:else}
			<!-- Login/Register Form -->
			<form onsubmit={handleSubmit} class="flex flex-col gap-4">
				<div>
					<p class="font-normal mb-2 text-base">Email or username</p>
					<input
						type="text"
						bind:value={email}
						placeholder="Nhập email của bạn"
						class="p-4 text-base border-2 rounded-lg outline-none w-full {errors.email
							? 'border-red-500'
							: 'border-gray-300'}"
					/>
					{#if errors.email}
						<span class="text-red-500 text-sm">{errors.email}</span>
					{/if}
				</div>

				<div>
					<p class="font-normal mb-2 text-base">Password</p>
					<input
						type="password"
						bind:value={password}
						placeholder="Nhập mật khẩu"
						class="p-4 text-base border-2 rounded-lg outline-none w-full {errors.password
							? 'border-red-500'
							: 'border-gray-300'}"
					/>
					{#if errors.password}
						<span class="text-red-500 text-sm">{errors.password}</span>
					{/if}
				</div>

				{#if view === 'login'}
					<button type="button" onclick={() => {}} class="text-gray-500 text-sm hover:underline">Forgot password?</button>
				{/if}

				<Button variant="primary" class="w-full mt-4">
					{#snippet children()}
						{view === 'login' ? 'Đăng nhập' : 'Đăng ký'}
					{/snippet}
				</Button>
			</form>
		{/if}

		<!-- Footer -->
		<div class="mt-6 text-center">
			<p class="flex items-center justify-center gap-2">
				<span class="text-gray-600">{config.footerText}</span>
				<button onclick={switchView} class="text-[var(--primary)] font-semibold">
					{config.footerAction}
				</button>
			</p>
		</div>
	</div>
</Modal>
