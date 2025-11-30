import { Link } from 'wouter-preact';
import { CheckCircleIcon } from '@phosphor-icons/react';

import type { UserProps } from '~/types/SiderbarMenu';
import UserAvatar from '~/components/UserAvatar';

// info avatar name check username

const wrapper = `flex items-center cursor-pointer hover:bg-[var(--primary)] p-1 px-2 hover:text-white`;

function AccountItem({ user }: UserProps) {
    return (
        <Link to={`/@${user.nickname}`} className={wrapper}>
            <UserAvatar user={user} />
            <section className="truncate ml-3">
                <h4 className="text-2xl flex items-center">
                    <span>{user.full_name}</span>
                    {user.tick && (
                        <CheckCircleIcon weight="fill" className="ml-1 text-green-500" />
                    )}
                </h4>
                <span className="text-2xl text-gray-400">{user.nickname}</span>
            </section>
        </Link>
    );
}

export default AccountItem;
