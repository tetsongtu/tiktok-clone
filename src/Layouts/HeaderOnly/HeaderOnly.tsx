import { Header } from '~/Layouts/components';
import type { ComponentChildren } from 'preact';

function HeaderOnly({ children }: { children: ComponentChildren }) {
    return (
        <div id="HeaderOnly" className="flex bg-[#F8F8F8] h-screen">
            <Header />
            <div className="mt-[70px] w-full max-w-[1140px] mx-auto px-2">{children}</div>
        </div>
    );
}

export default HeaderOnly;
