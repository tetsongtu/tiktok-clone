import classNames from 'classnames/bind';
import { useState } from 'react';

import { Tooltip } from '../../Tooltip';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

interface MenuProps {
    children: React.ReactNode;
    items: MenuItemData[];
    onChange?: (item: MenuItemData) => void;
}

interface MenuLevel {
    title?: string;
    data: MenuItemData[];
}

export interface MenuItemData {
    icon?: React.ReactNode;
    title: string;
    to?: string;
    type?: string;
    code?: string;
    separate?: boolean;
    children?: MenuLevel;
}

function Menu({ children, items = [], onChange = defaultFn }: MenuProps) {
    const [history, setHistory] = useState<MenuLevel[]>([{ data: items }]);
    const currentMenu = history[history.length - 1];

    const renderItems = () => {
        return currentMenu.data.map((item: MenuItemData, index: number) => {
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (item.children) {
                            setHistory((prev) => [...prev, item.children as MenuLevel]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tooltip
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            render={() => (
                <div className={cx('menu-list')}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title={currentMenu.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tooltip>
    );
}

export default Menu;
