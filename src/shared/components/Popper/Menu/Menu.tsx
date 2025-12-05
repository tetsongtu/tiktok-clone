import classNames from 'classnames/bind';
import { useState, useEffect } from 'preact/hooks';

import Tooltip from '~/shared/components/Tooltip/Tooltip';
import PopperWrapper from '~/shared/components/Popper/Wrapper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import type { MenuProps, MenuItemData, MenuLevel } from '~/shared/types';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }: MenuProps) {
    const [history, setHistory] = useState<MenuLevel[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Always use current items for first level, history for deeper levels
    const currentMenu =
        history.length > 0 ? history[history.length - 1] : { data: items };

    // Reset history and close menu when items change
    useEffect(() => {
        setHistory([]);
        setIsOpen(false);
    }, [items.length, items[0]?.title]);

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
                            setIsOpen(false);
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = () => {
        return (
            <div className={cx('menu-list')}>
                <PopperWrapper className={cx('menu-popper')}>
                    {history.length > 1 && (
                        <Header title={currentMenu.title} onBack={handleBack} />
                    )}
                    <div className={cx('menu-body')}>{renderItems()}</div>
                </PopperWrapper>
            </div>
        );
    };

    const handleHide = () => {
        setHistory([]);
        setIsOpen(false);
    };

    return (
        <Tooltip
            delay={[0, 700]}
            placement="bottom-end"
            render={renderResult}
            onHide={handleHide}
            visible={isOpen}
            onVisibleChange={setIsOpen}
        >
            {children}
        </Tooltip>
    );
}

export default Menu;
