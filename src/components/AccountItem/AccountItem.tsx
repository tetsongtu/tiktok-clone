import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@phosphor-icons/react';

import type { UserProps } from '~/types/SiderbarMenu';
import Image from '~/components/Image';

// info avatar name check username

const wrapper = `flex items-center cursor-pointer hover:bg-[var(--primary)] p-1 px-2 hover:text-white`;

function AccountItem({ user }: UserProps) {
    return (
        <Link to={`/@${user.nickname}`} className={wrapper}>
            <Image rounded src={user.avatar} alt={user.full_name} className="w-13 h-13" />

            <div className="truncate px-3">
                <h4 className="text-2xl flex items-center">
                    <span>{user.full_name}</span>
                    {user.tick && (
                        <CheckCircleIcon weight="fill" className="ml-1 text-green-500" />
                    )}
                </h4>
                <span className="text-2xl text-gray-400">{user.nickname}</span>
            </div>
        </Link>
    );
}

export default AccountItem;
