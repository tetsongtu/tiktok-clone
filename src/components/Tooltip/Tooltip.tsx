import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './Tooltip.scss';
import {
    useFloating,
    autoUpdate,
    offset,
    shift,
    arrow,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    type Placement,
} from '@floating-ui/react';

interface TooltipProps {
    children: React.ReactNode;
    visible?: boolean;
    content?: React.ReactNode;
    render?: () => React.ReactNode;
    interactive?: boolean;
    delay?: number | { open?: number; close?: number };
    offset?: number;
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

    const { x, y, strategy, refs, context, middlewareData } = useFloating({
        open: isTooltipVisible,
        onOpenChange: (open) => {
            !isControlled && setIsOpen(open);
            !open && onHide?.();
        },
        placement,
        whileElementsMounted: autoUpdate,
        middleware: [offset(offsetValue), shift(), arrow({ element: arrowRef })],
    });

    // Set reference từ wrapper
    useEffect(() => {
        const firstChild = wrapperRef.current?.firstElementChild;
        firstChild && refs.setReference(firstChild as HTMLElement);
    }, [refs.setReference]);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context, { delay, enabled: !isControlled }),
        useFocus(context, { enabled: !isControlled }),
        useDismiss(context),
        useRole(context, { role: 'tooltip' }),
    ]);

    // Xử lý click outside
    useEffect(() => {
        if (!isTooltipVisible || !onClickOutside) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target as Node;
            const isInsideTooltip = refs.floating.current?.contains(target);
            const isInsideWrapper = wrapperRef.current?.contains(target);

            if (!isInsideTooltip && !isInsideWrapper) {
                onClickOutside();
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
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
            }}
            {...getFloatingProps()}
        >
            {content || render?.()}
            <div
                ref={arrowRef}
                className={content ? 'tooltip-arrow' : ''}
                style={{
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    [STATIC_SIDE[arrowSide]]: '-4px',
                    position: 'absolute',
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
