import Header from '~/Layouts/components/Header';

function HeaderOnly({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#F8F8F8] h-screen">
            <Header />
            <div className="w-full max-w-[1140px] mx-auto px-2 pt-[70px]">{children}</div>
        </div>
    );
}

export default HeaderOnly;
