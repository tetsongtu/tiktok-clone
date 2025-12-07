<script lang="ts">
	interface Props {
		class?: string;
		size?: number | string;
		children: any;
	}

	let props: Props = $props();
	
	const sizeValue = $derived(typeof props.size === 'number' ? `${props.size}px` : (props.size || '24px'));
</script>

<svg
	class={props.class || ''}
	style="width: {sizeValue}; height: {sizeValue}"
	viewBox="0 0 256 256"
	fill="currentColor"
	aria-hidden="true"
>
	{@render props.children()}
</svg>
