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
		d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM213.66,146.34l18.35,18.35a8,8,0,0,1-11.32,11.32L202.34,157.66l-18.35,18.35a8,8,0,0,1-11.32-11.32L191,146.34l-18.35-18.35a8,8,0,0,1,11.32-11.32L202.34,135l18.35-18.35a8,8,0,0,1,11.32,11.32Z"
	/>
</IconBase>
