import classNames from 'classnames/bind';
import { useState, useEffect } from 'preact/hooks';

import { Tooltip } from '~/shared/components/Tooltip/Tooltip';
import { Wrapper as PopperWrapper } from '~/shared/components/Popper/Wrapper';
import { MenuItem } from './MenuItem';
import { Header } from './Header';
import styles from './Menu.module.css';
import type { MenuProps, MenuItemData, MenuLevel } from '~/shared/types';

const cx = classNames.bind(styles);

export function Menu({ children, items = [], onChange = () => {} }: MenuProps) {
    const [history, setHistory] = useState<MenuLevel[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const currentMenu = history[history.length - 1] || { data: items };

    const handleVisibleChange = (open: boolean) => {
        if (!open) {
            setHistory([]);
        }
        setIsOpen(open);
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, -1));
    };

    const handleMenuItemClick = (item: MenuItemData) => {
        if (item.children) {
            setHistory((prev) => [...prev, item.children as MenuLevel]);
        } else {
            setHistory([]);
            setIsOpen(false);
            onChange(item);
        }
    };

    useEffect(() => {
        setHistory([]);
    }, [items.length, items[0]?.title]);

    return (
        <Tooltip
            delay={[0, 700]}
            placement="bottom-end"
            visible={isOpen}
            onVisibleChange={handleVisibleChange}
            render={() => (
                <div className={cx('menu-list')}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {currentMenu.title && (
                            <Header title={currentMenu.title} onBack={handleBack} />
                        )}
                        <div className={cx('menu-body')}>
                            {currentMenu.data.map((item: MenuItemData, index: number) => (
                                <MenuItem
                                    key={index}
                                    data={item}
                                    onClick={() => handleMenuItemClick(item)}
                                />
                            ))}
                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tooltip>
    );
}
