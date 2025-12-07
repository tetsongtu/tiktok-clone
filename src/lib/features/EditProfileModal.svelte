<script lang="ts">
	import Modal from '~/lib/components/Modal.svelte';
	import Button from '~/lib/components/Button.svelte';
	import UserAvatar from '~/lib/components/UserAvatar.svelte';
	import { userStore } from '~/lib/stores/userStore';
	import { GUEST_USER } from '~/lib/constants/guestUser';

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

	const user = $derived($userStore || GUEST_USER);

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
							<svg class="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
								<path
									d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63Z"
								></path>
							</svg>
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
							<svg class="w-5 h-5 animate-spin mr-2" viewBox="0 0 256 256" fill="currentColor">
								<path
									d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"
								></path>
							</svg>
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
