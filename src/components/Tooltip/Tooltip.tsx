import styles from './Tooltip.module.scss';
import classNames from 'classnames/bind';

import React, { useEffect, useRef } from 'react';

import {
    computePosition,
    shift,
    offset,
    arrow,
    type Placement,
    type MiddlewareData,
} from '@floating-ui/dom';

const cx = classNames.bind(styles);

interface TooltipProps {
    children: React.ReactElement;
    visible?: boolean;
    content?: string;
    showArrow?: boolean;
    render?: (attrs: React.HTMLAttributes<HTMLDivElement>) => React.ReactNode;
}

function Tooltip({
    children,
    visible = true,
    content,
    showArrow = true,
    render,
}: TooltipProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!visible) return;

        const trigger = triggerRef.current;
        const tooltip = tooltipRef.current;
        const arrowEl = arrowRef.current;

        if (!trigger || !tooltip) return;

        const updatePosition = () => {
            const middleware = [shift({ padding: 5 }), offset(6)];
            if (showArrow && arrowEl) middleware.push(arrow({ element: arrowEl }));

            computePosition(trigger, tooltip, {
                middleware,
            }).then(({ x, y, placement, middlewareData }) => {
                Object.assign(tooltip.style, { left: `${x}px`, top: `${y}px` });

                if (!middlewareData.arrow) return;
                applyArrowStyles(arrowEl!, placement, middlewareData);
            });
        };

        trigger.addEventListener('mouseenter', updatePosition);
    }, [showArrow, visible]);
    return (
        <div className={cx('wrapper')}>
            {React.cloneElement(children, { ref: triggerRef })}
            {visible &&
                (render ? (
                    render({ ref: tooltipRef })
                ) : (
                    <div ref={tooltipRef} className={cx('content')}>
                        {content}
                        {showArrow && <div ref={arrowRef} className={cx('arrow')} />}
                    </div>
                ))}
        </div>
    );
}

function applyArrowStyles(
    arrowEl: HTMLDivElement,
    placement: Placement,
    middlewareData: MiddlewareData,
) {
    const { x, y } = middlewareData.arrow || {};
    const staticSide: any = {
        bottom: 'top',
    }[placement.split('-')[0]];

    Object.assign(arrowEl.style, {
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
        [staticSide]: '-4px',
    });
}

export default Tooltip;
