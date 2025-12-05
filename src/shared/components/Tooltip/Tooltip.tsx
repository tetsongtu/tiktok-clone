import { useEffect, useRef, useState } from 'preact/hooks';
import classNames from 'classnames';

import {
    useFloating,
    offset,
    shift,
    arrow,
    useHover,
    useInteractions,
    FloatingPortal,
    useTransitionStyles,
    type Placement,
} from '@floating-ui/react';
import Arrow from './Arrow';
import './Tooltip.scss';

interface TooltipProps {
    children: React.ReactNode;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    content?: React.ReactNode;
    render?: () => React.ReactNode;
    delay?: number | [number, number];
    offset?: number | [number, number];
    placement?: Placement;
    onClickOutside?: () => void;
    animation?: boolean;
    animationDuration?: number;
    className?: string;
}

function Tooltip({
    children,
    visible,
    onVisibleChange,
    content,
    render,
    delay = 0,
    offset: offsetValue = 6,
    placement = 'bottom',
    onClickOutside,
    animation = true,
    animationDuration = 200,
    className,
}: TooltipProps) {
    const [isOpen, setIsOpen] = useState(false);
    const arrowRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const showTooltip = visible ?? isOpen;

    const handleOpenChange = (open: boolean) => {
        if (visible !== undefined) {
            onVisibleChange?.(open);
        } else {
            setIsOpen(open);
        }
    };

    const offsetMiddleware = Array.isArray(offsetValue)
        ? offset({ mainAxis: offsetValue[1], crossAxis: offsetValue[0] })
        : offset(offsetValue);

    const middleware = [offsetMiddleware, shift()];
    if (content) {
        middleware.push(arrow({ element: arrowRef }));
    }

    const { x, y, refs, context, middlewareData } = useFloating({
        open: showTooltip,
        onOpenChange: handleOpenChange,
        placement,
        middleware,
    });

    const hoverDelay = Array.isArray(delay) ? { open: delay[0], close: delay[1] } : delay;

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context, { delay: hoverDelay }),
    ]);

    const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
        duration: animation ? animationDuration : 0,
        initial: { opacity: 0, transform: 'scale(0.95)' },
        open: { opacity: 1, transform: 'scale(1)' },
        close: { opacity: 0, transform: 'scale(0.95)' },
    });

    useEffect(() => {
        if (wrapperRef.current) {
            const firstChild = wrapperRef.current.firstElementChild;
            if (firstChild) {
                refs.setReference(firstChild as HTMLElement);
            }
        }
    }, [children, refs]);

    useEffect(() => {
        if (!showTooltip || !onClickOutside) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const isClickInside =
                refs.floating.current?.contains(target) ||
                wrapperRef.current?.contains(target);

            if (!isClickInside) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showTooltip, onClickOutside, refs.floating]);

    const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

    return (
        <>
            <div
                ref={wrapperRef}
                className={classNames(className, 'wrapper')}
                {...getReferenceProps()}
            >
                {children}
            </div>
            {isMounted && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        style={{
                            position: 'absolute',
                            top: y ?? 0,
                            left: x ?? 0,
                            zIndex: 9999,
                            visibility: showTooltip ? 'visible' : 'hidden',
                            ...transitionStyles,
                        }}
                        className={
                            content
                                ? 'text-white font-bold bg-black px-2 py-1 rounded text-[1.4rem] select-none'
                                : ''
                        }
                        {...getFloatingProps()}
                    >
                        {content || render?.()}
                        {content && (
                            <Arrow
                                arrowRef={arrowRef}
                                placement={placement}
                                arrowX={arrowX}
                                arrowY={arrowY}
                            />
                        )}
                    </div>
                </FloatingPortal>
            )}
        </>
    );
}

export default Tooltip;
