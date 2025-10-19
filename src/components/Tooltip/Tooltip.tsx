import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './Tooltip.scss';

import {
    computePosition,
    shift,
    offset,
    arrow,
    type Placement,
    type MiddlewareData,
} from '@floating-ui/dom';

/**
 * Utility: Apply arrow styles based on placement
 */
function applyArrowStyles(
    arrowEl: HTMLDivElement,
    placement: Placement,
    middlewareData: MiddlewareData,
) {
    const { x, y } = middlewareData.arrow || {};
    const staticSide: Record<string, string> = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    };

    Object.assign(arrowEl.style, {
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
        [staticSide[placement.split('-')[0]]]: '-4px',
    });
}

function Tooltip({
    children,
    visible,
    content,
    render,
    interactive,
    delay = [0, 0],
    offset: offsetValue = 6,
    onHide,
}: any) {
    // State
    const [showTooltip, setShowTooltip] = useState(false);
    const isTooltipVisible = visible ?? showTooltip;

    const showTimeout = useRef<any>(null);
    const hideTimeout = useRef<any>(null);

    // Refs
    const wrapperRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    const updatePosition = () => {
        const wrapper = wrapperRef.current;
        const tooltip = tooltipRef.current;
        const arrowEl = arrowRef.current;

        if (!wrapper || !tooltip || !arrowEl) return;

        const trigger = wrapper.children[0] as HTMLElement;
        if (!trigger) return;

        const middleware = [
            shift({ padding: 5 }),
            offset(
                Array.isArray(offsetValue)
                    ? {
                          mainAxis: offsetValue[0],
                          crossAxis: offsetValue[1],
                      }
                    : offsetValue,
            ),
            arrow({ element: arrowEl }),
        ];

        computePosition(trigger, tooltip, {
            placement: 'bottom',
            middleware,
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(tooltip.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

            if (middlewareData.arrow) {
                applyArrowStyles(arrowEl, placement, middlewareData);
            }
        });
    };

    // Positioning
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        wrapper.addEventListener('mouseenter', updatePosition);
    }, []);

    const createTimeoutHandler = (show: boolean, delayTime: number, timeoutRef: any) => {
        clearTimeout(timeoutRef.current);

        const action = () => {
            setShowTooltip(show);
            if (!show) onHide?.();
        };

        delayTime > 0 ? (timeoutRef.current = setTimeout(action, delayTime)) : action();
    };

    // Hover control (if visible not controlled externally)
    const hoverProps = visible ?? {
        onMouseEnter: () => createTimeoutHandler(true, delay[0], showTimeout),
        onMouseLeave: () => createTimeoutHandler(false, delay[1], hideTimeout),
    };

    const renderContent = (
        <div ref={tooltipRef} className={content ? 'tooltip-content' : 'render-content'}>
            {content || render()}
            <div ref={arrowRef} className={content && 'tooltip-arrow'} />
        </div>
    );

    return (
        <div
            ref={wrapperRef}
            className={classNames('tooltip-wrapper', {
                'tooltip-interactive': interactive,
            })}
            {...hoverProps}
        >
            {children}
            {isTooltipVisible && renderContent}
        </div>
    );
}

export default Tooltip;
