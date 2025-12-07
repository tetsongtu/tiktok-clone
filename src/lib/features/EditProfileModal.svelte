<script lang="ts">
	import { IconPencil, IconSpinner } from '$lib/components/icons';
	import { Modal, Button, UserAvatar } from '$lib/components';
	import { userStore } from '$lib/stores';
	import { GUEST_USER, VALIDATION } from '$lib/constants';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
	const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

	let bio = $state('');
	let name = $state('');
	let isSubmitting = $state(false);
	let previewImageUrl = $state<string | null>(null);
	let fileInput = $state<HTMLInputElement>();
	let errors = $state<Record<string, string>>({});
	let isDirty = $state(false);

	const user = $derived(userStore.current || GUEST_USER);
	const hasChanges = $derived(isDirty || previewImageUrl !== null);
	const isValid = $derived(
		name.length <= VALIDATION.NICKNAME_MAX_LENGTH &&
		bio.length <= VALIDATION.BIO_MAX_LENGTH &&
		!errors.name && !errors.bio && !errors.image
	);

	// Initialize form with user data
	$effect(() => {
		if (user) {
			name = user.nickname || '';
			bio = user.bio || '';
		}
	});

	function validateName() {
		if (name && name.length > VALIDATION.NICKNAME_MAX_LENGTH) {
			errors.name = `Tên không được quá ${VALIDATION.NICKNAME_MAX_LENGTH} ký tự`;
		} else {
			delete errors.name;
		}
		errors = { ...errors };
	}

	function validateBio() {
		if (bio.length > VALIDATION.BIO_MAX_LENGTH) {
			errors.bio = `Bio không được quá ${VALIDATION.BIO_MAX_LENGTH} ký tự`;
		} else {
			delete errors.bio;
		}
		errors = { ...errors };
	}

	function handleNameChange() {
		isDirty = true;
		validateName();
	}

	function handleBioChange() {
		isDirty = true;
		validateBio();
	}

	function handleImageSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		const selectedFile = target.files?.[0];

		if (!selectedFile) {
			previewImageUrl = null;
			return;
		}

		// Validate file type
		if (!ALLOWED_TYPES.includes(selectedFile.type)) {
			errors.image = 'Chỉ chấp nhận file PNG, JPG hoặc JPEG';
			errors = { ...errors };
			return;
		}

		// Validate file size
		if (selectedFile.size > MAX_FILE_SIZE) {
			errors.image = 'File không được quá 5MB';
			errors = { ...errors };
			return;
		}

		delete errors.image;
		errors = { ...errors };
		previewImageUrl = URL.createObjectURL(selectedFile);
	}

	function handleCancelCrop() {
		if (previewImageUrl) {
			URL.revokeObjectURL(previewImageUrl);
		}
		previewImageUrl = null;
		delete errors.image;
		errors = { ...errors };
		if (fileInput) fileInput.value = '';
	}

	async function handleApply() {
		if (!isValid) return;

		isSubmitting = true;
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// TODO: Implement save profile API call
			onClose();
		} catch {
			errors.form = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
			errors = { ...errors };
		} finally {
			isSubmitting = false;
		}
	}

	function handleClose() {
		if (previewImageUrl) {
			URL.revokeObjectURL(previewImageUrl);
		}
		onClose();
	}
</script>

