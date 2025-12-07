/**
 * Format a number to a compact string (e.g., 1.2K, 3.4M)
 */
export function formatCount(count: number): string {
	if (count >= 1_000_000) {
		return `${(count / 1_000_000).toFixed(1)}M`;
	}
	if (count >= 1_000) {
		return `${(count / 1_000).toFixed(1)}K`;
	}
	return count.toString();
}

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
	const now = new Date();
	const past = new Date(date);
	const diffMs = now.getTime() - past.getTime();
	const diffSecs = Math.floor(diffMs / 1000);
	const diffMins = Math.floor(diffSecs / 60);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffDays > 7) {
		return past.toLocaleDateString('vi-VN');
	}
	if (diffDays > 0) {
		return `${diffDays} ngày trước`;
	}
	if (diffHours > 0) {
		return `${diffHours} giờ trước`;
	}
	if (diffMins > 0) {
		return `${diffMins} phút trước`;
	}
	return 'Vừa xong';
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength)}...`;
}

/**
 * Format video duration (seconds to mm:ss)
 */
export function formatDuration(seconds: number): string {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format file size (bytes to KB, MB, GB)
 */
export function formatFileSize(bytes: number): string {
	if (bytes >= 1_073_741_824) {
		return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
	}
	if (bytes >= 1_048_576) {
		return `${(bytes / 1_048_576).toFixed(1)} MB`;
	}
	if (bytes >= 1024) {
		return `${(bytes / 1024).toFixed(1)} KB`;
	}
	return `${bytes} B`;
}

/**
 * Extract hashtags from text
 */
export function extractHashtags(text: string): string[] {
	const matches = text.match(/#[\w\u00C0-\u024F]+/g);
	return matches ? [...new Set(matches)] : [];
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
	if (!text) return '';
	return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Generate initials from name (e.g., "John Doe" -> "JD")
 */
export function getInitials(name: string, maxLength = 2): string {
	if (!name) return '';
	return name
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase())
		.slice(0, maxLength)
		.join('');
}
