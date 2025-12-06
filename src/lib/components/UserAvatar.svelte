<script lang="ts">
	import classNames from 'classnames';
	import Image from './Image.svelte';

	interface Props {
		user?: { nickname?: string; avatar?: string };
		size?: number;
		fallback?: string;
		class?: string;
	}

	let { user, size = 13, fallback, class: className = '' }: Props = $props();

	const style = $derived(`width: ${size * 0.25}rem; height: ${size * 0.25}rem;`);
</script>

<Image
	{style}
	rounded
	src={user?.avatar || ''}
	alt={user?.nickname || ''}
	{fallback}
	class={classNames(className, 'cursor-pointer shrink-0')}
/>
