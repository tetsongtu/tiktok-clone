import { BiLoaderCircle } from 'react-icons/bi';
import type { ActionButtonProps } from '~/types';

export function ActionButton({
    icon,
    count,
    onClick,
    disabled = false,
    isActive = false,
    isLoading = false,
}: ActionButtonProps) {
    const buttonStyle = {
        background: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: '0.5rem',
    };

    const iconContainerStyle = {
        borderRadius: '50%',
        padding: '0.5rem',
        backgroundColor: isActive ? '#ffebee' : '#e5e7eb',
        display: 'grid',
        placeItems: 'center',
        width: '40px',
        height: '40px',
    };

    return (
        <button disabled={disabled} onClick={onClick} style={buttonStyle}>
            <div style={iconContainerStyle}>
                {isLoading ? <BiLoaderCircle size={20} /> : icon}
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{count}</span>
        </button>
    );
}

export default ActionButton;
