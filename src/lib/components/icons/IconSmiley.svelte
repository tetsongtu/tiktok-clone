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
		d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a12,12,0,1,1-12-12A12,12,0,0,1,168,148Zm-56,0a12,12,0,1,1-12-12A12,12,0,0,1,112,148Zm76-28c0,35.82-29.47,52-68,52s-68-16.18-68-52a8,8,0,0,1,16,0c0,20.39,17.12,36,52,36s52-15.61,52-36a8,8,0,0,1,16,0Z"
	/>
</IconBase>
