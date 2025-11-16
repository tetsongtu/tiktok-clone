import config from '~/config';
import { HouseIcon, UsersIcon, VideoCameraIcon } from '@phosphor-icons/react';

export const SIDEBAR_MENU = [
    {
        title: 'For You',
        to: config.routes.home,
        icon: <HouseIcon />, // Outline version
        actionIcon: <HouseIcon weight="fill" />, // Fill version khi active
    },
    {
        title: 'Following',
        to: config.routes.following,
        icon: <UsersIcon />, // Outline version
        actionIcon: <UsersIcon weight="fill" />, // Fill version khi active
    },
    {
        title: 'LIVE',
        to: config.routes.live,
        icon: <VideoCameraIcon />, // Outline version
        actionIcon: <VideoCameraIcon weight="fill" />, // Fill version khi active
    },
];
