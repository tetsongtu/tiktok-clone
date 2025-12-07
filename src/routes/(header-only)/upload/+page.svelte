<script lang="ts">
	import { IconUpload, IconSpinner, IconCheckCircle, IconSplitVertical } from '$lib/components/icons';
	import { Button } from '$lib/components';

	let fileDisplay = $state('');
	let caption = $state('');
	let file = $state<File | null>(null);
	let error = $state<string | null>(null);
	let isUploading = $state(false);

	function handleFileChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		const selectedFile = target.files?.[0];
		if (selectedFile) {
			fileDisplay = URL.createObjectURL(selectedFile);
			file = selectedFile;
		}
	}

	function discard() {
		fileDisplay = '';
		file = null;
		caption = '';
		error = null;
	}

	function createNewPost() {
		if (!file) return;
		// TODO: Implement upload functionality
	}

	const canPost = $derived(!isUploading && file);
</script>

<div class="h-[720px] bg-white shadow-xl rounded-md p-4 px-10">
	<header>
		<h1 class="text-2xl font-semibold">Upload video</h1>
		<h2 class="text-gray-400 mt-1">Post a video to your account</h2>
	</header>

	<div class="mt-2 flex gap-6">
		{#if !fileDisplay}
			<label
				for="fileInput"
				class="flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] my-4 mb-6 p-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400"
			>
				<IconUpload class="w-10 h-10 text-gray-400" />
				<p class="mt-4 text-lg">Select video to upload</p>
				<p class="mt-1.5 text-gray-600 text-sm">Or drag and drop a file</p>
				<div class="mt-12 text-gray-400">
					<p class="text-sm">MP4</p>
					<p class="text-sm">Up to 30 minutes</p>
					<p class="text-sm">Less than 2 GB</p>
				</div>
				<span class="w-4/5 mt-8 py-1.5 px-2 rounded-sm text-base text-white bg-primary cursor-pointer">
					Select file
				</span>
				<input
					id="fileInput"
					type="file"
					onchange={handleFileChange}
					hidden
					accept=".mp4"
				/>
			</label>
		{:else}
			<div
				class="relative flex items-center justify-center w-full max-w-[260px] h-[540px] my-4 mb-12 p-3 rounded-2xl cursor-pointer"
			>
				{#if isUploading}
					<div
						class="absolute inset-0 flex items-center justify-center z-20 rounded-xl bg-black/50"
					>
						<div class="flex items-center gap-1">
							<IconSpinner class="w-8 h-8 text-primary animate-spin" />
							<span class="text-white font-bold">Uploading...</span>
						</div>
					</div>
				{/if}
				<video
					class="absolute z-10 w-full h-full rounded-xl object-cover"
					autoplay
					muted
					loop
					src={fileDisplay}
				></video>
				<button
					onclick={discard}
					class="absolute -bottom-12 z-50 flex justify-center gap-32 w-full p-2 border border-gray-300 rounded-xl"
				>
					<div class="flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
						<IconCheckCircle class="w-4 h-4 shrink-0 text-primary" />
						<span class="pl-1 overflow-hidden text-xs font-semibold text-ellipsis">
							{file?.name}
						</span>
					</div>
					<span class="ml-2 text-xs font-semibold text-primary">Cancel</span>
				</button>
			</div>
		{/if}

		<div class="mt-4 mb-6">
			<div class="flex bg-gray-100 p-4 px-6">
				<IconSplitVertical class="w-5 h-5 mr-4 mt-0.5" />
				<div class="flex-1">
					<div class="font-semibold text-base mb-1.5">Divide videos and edit</div>
					<div class="font-semibold text-sm text-gray-400">
						You can quickly divide videos into multiple parts, remove redundant parts and
						turn landscape videos into portrait videos
					</div>
				</div>
				<div class="flex justify-end w-full max-w-[130px] m-auto">
					<Button size="small" variant="primary">Edit</Button>
				</div>
			</div>

			<div class="mt-5">
				<div class="flex items-center justify-between mb-1">
					<label for="captionInput" class="text-base">Caption</label>
					<span class="text-xs text-gray-400">{caption.length}/150</span>
				</div>
				<input
					id="captionInput"
					class="w-full border border-gray-300 p-2.5 rounded-md"
					maxlength="150"
					type="text"
					bind:value={caption}
					placeholder="Add a caption..."
				/>
			</div>

			<div class="mt-8 flex gap-3">
				<Button variant="outline" disabled={!canPost} onclick={discard}>Discard</Button>
				<Button variant="primary" disabled={!canPost} onclick={createNewPost}>
					{#if isUploading}
						<IconSpinner class="w-6 h-6 animate-spin" />
					{:else}
						Post
					{/if}
				</Button>
			</div>

			{#if error}
				<div class="text-red-600 mt-4">{error}</div>
			{/if}
		</div>
	</div>
</div>
