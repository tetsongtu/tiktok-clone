import { Button, GUEST_USER } from '~/shared';
import { SOCIAL_BUTTONS } from './constants';

interface OptionsProps {
    onLoginClick: () => void;
    onSuccess: (userData?: any) => void;
}

function Options({ onLoginClick, onSuccess }: OptionsProps) {
    return (
        <div className="flex flex-col gap-3">
            <Button className="h-[44px]" size="small" variant="outline">
                Use QR code
            </Button>
            <Button
                className="h-[44px]"
                size="small"
                variant="outline"
                onClick={onLoginClick}
            >
                Use phone / email / username
            </Button>
            {SOCIAL_BUTTONS.map((btn, idx) => (
                <Button
                    key={idx}
                    className="h-[44px]"
                    size="small"
                    variant="outline"
                    leftIcon={btn.icon}
                >
                    {btn.label}
                </Button>
            ))}
            <Button
                className="h-[44px]"
                size="small"
                variant="outline"
                onClick={() => onSuccess(GUEST_USER)}
            >
                Continue as Guest
            </Button>
        </div>
    );
}

export default Options;
