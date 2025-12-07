/** Format number to compact string (1.2K, 3.4M) */
export function formatCount(count: number): string {
	if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
	if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
	return count.toString();
}

/** Format date to relative time */
export function formatRelativeTime(date: Date | string): string {
	const diffMs = Date.now() - new Date(date).getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffDays > 7) return new Date(date).toLocaleDateString('vi-VN');
	if (diffDays > 0) return `${diffDays} ngày trước`;
	if (diffHours > 0) return `${diffHours} giờ trước`;
	if (diffMins > 0) return `${diffMins} phút trước`;
	return 'Vừa xong';
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
	return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
}

/** Extract hashtags from text */
export function extractHashtags(text: string): string[] {
	const matches = text.match(/#[\w\u00C0-\u024F]+/g);
	return matches ? [...new Set(matches)] : [];
}
