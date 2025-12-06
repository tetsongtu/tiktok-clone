<script lang="ts">
	import classNames from 'classnames';
	import images from '~/lib/assets/images';

	interface Props {
		src: string;
		alt?: string;
		class?: string;
		rounded?: boolean;
		fallback?: string;
		style?: string;
	}

	let {
		src,
		alt = '',
		class: className = '',
		rounded = false,
		fallback: customFallback = images.noImage,
		style = '',
		...props
	}: Props = $props();

	let fallback = $state('');

	function handleError() {
		fallback = customFallback;
	}
</script>

<img
	class={classNames(
		'overflow-hidden select-none pointer-events-none',
		rounded && 'rounded-full object-cover',
		className
	)}
	src={fallback || src}
	{alt}
	{style}
	onerror={handleError}
	{...props}
/>
