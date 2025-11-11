import Header from '~/Layouts/components/Header';

function HeaderOnly({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#F8F8F8] h-[100vh]">
            <Header />
            <div className="relative left-[50%] -translate-x-[50%] w-full px-2 max-w-[1140px] pt-[70px]">
                {children}
            </div>
        </div>
    );
}

export default HeaderOnly;
