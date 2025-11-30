import { useEffect, useRef, useState } from 'preact/hooks';
import classNames from 'classnames';
import {
    useFloating,
    offset,
    shift,
    arrow,
    useHover,
    useInteractions,
    type Placement,
} from '@floating-ui/react';
import Arrow from './Arrow';
import './Tooltip.scss';

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
    const showTooltip = visible ?? isOpen;

    // Floating UI configuration
    const { x, y, refs, context, middlewareData } = useFloating({
        open: showTooltip,
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

    // Hover configuration
    const hoverConfig = Array.isArray(delay)
        ? { delay: { open: delay[0], close: delay[1] } }
        : { delay };

    const { getReferenceProps } = useInteractions([
        useHover(context, { ...hoverConfig, enabled: !isControlled }),
    ]);

    // Effects
    useEffect(() => {
        const firstChild = wrapperRef.current?.firstElementChild;
        firstChild && refs.setReference(firstChild as HTMLElement);
    }, []);

    useEffect(() => {
        if (!showTooltip) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target as Node;
            const isInside =
                refs.floating.current?.contains(target) ||
                wrapperRef.current?.contains(target);

            if (!isInside) onClickOutside?.();
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showTooltip, onClickOutside]);

    // Render helpers
    const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

    const contentClass =
        'text-white font-bold bg-black px-2 py-1 rounded text-[1.4rem] select-none';
    const renderClass = '';

    const renderContent = (
        <div
            ref={refs.setFloating}
            style={{ position: 'absolute', top: y ?? 0, left: x ?? 0 }}
            className={content ? contentClass : renderClass}
        >
            {content || render?.()}
            <Arrow
                arrowRef={arrowRef}
                placement={placement}
                arrowX={arrowX}
                arrowY={arrowY}
                hasContent={!!content}
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
            {showTooltip && renderContent}
        </div>
    );
}

export default Tooltip;
