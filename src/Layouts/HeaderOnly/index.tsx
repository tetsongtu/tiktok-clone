import Header from '../components/Header';

function HeaderOnly({ children }: { children: any }) {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
        </div>
    );
}

export default HeaderOnly;
