import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Tooltip.module.scss';

import {
    computePosition,
    shift,
    offset,
    arrow,
    type Placement,
    type MiddlewareData,
} from '@floating-ui/dom';

const cx = classNames.bind(styles);

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
        bottom: 'top',
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
}: any) {
    // State
    const [showTooltip, setShowTooltip] = useState(false);
    const isTooltipVisible = visible ?? showTooltip;

    const showTimeout = useRef<any>(null);
    const hideTimeout = useRef<any>(null);

    // Refs
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    const updatePosition = () => {
        const trigger = triggerRef.current;
        const tooltip = tooltipRef.current;
        const arrowEl = arrowRef.current;

        if (!trigger || !tooltip || !arrowEl) return;

        const middleware = [
            shift({ padding: 5 }),
            offset(6),
            arrow({ element: arrowEl }),
        ];

        computePosition(trigger, tooltip, { middleware }).then(
            ({ x, y, placement, middlewareData }) => {
                Object.assign(tooltip.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });

                if (middlewareData.arrow) {
                    applyArrowStyles(arrowEl, placement, middlewareData);
                }
            },
        );
    };

    // Positioning
    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        trigger.addEventListener('mouseenter', updatePosition);
    }, []);

    const createTimeoutHandler = (show: boolean, delayTime: number, timeoutRef: any) => {
        if (delayTime > 0) {
            timeoutRef.current = setTimeout(() => {
                setShowTooltip(show);
            }, delayTime);
        } else {
            setShowTooltip(show);
        }
    };

    // Hover control (if visible not controlled externally)
    const hoverProps = visible ?? {
        onMouseEnter: () => createTimeoutHandler(true, delay[0], showTimeout),
        onMouseLeave: () => createTimeoutHandler(false, delay[1], hideTimeout),
    };

    const renderContent = content ? (
        <div ref={tooltipRef} className={cx('content')}>
            {content}
            <div ref={arrowRef} className={cx('arrow')} />
        </div>
    ) : render ? (
        <div className={cx('render-content')}>{render()}</div>
    ) : null;

    return (
        <div className={cx('wrapper', { interactive })} {...hoverProps}>
            {React.cloneElement(children, { ref: triggerRef })}

            {isTooltipVisible && renderContent}
        </div>
    );
}

export default Tooltip;
