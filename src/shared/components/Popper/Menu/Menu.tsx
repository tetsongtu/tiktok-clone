import classNames from 'classnames/bind';
import { useState, useEffect } from 'preact/hooks';

import Tooltip from '~/shared/components/Tooltip/Tooltip';
import PopperWrapper from '~/shared/components/Popper/Wrapper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import type { MenuProps, MenuItemData, MenuLevel } from '~/shared/types';

const cx = classNames.bind(styles);

function Menu({ children, items = [], onChange = () => {} }: MenuProps) {
    const [history, setHistory] = useState<MenuLevel[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Always use current items for first level, history for deeper levels
    const currentMenu =
        history.length > 0 ? history[history.length - 1] : { data: items };

    const resetMenu = () => {
        setHistory([]);
        setIsOpen(false);
    };

    // Reset history and close menu when items change
    useEffect(resetMenu, [items.length, items[0]?.title]);

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const menuContent = (
        <div className={cx('menu-list')}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && (
                    <Header title={currentMenu.title} onBack={handleBack} />
                )}
                <div className={cx('menu-body')}>
                    {currentMenu.data.map((item: MenuItemData, index: number) => (
                        <MenuItem
                            key={index}
                            data={item}
                            onClick={() => {
                                if (item.children) {
                                    setHistory((prev) => [
                                        ...prev,
                                        item.children as MenuLevel,
                                    ]);
                                } else {
                                    setIsOpen(false);
                                    onChange(item);
                                }
                            }}
                        />
                    ))}
                </div>
            </PopperWrapper>
        </div>
    );

    return (
        <Tooltip
            delay={[0, 700]}
            placement="bottom-end"
            render={() => menuContent}
            onHide={resetMenu}
            visible={isOpen}
            onVisibleChange={setIsOpen}
        >
            {children}
        </Tooltip>
    );
}

export default Menu;
