import { SpinnerIcon } from '@phosphor-icons/react';

export function LoadingOverlay() {
    return (
        <div
            className="fixed top-24 left-1/2 -translate-x-1/2 
                       bg-gradient-to-r from-purple-600 to-pink-600 
                       text-white px-8 py-4 rounded-full z-[60]
                       text-base font-semibold shadow-2xl backdrop-blur-sm
                       flex items-center gap-3 animate-fadeInOut"
        >
            <SpinnerIcon className="animate-spin w-5 h-5" />
            <span>Đang tải video mới...</span>
        </div>
    );
}
