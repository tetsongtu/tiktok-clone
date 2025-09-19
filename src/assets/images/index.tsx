const files = {
    logo: './logo.svg',
    search: './search.svg',
    clear: './clear.svg',
    loading: './loading.svg',
};

const images = Object.fromEntries(
    Object.entries(files).map(([key, path]) => {
        const file = import.meta.glob('./*.svg', {
            query: '?url',
            import: 'default',
            eager: true,
        })[path];
        return [key, String(file)];
    }),
);

export default images;
