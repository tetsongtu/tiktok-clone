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
		d="M224,152a8,8,0,0,1-8,8H192v24a8,8,0,0,1-16,0V160H152a8,8,0,0,1,0-16h24V120a8,8,0,0,1,16,0v24h24A8,8,0,0,1,224,152ZM56,120H72v16a8,8,0,0,0,16,0V120h16a8,8,0,0,0,0-16H88V88a8,8,0,0,0-16,0v16H56a8,8,0,0,0,0,16ZM184,192H40V56H184a8,8,0,0,0,0-16H40A16,16,0,0,0,24,56V192a16,16,0,0,0,16,16H184a8,8,0,0,0,0-16Z"
	/>
</IconBase>
