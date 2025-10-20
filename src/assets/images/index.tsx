const files = {
    logo: './logo.svg',
    search: './search.svg',
    clear: './clear.svg',
    loading: './loading.svg',
    noImage: './no-image.png',
};

const images = Object.fromEntries(
    Object.entries(files).map(([key, path]) => {
        const file = import.meta.glob('./*.(svg|png)', {
            query: '?url',
            import: 'default',
            eager: true,
        })[path];
        return [key, String(file)];
    }),
);

export default images;
