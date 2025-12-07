<script lang="ts">
	import { IconPencil, IconSpinner } from '$lib/components/icons';
	import { Modal, Button, UserAvatar } from '$lib/components';
	import { userStore } from '$lib/stores';
	import { GUEST_USER, VALIDATION } from '$lib/constants';

	interface Props { onClose: () => void; }
	let { onClose }: Props = $props();

	const MAX_FILE_SIZE = 5 * 1024 * 1024;
	let bio = $state('');
	let name = $state('');
	let isSubmitting = $state(false);
	let previewUrl = $state<string | null>(null);
	let fileInput = $state<HTMLInputElement>();
	let errors = $state<Record<string, string>>({});
	let isDirty = $state(false);

	const user = $derived(userStore.current || GUEST_USER);
	const canSave = $derived(isDirty || previewUrl);

	$effect(() => { name = user.nickname || ''; bio = user.bio || ''; });

	function handleImage(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) { errors = { image: 'Chỉ chấp nhận PNG, JPG' }; return; }
		if (file.size > MAX_FILE_SIZE) { errors = { image: 'File không được quá 5MB' }; return; }
		errors = {};
		previewUrl = URL.createObjectURL(file);
	}

	function cancelPreview() {
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		previewUrl = null;
		if (fileInput) fileInput.value = '';
	}

	async function save() {
		isSubmitting = true;
		await new Promise((r) => setTimeout(r, 1000));
		onClose();
	}

	function close() { cancelPreview(); onClose(); }
</script>

<Modal isOpen={true} onClose={close} onBack={previewUrl ? cancelPreview : undefined}>
	<div class="p-6">
		{#if !previewUrl}
			<div class="space-y-6">
				<div class="flex flex-col items-center border-b pb-6">
					<h3 class="font-semibold text-gray-700 mb-4">Profile photo</h3>
					<label for="photo" class="relative cursor-pointer">
						<UserAvatar size={16} {user} />
						<span class="absolute bottom-0 right-0 rounded-full bg-white shadow border w-8 h-8 flex items-center justify-center">
							<IconPencil class="w-4 h-4" />
						</span>
					</label>
					<input bind:this={fileInput} class="hidden" type="file" id="photo" onchange={handleImage} accept="image/*" />
					{#if errors.image}<span class="text-red-500 text-sm mt-2">{errors.image}</span>{/if}
				</div>

				<div class="border-b pb-6">
					<label for="name" class="font-semibold text-gray-700 mb-4 block">Name</label>
					<input id="name" bind:value={name} oninput={() => isDirty = true} maxlength={VALIDATION.NICKNAME_MAX_LENGTH}
						class="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:border-primary" />
					<span class="text-gray-500 text-sm">{name.length}/{VALIDATION.NICKNAME_MAX_LENGTH}</span>
				</div>

				<div>
					<label for="bio" class="font-semibold text-gray-700 mb-4 block">Bio</label>
					<textarea id="bio" bind:value={bio} oninput={() => isDirty = true} maxlength={VALIDATION.BIO_MAX_LENGTH} rows="4"
						class="resize-none w-full p-3 bg-gray-50 border-2 border-gray-300 rounded-lg outline-none focus:border-primary"></textarea>
					<span class="text-gray-500 text-sm">{bio.length}/{VALIDATION.BIO_MAX_LENGTH}</span>
				</div>
			</div>
		{:else}
			<div class="flex flex-col items-center">
				<img src={previewUrl} alt="Preview" class="max-w-full max-h-80 rounded-lg" />
			</div>
		{/if}

		<div class="flex justify-end gap-3 mt-6 pt-6 border-t">
			<Button variant="outline" onclick={previewUrl ? cancelPreview : close}>{#snippet children()}Cancel{/snippet}</Button>
			<Button variant="primary" disabled={isSubmitting || !canSave} onclick={save}>
				{#snippet children()}{#if isSubmitting}<IconSpinner class="w-5 h-5 animate-spin mr-2" />{/if}{previewUrl ? 'Apply' : 'Save'}{/snippet}
			</Button>
		</div>
	</div>
</Modal>
