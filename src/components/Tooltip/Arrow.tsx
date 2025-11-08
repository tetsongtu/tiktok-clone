import { type Placement } from '@floating-ui/react';

interface ArrowProps {
    arrowRef: React.RefObject<HTMLDivElement>;
    placement: Placement;
    arrowX?: number;
    arrowY?: number;
    hasContent?: boolean;
}

function Arrow({ arrowRef, placement, arrowX, arrowY, hasContent }: ArrowProps) {
    if (!hasContent) return null;

    const staticSide: any = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[placement.split('-')[0]];

    const arrowStyle = {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        [staticSide]: '-4px',
    };

    const classes = 'absolute w-2 h-2 bg-inherit transform rotate-45';
    return <div ref={arrowRef} className={classes} style={arrowStyle} />;
}

export default Arrow;
