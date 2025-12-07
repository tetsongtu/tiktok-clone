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
		d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-109.66-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L120,116.69V56a8,8,0,0,1,16,0v60.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"
	/>
</IconBase>
