import styles from './SearchTooltip.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useRef } from 'react';
import images from '~/assets/images';

import {
    computePosition,
    shift,
    offset,
    arrow,
    type Placement,
    type MiddlewareData,
} from '@floating-ui/dom';

const cx = classNames.bind(styles);

interface MyTooltipProps {
    content: string;
    showArrow?: boolean;
}

function SearchTooltip({ content, showArrow = true }: MyTooltipProps) {
    const searchBtnRef = useRef<HTMLButtonElement>(null);
    const searchTooltipRef = useRef<HTMLDivElement>(null);
    const tooltipArrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = searchBtnRef.current;
        const tooltip = searchTooltipRef.current;
        const arrowEl = tooltipArrowRef.current;

        if (!button || !tooltip) return;

        const updatePosition = () => {
            const middleware = [shift({ padding: 5 }), offset(6)];
            if (showArrow && arrowEl) middleware.push(arrow({ element: arrowEl }));

            computePosition(button, tooltip, {
                middleware,
            }).then(({ x, y, placement, middlewareData }) => {
                Object.assign(tooltip.style, { left: `${x}px`, top: `${y}px` });
                if (!middlewareData.arrow) return;
                applyArrowStyles(arrowEl!, placement, middlewareData);
            });
        };

        button.addEventListener('mouseenter', updatePosition);
    }, [showArrow]);
    return (
        <>
            <button ref={searchBtnRef} className={cx('search-btn')}>
                <img src={images.search} alt="Search" />
            </button>
            <div ref={searchTooltipRef} className={cx('tooltip')}>
                {content}
                {showArrow && <div ref={tooltipArrowRef} className={cx('arrow')} />}
            </div>
        </>
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

export default SearchTooltip;
