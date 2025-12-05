import { useState, useEffect } from 'preact/hooks';
import { CaretCircleUpIcon, CaretCircleDownIcon } from '@phosphor-icons/react';

const getScrollContainer = () =>
    document.getElementById('MainContent')?.querySelector('.overflow-y-auto');

const BUTTON_CLASS =
    'flex justify-center items-center size-18 rounded-full bg-white/80 hover:bg-white shadow-lg transition-opacity duration-300 disabled:opacity-30 disabled:cursor-not-allowed';

const BUTTONS = [
    { Icon: CaretCircleUpIcon, direction: 'up' as const },
    { Icon: CaretCircleDownIcon, direction: 'down' as const },
];

function ScrollButtons() {
    const [state, setState] = useState({ ready: false, up: false, down: false });

    useEffect(() => {
        const container = getScrollContainer();
        if (!container) return;

        const checkScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            setState({
                ready: true,
                up: scrollTop > 5,
                down: scrollTop + clientHeight < scrollHeight - 5,
            });
        };

        const timer = setTimeout(checkScroll, 300);
        container.addEventListener('scroll', checkScroll);
        return () => {
            clearTimeout(timer);
            container.removeEventListener('scroll', checkScroll);
        };
    }, []);

    const handleScroll = (direction: 'up' | 'down') => {
        getScrollContainer()?.scrollBy({
            top: direction === 'down' ? window.innerHeight : -window.innerHeight,
            behavior: 'smooth',
        });
    };

    if (!state.ready) return null;

    return (
        <div className="fixed top-0 right-0 h-screen w-24 flex items-center justify-center pointer-events-none z-30">
            <div className="hidden lg:flex flex-col gap-4 pointer-events-auto">
                {BUTTONS.map(({ Icon, direction }) => (
                    <button
                        key={direction}
                        onClick={() => handleScroll(direction)}
                        disabled={!state[direction]}
                        className={BUTTON_CLASS}
                    >
                        <Icon size={52} weight="light" />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ScrollButtons;
