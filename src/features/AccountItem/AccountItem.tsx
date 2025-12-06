import { Link } from 'wouter-preact';
import { CheckCircleIcon } from '@phosphor-icons/react';

import type { AccountItemProps } from '~/shared/types';
import { UserAvatar } from '~/features';

const wrapper = `w-[250px] flex items-center cursor-pointer hover:bg-[var(--primary)] p-1 px-2 transition-all duration-200 group`;

export function AccountItem({ user }: AccountItemProps) {
    return (
        <Link to={`/@${user.nickname}`} className={wrapper}>
            <div className="transition-transform group-hover:scale-110">
                <UserAvatar user={user} />
            </div>
            <section className="truncate ml-3 flex-1">
                <h4 className="text-lg font-semibold flex items-center text-gray-900 group-hover:text-white  transition-colors">
                    <span className="truncate">{user.full_name}</span>
                    {user.tick && (
                        <CheckCircleIcon weight="fill" className="ml-1 text-blue-500" />
                    )}
                </h4>
                <span className="text-base text-gray-500 group-hover:text-gray-700 transition-colors">
                    {user.nickname}
                </span>
            </section>
        </Link>
    );
}
