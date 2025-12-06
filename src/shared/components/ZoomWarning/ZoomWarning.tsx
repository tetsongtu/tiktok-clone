import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'wouter-preact';
import { useZoomDetection } from '~/shared/hooks/useZoomDetection';

export const ZoomWarning = () => {
    const isZoomCorrect = useZoomDetection();
    const [location] = useLocation();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        // Hiển thị cảnh báo khi chuyển trang và zoom không đúng 100%
        if (!isZoomCorrect) {
            setShowWarning(true);

            // Tự động ẩn sau 5 giây
            const timer = setTimeout(() => {
                setShowWarning(false);
            }, 5000);

            return () => clearTimeout(timer);
        } else {
            setShowWarning(false);
        }
    }, [location, isZoomCorrect]); // location từ wouter là string, không có pathname

    if (!showWarning) return null;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-[90%] px-10 py-5 rounded-xl shadow-2xl text-center text-white bg-gradient-to-br from-red-400 to-red-500">
            <h1 className="m-0 mb-4.5 text-base font-normal">
                ⚠️ Cảnh báo: Zoom không đúng 100%
            </h1>
            <p className="m-0 text-base opacity-95">
                Vui lòng đặt zoom trình duyệt về 100% để có trải nghiệm tốt nhất
            </p>
        </div>
    );
};
