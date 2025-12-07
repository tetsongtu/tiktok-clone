<script lang="ts">
	import IconBase from './IconBase.svelte';

	interface Props {
		class?: string;
		size?: number | string;
	}

	let { class: className = '', size = 24 }: Props = $props();
</script>

<IconBase class={className} {size}>
	<path
		d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66-5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,113.37V24a8,8,0,0,0-16,0v89.37L93.66,87a8,8,0,0,0-11.32,11.32Z"
	/>
</IconBase>
