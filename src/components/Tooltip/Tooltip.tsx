import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './Tooltip.scss';
import {
    useFloating,
    offset,
    shift,
    arrow,
    useHover,
    useInteractions,
    type Placement,
} from '@floating-ui/react';

interface TooltipProps {
    children: React.ReactNode;
    visible?: boolean;
    content?: React.ReactNode;
    render?: () => React.ReactNode;
    delay?: number | [number, number];
    offset?: number | [number, number];
    placement?: Placement;
    onHide?: () => void;
    onClickOutside?: () => void;
    className?: string;
}

const STATIC_SIDE: Record<string, string> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
};

function Tooltip({
    children,
    visible,
    content,
    render,
    delay = 0,
    offset: offsetValue = 6,
    placement = 'bottom',
    onHide,
    onClickOutside,
    className,
}: TooltipProps) {
    const [isOpen, setIsOpen] = useState(false);
    const arrowRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Constants
    const isControlled = visible !== undefined;
    const isTooltipVisible = visible ?? isOpen;
    const arrowSide = placement.split('-')[0];

    // Floating UI configuration
    const { x, y, refs, context, middlewareData } = useFloating({
        open: isTooltipVisible,
        onOpenChange: (open) => {
            !isControlled && setIsOpen(open);
            !open && onHide?.();
        },
        placement,
        middleware: [
            Array.isArray(offsetValue)
                ? offset({ mainAxis: offsetValue[1], crossAxis: offsetValue[0] })
                : offset(offsetValue),
            shift(),
            arrow({ element: arrowRef }),
        ],
    });

    // Set reference từ wrapper
    useEffect(() => {
        const firstChild = wrapperRef.current?.firstElementChild;
        firstChild && refs.setReference(firstChild as HTMLElement);
    }, []);

    // Hover configuration
    const hoverConfig = Array.isArray(delay)
        ? { delay: { open: delay[0], close: delay[1] } }
        : { delay };

    const { getReferenceProps } = useInteractions([
        useHover(context, { ...hoverConfig, enabled: !isControlled }),
    ]);

    // Xử lý click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!isTooltipVisible) return;

            const target = e.target as Node;
            const isInsideTooltip = refs.floating.current?.contains(target);
            const isInsideWrapper = wrapperRef.current?.contains(target);

            if (!isInsideTooltip && !isInsideWrapper) {
                onClickOutside?.();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isTooltipVisible, onClickOutside]);

    const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

    const renderContent = (
        <div
            ref={refs.setFloating}
            className={classNames(
                'absolute z-50',
                content
                    ? 'text-white font-bold bg-black px-2 py-1 rounded text-[1.4rem] select-none'
                    : 'absolute left-0 p-5',
            )}
            style={{
                top: y ?? 0,
                left: x ?? 0,
            }}
        >
            {content || render?.()}
            <div
                ref={arrowRef}
                className={content ? 'absolute w-2 h-2 bg-black transform rotate-45' : ''}
                style={{
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    [STATIC_SIDE[arrowSide]]: '-4px',
                }}
            />
        </div>
    );

    return (
        <div
            ref={wrapperRef}
            className={classNames('wrapper', className)}
            {...(!isControlled ? getReferenceProps() : {})}
        >
            {children}

            {isTooltipVisible && renderContent}
        </div>
    );
}

export default Tooltip;
