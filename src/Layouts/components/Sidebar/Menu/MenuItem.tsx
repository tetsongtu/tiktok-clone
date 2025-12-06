import classNames from 'classnames';
import { Link, useRoute } from 'wouter-preact';
import type { MenuItemProps } from '~/shared/types';

function MenuItem({ title, to, icon, actionIcon }: MenuItemProps) {
    const [isActive] = useRoute(to);

    return (
        <Link
            href={to}
            className={classNames(
                'flex items-center w-full h-9 px-2 py-3 rounded text-base font-normal leading-normal',
                isActive && 'text-[var(--primary)]',
            )}
        >
            <span className={classNames('text-base', isActive && 'hidden')}>{icon}</span>
            <span className={classNames('text-base', !isActive && 'hidden')}>
                {actionIcon}
            </span>
            <span className="ml-2.5">{title}</span>
        </Link>
    );
}

export default MenuItem;
