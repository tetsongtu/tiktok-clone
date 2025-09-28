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

function Tooltip({ children, visible, content, render }: any) {
    // State
    const [showTooltip, setShowTooltip] = useState(false);
    const isTooltipVisible = visible !== undefined ? visible : showTooltip;

    // Refs
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    // Positioning
    useEffect(() => {
        const trigger = triggerRef.current;
        const tooltip = tooltipRef.current;
        const arrowEl = arrowRef.current;
        if (!trigger || !tooltip) return;

        const updatePosition = () => {
            const middleware = [
                shift({ padding: 5 }),
                offset(6),
                arrow({ element: arrowEl! }),
            ];

            computePosition(trigger, tooltip, { middleware }).then(
                ({ x, y, placement, middlewareData }) => {
                    Object.assign(tooltip.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                    });

                    if (!middlewareData.arrow) return;
                    applyArrowStyles(arrowEl!, placement, middlewareData);
                },
            );
        };

        trigger.addEventListener('mouseenter', updatePosition);
    }, []);

    // Hover control (if visible not controlled externally)
    const hoverProps =
        visible === undefined
            ? {
                  onMouseEnter: () => setShowTooltip(true),
                  onMouseLeave: () => setShowTooltip(false),
              }
            : {};

    // Render
    return (
        <div className={cx('wrapper')} {...hoverProps}>
            {React.cloneElement(children, { ref: triggerRef })}

            {isTooltipVisible && render && render()}

            {content && (
                <div ref={tooltipRef} className={cx('content')}>
                    {content}
                    <div ref={arrowRef} className={cx('arrow')} />
                </div>
            )}
        </div>
    );
}

export default Tooltip;
