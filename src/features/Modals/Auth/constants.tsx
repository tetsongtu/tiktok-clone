import { FacebookIcon, GoogleIcon } from '~/shared';

export const SOCIAL_BUTTONS = [
    { label: 'Continue with Facebook', icon: <FacebookIcon /> },
    { label: 'Continue with Google', icon: <GoogleIcon /> },
    { label: 'Continue with LINE', icon: null },
    { label: 'Continue with KakaoTalk', icon: null },
];

export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const MIN_PASSWORD_LENGTH = 6;
