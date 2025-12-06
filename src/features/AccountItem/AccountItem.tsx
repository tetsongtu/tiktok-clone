import { Link } from 'wouter-preact';
import { CheckCircleIcon } from '@phosphor-icons/react';

import type { AccountItemProps } from '~/shared/types';
import { UserAvatar } from '~/features';

const wrapper = `w-[250px] flex items-center cursor-pointer p-4 px-2 group`;

export function AccountItem({ user }: AccountItemProps) {
    return (
        <Link to={`/@${user.nickname}`} className={wrapper}>
            <div>
                <UserAvatar user={user} />
            </div>
            <section className="truncate ml-3 flex-1">
                <h4 className="text-base font-normal flex items-center text-gray-900 group-">
                    <span className="truncate">{user.full_name}</span>
                    {user.tick && (
                        <CheckCircleIcon weight="fill" className="ml-1 text-blue-500" />
                    )}
                </h4>
                <span className="text-base text-gray-500 group-">
                    {user.nickname}
                </span>
            </section>
        </Link>
    );
}
