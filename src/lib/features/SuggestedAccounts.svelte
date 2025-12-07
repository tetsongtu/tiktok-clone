<script lang="ts">
	import { goto } from '$app/navigation';
	import { IconCheckCircle, IconSpinner } from '$lib/components/icons';
	import { UserAvatar, Tooltip } from '$lib/components';
	import AccountPreview from './AccountPreview.svelte';
	import { UI } from '$lib/constants';
	import type { SuggestedUser } from '$lib/types';

	interface Props {
		label: string;
		data?: SuggestedUser[];
		onSeeAll?: () => void;
		isLoading?: boolean;
		showSeeAll?: boolean;
	}

	let { label, data = [], onSeeAll, isLoading = false, showSeeAll = true }: Props = $props();

	const hasData = $derived(data.length > 0);

	function handleAccountClick(account: SuggestedUser) {
		const video = account.popular_video
			? { file_url: account.popular_video.file_url, id: account.popular_video.id }
			: undefined;
		goto(`/@${account.nickname}`, { state: { video } });
	}
</script>

<div class="border-t border-gray-300 w-[90%]"></div>
<h3 class="block px-2 pt-2 text-base font-medium text-gray-700">{label}</h3>

{#if hasData}
	<ul class="max-h-[250px] overflow-y-auto" role="list" aria-label="{label}">
		{#each data as account (account.id)}
			<li>
				<Tooltip offset={UI.TOOLTIP_OFFSET} delay={UI.TOOLTIP_DELAY} placement="bottom">
					{#snippet children()}
						<button
							type="button"
							onclick={() => handleAccountClick(account)}
							class="flex items-center px-2 py-1.5 rounded hover:bg-gray-50 w-full text-left cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
							aria-label="View {account.nickname}'s profile"
						>
							<UserAvatar user={account} />
							<div class="ml-3 flex-1 min-w-0">
								<p class="text-base flex items-center">
									<strong class="truncate">{account.nickname}</strong>
									{#if account.tick}
										<span class="inline-flex" title="Verified">
											<IconCheckCircle class="w-4 h-4 ml-1 text-blue-500 flex-shrink-0" />
										</span>
									{/if}
								</p>
								<p class="text-sm text-gray-600 truncate">{account.first_name} {account.last_name}</p>
							</div>
						</button>
					{/snippet}
					{#snippet render()}
						<div class="bg-white rounded-lg shadow-xl border border-gray-200 min-w-[308px]">
							<AccountPreview user={account} />
						</div>
					{/snippet}
				</Tooltip>
			</li>
		{/each}
	</ul>
{:else if !isLoading}
	<p class="px-2 py-4 text-sm text-gray-500">No accounts to show</p>
{/if}

{#if isLoading}
	<div class="flex items-center justify-center py-3">
		<IconSpinner class="w-5 h-5 text-primary animate-spin" />
	</div>
{:else if onSeeAll && showSeeAll && hasData}
	<button
		class="block px-2 pb-2 text-sm font-medium text-primary hover:text-primary-hover cursor-pointer w-full text-left transition-colors"
		onclick={onSeeAll}
	>
		See all
	</button>
{/if}
