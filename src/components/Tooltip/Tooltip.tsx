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
    interactive?: boolean;
    delay?: number | [number, number];
    offset?: number | [number, number];
    placement?: Placement;
    onHide?: () => void;
    onClickOutside?: () => void;
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
    interactive = false,
    delay = 0,
    offset: offsetValue = 6,
    placement = 'bottom',
    onHide,
    onClickOutside,
}: TooltipProps) {
    const [isOpen, setIsOpen] = useState(false);
    const arrowRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const isControlled = visible !== undefined;
    const isTooltipVisible = visible ?? isOpen;
    const arrowSide = placement.split('-')[0];

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
            className={content ? 'tooltip-content' : 'render-content'}
            style={{
                top: y ?? 0,
                left: x ?? 0,
            }}
        >
            {content || render?.()}
            <div
                ref={arrowRef}
                className={content ? 'tooltip-arrow' : ''}
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
            className={classNames('tooltip-wrapper', {
                'tooltip-interactive': interactive,
            })}
            {...(!isControlled ? getReferenceProps() : {})}
        >
            {children}

            {isTooltipVisible && renderContent}
        </div>
    );
}

export default Tooltip;
