import { Button } from '~/shared';
import { SOCIAL_BUTTONS } from './constants';

interface RegisterProps {
    onSuccess: (userData?: any) => void;
}

function Register({ onSuccess }: RegisterProps) {
    return (
        <div className="flex flex-col gap-3">
            {SOCIAL_BUTTONS.map((btn, idx) => (
                <Button
                    key={idx}
                    className="h-[35px]"
                    size="small"
                    variant="outline"
                    leftIcon={btn.icon}
                >
                    {btn.label}
                </Button>
            ))}
            <Button
                className="h-[35px]"
                size="small"
                variant="outline"
                onClick={onSuccess}
            >
                Continue as Guest
            </Button>
        </div>
    );
}

export default Register;
