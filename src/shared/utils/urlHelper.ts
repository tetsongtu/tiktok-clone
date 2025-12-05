export const resetToHome = () => {
    window.history.replaceState(null, '', '/');
};

export const setVideoUrl = (videoId: string) => {
    window.history.replaceState(null, '', `/?video=${videoId}`);
};
