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
		d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm0-144a56,56,0,0,0-56,56,8,8,0,0,1-16,0,72,72,0,1,1,72,72,8,8,0,0,1,0-16A56,56,0,0,0,128,72Z"
	/>
</IconBase>
