import { useState, useEffect } from 'preact/hooks';

export const useZoomDetection = () => {
    const [isZoomCorrect, setIsZoomCorrect] = useState(true);

    useEffect(() => {
        const checkZoom = () => {
            const zoomLevel = Math.round((window.devicePixelRatio || 1) * 100);
            setIsZoomCorrect(zoomLevel === 100);
        };

        // Kiểm tra zoom ban đầu
        checkZoom();

        // Lắng nghe sự kiện thay đổi zoom
        window.addEventListener('resize', checkZoom);

        return () => {
            window.removeEventListener('resize', checkZoom);
        };
    }, []);

    return isZoomCorrect;
};
