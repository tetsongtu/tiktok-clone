import type { Account } from '~/shared/types';
import { UserAvatar } from '~/features';
import { Link } from 'wouter-preact';

interface AccountPreviewProps {
    user: Account;
}

export function AccountPreview({ user }: AccountPreviewProps) {
    return (
        <div className="w-full p-4">
            <Link to={`/@${user.nickname}`}>
                <header className="flex justify-between items-start">
                    <UserAvatar user={user} />
                    <button className="rounded-md py-4 px-6 text-base text-white font-normal bg-[var(--primary)]">
                        Follow
                    </button>
                </header>
            </Link>
            <section className="mt-4 text-[#161823]">
                <p className="text-base">
                    <strong>{user.nickname}</strong>
                </p>
                <p className="text-base text-gray-600">
                    {user.first_name} {user.last_name}
                </p>
                <p className="mt-4.5 text-base">
                    <strong className="mr-1">{user.followers_count}</strong>
                    <span className="text-gray-500 mr-5">Followers</span>
                    <strong className="mr-1">{user.likes_count}</strong>
                    <span className="text-gray-500">Likes</span>
                </p>
            </section>
        </div>
    );
}
