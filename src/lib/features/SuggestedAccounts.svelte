<script lang="ts">
	import { IconCheckCircle } from '~/lib/components/icons';
	import UserAvatar from '~/lib/components/UserAvatar.svelte';
	import AccountPreview from './AccountPreview.svelte';
	import Tooltip from '~/lib/components/Tooltip.svelte';
	import type { SuggestedUser } from '~/lib/types/user';
	import { goto } from '$app/navigation';

	interface Props {
		label: string;
		data?: SuggestedUser[];
		onSeeAll?: () => void;
	}

	let { label, data = [], onSeeAll }: Props = $props();
</script>

<div class="border-t border-gray-400 w-[90%]"></div>
<p class="block px-2 pt-2 text-base font-normal text-gray-700">{label}</p>

<div class="max-h-[250px] overflow-y-auto">
	{#each data as account (account.id)}
		<Tooltip offset={[-20, -20]} delay={500} placement="bottom">
			{#snippet children()}
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						const userData = JSON.parse(JSON.stringify(account));
						goto(`/@${account.nickname}`, { state: { user: userData } });
					}}
					class="flex items-center px-2 py-1 rounded hover:bg-gray-50 w-full text-left cursor-pointer"
				>
					<UserAvatar user={account} />
					<section class="ml-3 flex-1 min-w-0">
						<p class="text-base flex items-center">
							<strong class="truncate">{account?.nickname}</strong>
							{#if account?.tick}
								<IconCheckCircle class="w-4 h-4 ml-1 text-blue-500 flex-shrink-0" />
							{/if}
						</p>
						<p class="text-base truncate">{account?.first_name} {account?.last_name}</p>
					</section>
				</button>
			{/snippet}
			{#snippet render()}
				<div class="bg-white rounded-lg shadow-xl border border-gray-200 min-w-[308px]">
					<AccountPreview user={account} />
				</div>
			{/snippet}
		</Tooltip>
	{/each}
</div>

{#if onSeeAll}
	<button
		class="block px-2 pb-2 text-base font-normal text-[#fe2c55] cursor-pointer w-full text-left"
		onclick={onSeeAll}
	>
		See all
	</button>
{/if}
