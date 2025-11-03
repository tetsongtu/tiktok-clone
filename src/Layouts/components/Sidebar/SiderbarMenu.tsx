import config from '~/config';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { RiGroupLine, RiGroupFill } from 'react-icons/ri';
import { BsCameraVideo, BsCameraVideoFill } from 'react-icons/bs';

export const SIDEBAR_MENU = [
    {
        title: 'For You',
        to: config.routes.home,
        icon: <AiOutlineHome />,
        actionIcon: <AiFillHome />,
    },
    {
        title: 'Following',
        to: config.routes.following,
        icon: <RiGroupLine />,
        actionIcon: <RiGroupFill />,
    },
    {
        title: 'LIVE',
        to: config.routes.live,
        icon: <BsCameraVideo />,
        actionIcon: <BsCameraVideoFill />,
    },
];
