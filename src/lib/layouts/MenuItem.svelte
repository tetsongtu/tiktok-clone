<script lang="ts">
	import classNames from 'classnames';
	import { page } from '$app/state';

	interface Props {
		title: string;
		to: string;
		icon: string;
	}

	let { title, to, icon }: Props = $props();

	const isActive = $derived(page.url.pathname === to);

	const iconMap: Record<string, string> = {
		house: 'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z',
		users: 'M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92Z',
		video: 'M164,104a4,4,0,0,1-2,3.46l-48,32A4,4,0,0,1,108,136V72a4,4,0,0,1,6-3.46l48,32A4,4,0,0,1,164,104Z'
	};
</script>

<a
	href={to}
	class={classNames(
		'flex items-center w-full h-9 px-2 py-3 rounded text-base font-normal leading-normal',
		isActive && 'text-[var(--primary)]'
	)}
>
	<svg class="w-6 h-6" viewBox="0 0 256 256" fill="currentColor">
		<path d={iconMap[icon]} />
	</svg>
	<span class="ml-2.5">{title}</span>
</a>
