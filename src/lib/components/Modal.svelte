<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { IconClose } from './icons';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		onBack?: () => void;
		title?: string;
		maxWidth?: string;
		maxHeight?: string;
		closeOnOverlay?: boolean;
		closeOnEscape?: boolean;
		children: Snippet;
	}

	let {
		isOpen,
		onClose,
		onBack,
		title = '',
		maxWidth = '600px',
		maxHeight = '90vh',
		closeOnOverlay = true,
		closeOnEscape = true,
		children,
	}: Props = $props();

	let modalRef = $state<HTMLDivElement>();
	let previousActiveElement: Element | null = null;

	function handleClickOutside(e: MouseEvent) {
		if (closeOnOverlay && (e.target as HTMLElement).classList.contains('modal-overlay')) {
			onClose();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape' && closeOnEscape) {
			onClose();
		}
	}

	// Focus trap and body scroll lock
	$effect(() => {
		if (isOpen) {
			previousActiveElement = document.activeElement;
			document.body.style.overflow = 'hidden';

			// Focus the modal
			setTimeout(() => modalRef?.focus(), 0);

			return () => {
				document.body.style.overflow = '';
				// Restore focus
				if (previousActiveElement instanceof HTMLElement) {
					previousActiveElement.focus();
				}
			};
		}
	});
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		bind:this={modalRef}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
		tabindex="-1"
		class="modal-overlay fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
		onclick={handleClickOutside}
		onkeydown={handleKeyDown}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
		<div
			class="bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
			style="max-width: {maxWidth}; max-height: {maxHeight}; width: 100%;"
			onclick={(e) => e.stopPropagation()}
		>
			{#if title || onBack}
				<header class="flex items-center justify-between p-4 border-b">
					<div class="flex items-center gap-2">
						{#if onBack}
							<button
								onclick={onBack}
								aria-label="Go back"
								class="p-2 rounded-full hover:bg-gray-100 transition-colors text-xl font-bold"
							>
								←
							</button>
						{/if}
						{#if title}
							<h2 id="modal-title" class="text-xl font-semibold">{title}</h2>
						{/if}
					</div>
					<button
						onclick={onClose}
						aria-label="Close modal"
						class="p-1 rounded-full hover:bg-gray-100 transition-colors"
					>
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
