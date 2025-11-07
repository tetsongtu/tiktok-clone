import classNames from 'classnames';

function Wrapper({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const classes =
        'flex flex-col absolute w-full z-20 top-0 left-0 border border-gray-300 rounded-lg bg-white shadow-md';
    return <div className={classNames(classes, className)}>{children}</div>;
}

export default Wrapper;
