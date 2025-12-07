<script lang="ts">
	import { IconPencil, IconSpinner } from '$lib/components/icons';
	import { Modal, Button, UserAvatar } from '$lib/components';
	import { userStore } from '$lib/stores';
	import { GUEST_USER } from '$lib/constants';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	const BIO_MAX_LENGTH = 80;

	let bio = $state('');
	let name = $state('');
	let isSubmitting = $state(false);
	let previewImageUrl = $state<string | null>(null);
	let fileInput = $state<HTMLInputElement>();

	const user = $derived(userStore.current || GUEST_USER);

	function handleImageSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		const selectedFile = target.files?.[0];

		if (selectedFile) {
			const imageUrl = URL.createObjectURL(selectedFile);
			previewImageUrl = imageUrl;
		} else {
			previewImageUrl = null;
		}
	}

	function handleCancelCrop() {
		if (previewImageUrl) {
			URL.revokeObjectURL(previewImageUrl);
		}
		previewImageUrl = null;
		if (fileInput) fileInput.value = '';
	}

	async function handleApply() {
		isSubmitting = true;
		try {
			// TODO: Implement save profile API call
			onClose();
		} catch (error) {
			console.error('Error saving profile:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<Modal isOpen={true} {onClose} onBack={previewImageUrl ? handleCancelCrop : undefined}>
	<div class="p-6">
		{#if !previewImageUrl}
			<!-- Edit Form -->
			<div class="space-y-6">
				<!-- Profile Photo -->
				<div class="flex flex-col items-center border-b pb-6">
					<h3 class="font-semibold text-gray-700 mb-4">Profile photo</h3>
					<label for="profile-photo-input" class="relative cursor-pointer">
						<UserAvatar size={16} {user} />
						<button
							type="button"
							aria-label="Edit profile photo"
							class="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border border-gray-300 w-8 h-8 flex items-center justify-center"
						>
							<IconPencil class="w-4 h-4" />
						</button>
					</label>
					<input
						bind:this={fileInput}
						class="hidden"
						type="file"
						id="profile-photo-input"
						onchange={handleImageSelect}
						accept="image/png, image/jpeg, image/jpg"
					/>
				</div>

				<!-- Name -->
				<div class="border-b pb-6">
					<h3 class="font-semibold text-gray-700 mb-4">Name</h3>
					<input
						type="text"
						bind:value={name}
						placeholder="Name"
						class="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:border-purple-500"
					/>
				</div>

				<!-- Bio -->
				<div>
					<h3 class="font-semibold text-gray-700 mb-4">Bio</h3>
					<textarea
						bind:value={bio}
						maxlength={BIO_MAX_LENGTH}
						rows="4"
						class="resize-none w-full p-3 bg-gray-50 text-gray-800 border-2 border-gray-300 rounded-lg outline-none focus:border-purple-500"
					></textarea>
					<p class="text-gray-500 text-sm mt-1">{bio.length}/{BIO_MAX_LENGTH}</p>
				</div>
			</div>
		{:else}
			<!-- Image Preview -->
			<div class="flex flex-col items-center">
				<div class="max-w-md max-h-96 overflow-hidden rounded-lg">
					<img src={previewImageUrl} alt="Preview" class="max-w-full max-h-80" />
				</div>
				<p class="text-center text-gray-600 mt-4">
					Preview your new profile photo
				</p>
			</div>
		{/if}

		<!-- Footer Buttons -->
		<div class="flex justify-end gap-3 mt-6 pt-6 border-t">
			{#if !previewImageUrl}
				<Button variant="outline" disabled={isSubmitting} onclick={onClose}>
					{#snippet children()}
						Cancel
					{/snippet}
				</Button>
				<Button variant="primary" disabled={isSubmitting} onclick={handleApply}>
					{#snippet children()}
						{#if isSubmitting}
							<IconSpinner class="w-5 h-5 animate-spin mr-2" />
							Saving...
						{:else}
							Apply
						{/if}
					{/snippet}
				</Button>
			{:else}
				<Button variant="outline" disabled={isSubmitting} onclick={handleCancelCrop}>
					{#snippet children()}
						Cancel
					{/snippet}
				</Button>
				<Button variant="primary" disabled={isSubmitting} onclick={handleApply}>
					{#snippet children()}
						Apply Photo
					{/snippet}
				</Button>
			{/if}
		</div>
	</div>
</Modal>
