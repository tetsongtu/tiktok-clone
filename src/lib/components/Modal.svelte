<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		onBack?: () => void;
		title?: string;
		maxWidth?: string;
		maxHeight?: string;
		children: any;
	}

	let {
		isOpen,
		onClose,
		onBack,
		title = '',
		maxWidth = '600px',
		maxHeight = '90vh',
		children
	}: Props = $props();

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.classList.contains('modal-overlay')) {
			onClose();
		}
	}

	onMount(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	});
</script>

{#if isOpen}
	<div
		class="modal-overlay fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
		onclick={handleClickOutside}
	>
		<div
			class="bg-white rounded-lg shadow-2xl overflow-hidden"
			style="max-width: {maxWidth}; max-height: {maxHeight}; width: 100%;"
		>
			{#if title || onBack}
				<div class="flex items-center justify-between p-4 border-b">
					{#if onBack}
						<button onclick={onBack} class="text-2xl font-bold">&lt;</button>
					{:else}
						<div></div>
					{/if}
					{#if title}
						<h2 class="text-xl font-semibold">{title}</h2>
					{/if}
					<button onclick={onClose} class="text-2xl font-bold">&times;</button>
				</div>
			{/if}

			<div class="overflow-y-auto" style="max-height: calc({maxHeight} - 120px);">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
