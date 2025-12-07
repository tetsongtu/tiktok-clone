<script lang="ts">
	import type { Snippet } from 'svelte';
	import { IconClose } from './icons';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		onBack?: () => void;
		title?: string;
		maxWidth?: string;
		maxHeight?: string;
		children: Snippet;
	}

	let {
		isOpen,
		onClose,
		onBack,
		title = '',
		maxWidth = '600px',
		maxHeight = '90vh',
		children,
	}: Props = $props();

	function handleOverlayClick(e: MouseEvent) {
		if ((e.target as HTMLElement).classList.contains('modal-overlay')) onClose();
	}

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			return () => { document.body.style.overflow = ''; };
		}
	});
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		class="modal-overlay fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
		onclick={handleOverlayClick}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
		<div
			class="bg-white rounded-xl shadow-2xl overflow-hidden"
			style="max-width: {maxWidth}; max-height: {maxHeight}; width: 100%;"
			onclick={(e) => e.stopPropagation()}
		>
			{#if title || onBack}
				<header class="flex items-center justify-between p-4 border-b">
					<div class="flex items-center gap-2">
						{#if onBack}
							<button onclick={onBack} class="p-2 hover:bg-gray-100 rounded-full text-xl font-bold">←</button>
						{/if}
						{#if title}
							<h2 class="text-xl font-semibold">{title}</h2>
						{/if}
					</div>
					<button onclick={onClose} class="p-1 hover:bg-gray-100 rounded-full">
						<IconClose class="w-5 h-5" />
					</button>
				</header>
			{/if}
			<div class="overflow-y-auto" style="max-height: calc({maxHeight} - 80px);">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
