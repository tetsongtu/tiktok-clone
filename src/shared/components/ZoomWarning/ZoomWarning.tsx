import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'wouter-preact';
import { useZoomDetection } from '~/shared/hooks/useZoomDetection';
import styles from './ZoomWarning.module.css';

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
        <div className={styles.zoomWarning}>
            <h1 className={styles.warningTitle}>⚠️ Cảnh báo: Zoom không đúng 100%</h1>
            <p className={styles.warningText}>
                Vui lòng đặt zoom trình duyệt về 100% để có trải nghiệm tốt nhất
            </p>
        </div>
    );
};
