export function resetToHome() {
    if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/');
    }
}
