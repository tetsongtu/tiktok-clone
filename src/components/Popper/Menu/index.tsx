import classNames from 'classnames/bind';
import { Tooltip } from '../../Tooltip';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }: any) {
    const renderItems = () => {
        return items.map((item: any, index: number) => {
            return <MenuItem key={index} data={item} />;
        });
    };
    return (
        <Tooltip
            interactive
            delay={[0, 700]}
            render={() => (
                <div className={cx('menu-list')}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tooltip>
    );
}

export default Menu;
