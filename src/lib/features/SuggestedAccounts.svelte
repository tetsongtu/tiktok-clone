<script lang="ts">
	import UserAvatar from '~/lib/components/UserAvatar.svelte';
	import AccountPreview from './AccountPreview.svelte';

	interface Props {
		label: string;
		data?: any[];
		onSeeAll?: () => void;
	}

	let { label, data = [], onSeeAll }: Props = $props();

	let hoveredId = $state<number | null>(null);
	let hoverTimeout: ReturnType<typeof setTimeout>;
	let previewEl: HTMLDivElement;

	function handleMouseEnter(account: any, event: MouseEvent) {
		clearTimeout(hoverTimeout);
		hoverTimeout = setTimeout(() => {
			hoveredId = account.id;
			
			// Position preview next to item
			setTimeout(() => {
				if (previewEl) {
					const target = event.currentTarget as HTMLElement;
					const rect = target.getBoundingClientRect();
					previewEl.style.top = `${rect.top}px`;
					previewEl.style.left = `${rect.right + 8}px`;
				}
			}, 0);
		}, 500);
	}

	function handleMouseLeave() {
		clearTimeout(hoverTimeout);
		hoveredId = null;
	}
</script>

<div class="border-t border-gray-400 w-[90%]"></div>
<p class="block px-2 pt-2 text-base font-normal text-gray-700">{label}</p>

<div class="max-h-[250px] overflow-y-auto">
	{#each data as account (account.id)}
		<a
			href="/@{account.nickname}"
			class="flex items-center px-2 py-1 rounded hover:bg-gray-50 block"
			onmouseenter={(e) => handleMouseEnter(account, e)}
			onmouseleave={handleMouseLeave}
		>
			<UserAvatar user={account} />
			<section class="ml-3">
				<p class="text-base flex items-center">
					<strong>{account?.nickname}</strong>
					{#if account?.tick}
						<svg class="w-4 h-4 ml-1 text-blue-500" viewBox="0 0 256 256" fill="currentColor">
							<path
								d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
								/>
						</svg>
					{/if}
				</p>
				<p class="text-base">{account?.first_name} {account?.last_name}</p>
			</section>
		</a>
	{/each}
</div>

{#if hoveredId !== null}
	{@const account = data.find((a) => a.id === hoveredId)}
	{#if account}
		<div
			bind:this={previewEl}
			class="fixed z-[9999] bg-white rounded-lg shadow-xl border border-gray-200 min-w-[308px]"
		>
			<AccountPreview user={account} />
		</div>
	{/if}
{/if}

{#if onSeeAll}
	<button
		class="block px-2 pb-2 text-base font-normal text-[#fe2c55] cursor-pointer w-full text-left"
		onclick={onSeeAll}
	>
		See all
	</button>
{/if}
