export function load({ params }) {
	return {
		videoId: Number(params.id),
		username: params.username
	};
}