<Modal isOpen={true} onClose={handleClose} onBack={previewImageUrl ? handleCancelCrop : undefined}>
	<div class="p-6">
		{#if errors.form}
			<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm" role="alert">
				{errors.form}
			</div>
		{/if}

		{#if !previewImageUrl}
			<!-- Edit Form -->
			<div class="space-y-6">
				<!-- Profile Photo -->
				<div class="flex flex-col items-center border-b pb-6">
					<h3 class="font-semibold text-gray-700 mb-4">Profile photo</h3>
					<label for="profile-photo-input" class="relative cursor-pointer group">
						<UserAvatar size={16} {user} />
						<span
							class="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border border-gray-300 w-8 h-8 flex items-center justify-center group-hover:bg-gray-50 transition-colors"
						>
							<IconPencil class="w-4 h-4" />
						</span>
					</label>
					<input
						bind:this={fileInput}
						class="hidden"
						type="file"
						id="profile-photo-input"
						onchange={handleImageSelect}
						accept="image/png, image/jpeg, image/jpg"
						aria-describedby={errors.image ? 'image-error' : undefined}
					/>
					{#if errors.image}
						<span id="image-error" class="text-red-500 text-sm mt-2" role="alert">{errors.image}</span>
					{/if}
					<p class="text-gray-500 text-xs mt-2">PNG, JPG hoặc JPEG (tối đa 5MB)</p>
				</div>

				<!-- Name -->
				<div class="border-b pb-6">
					<label for="profile-name" class="font-semibold text-gray-700 mb-4 block">Name</label>
					<input
						id="profile-name"
						type="text"
						bind:value={name}
						oninput={handleNameChange}
						placeholder="Name"
						maxlength={VALIDATION.NICKNAME_MAX_LENGTH}
						disabled={isSubmitting}
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? 'name-error' : 'name-hint'}
						class="w-full p-3 border-2 rounded-lg outline-none transition-colors focus:border-primary disabled:bg-gray-100 {errors.name
							? 'border-red-500'
							: 'border-gray-300'}"
					/>
					{#if errors.name}
						<span id="name-error" class="text-red-500 text-sm mt-1 block" role="alert">{errors.name}</span>
					{:else}
						<span id="name-hint" class="text-gray-500 text-sm mt-1 block">{name.length}/{VALIDATION.NICKNAME_MAX_LENGTH}</span>
					{/if}
				</div>

				<!-- Bio -->
				<div>
					<label for="profile-bio" class="font-semibold text-gray-700 mb-4 block">Bio</label>
					<textarea
						id="profile-bio"
						bind:value={bio}
						oninput={handleBioChange}
						maxlength={VALIDATION.BIO_MAX_LENGTH}
						rows="4"
						disabled={isSubmitting}
						aria-invalid={!!errors.bio}
						aria-describedby={errors.bio ? 'bio-error' : 'bio-hint'}
						class="resize-none w-full p-3 bg-gray-50 text-gray-800 border-2 rounded-lg outline-none transition-colors focus:border-primary disabled:bg-gray-100 {errors.bio
							? 'border-red-500'
							: 'border-gray-300'}"
					></textarea>
					{#if errors.bio}
						<span id="bio-error" class="text-red-500 text-sm" role="alert">{errors.bio}</span>
					{:else}
						<span id="bio-hint" class="text-gray-500 text-sm">{bio.length}/{VALIDATION.BIO_MAX_LENGTH}</span>
					{/if}
				</div>
			</div>
		{:else}
			<!-- Image Preview -->
			<div class="flex flex-col items-center">
				<div class="max-w-md max-h-96 overflow-hidden rounded-lg border-2 border-gray-200">
					<img src={previewImageUrl} alt="Preview" class="max-w-full max-h-80 object-contain" />
				</div>
				<p class="text-center text-gray-600 mt-4">
					Preview your new profile photo
				</p>
			</div>
		{/if}

		<!-- Footer Buttons -->
		<div class="flex justify-end gap-3 mt-6 pt-6 border-t">
			{#if !previewImageUrl}
				<Button variant="outline" disabled={isSubmitting} onclick={handleClose}>
					{#snippet children()}
						Cancel
					{/snippet}
				</Button>
				<Button variant="primary" disabled={isSubmitting || !hasChanges || !isValid} onclick={handleApply}>
					{#snippet children()}
						{#if isSubmitting}
							<IconSpinner class="w-5 h-5 animate-spin mr-2" />
							Saving...
						{:else}
							Save
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
						{#if isSubmitting}
							<IconSpinner class="w-5 h-5 animate-spin mr-2" />
							Applying...
						{:else}
							Apply Photo
						{/if}
					{/snippet}
				</Button>
			{/if}
		</div>
	</div>
</Modal>
