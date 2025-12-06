import { XIcon, CaretLeftIcon } from '@phosphor-icons/react';
import type { ComponentChildren } from 'preact';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBack?: () => void;
    title?: string;
    children: ComponentChildren;
    maxWidth?: string;
    maxHeight?: string;
}

export function Modal({
    isOpen,
    onClose,
    onBack,
    title,
    children,
    maxWidth = '385px',
    maxHeight = '640px',
}: ModalProps) {
    if (!isOpen) return null;

    const style: Record<string, string> = { maxWidth };
    if (maxHeight) {
        style.maxHeight = maxHeight;
    }

    return (
        <div className="fixed flex justify-center pt-14 md:pt-[70px] z-50 top-0 left-0 w-full h-full bg-black/50 overflow-auto">
            <div className="relative bg-white w-full p-8 rounded-lg" style={style}>
                <header className="absolute flex justify-between items-center w-full p-5 left-0 top-0">
                    {onBack ? (
                        <button
                            onClick={onBack}
                            className="hover:bg-gray-200 p-2 rounded-full relative top-1"
                        >
                            <CaretLeftIcon size="20" weight="bold" />
                        </button>
                    ) : (
                        <div className="w-[36px]"></div>
                    )}
                    <button
                        onClick={onClose}
                        className="hover:bg-gray-200 p-2 rounded-full"
                    >
                        <XIcon size="28" />
                    </button>
                </header>

                <div className="max-w-md mx-auto text-center pt-7">
                    {title && <h1 className="pb-4 text-3xl">{title}</h1>}
                    {children}
                </div>
            </div>
        </div>
    );
}
