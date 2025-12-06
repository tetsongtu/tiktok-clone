import { useState } from 'preact/hooks';

interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
}

const categories: Category[] = [
    {
        id: 'trending',
        name: 'Thịnh hành',
        icon: '🔥',
        color: 'bg-red-100 hover:bg-red-200',
    },
    {
        id: 'music',
        name: 'Âm nhạc',
        icon: '🎵',
        color: 'bg-purple-100 hover:bg-purple-200',
    },
    { id: 'dance', name: 'Nhảy múa', icon: '💃', color: 'bg-pink-100 hover:bg-pink-200' },
    {
        id: 'comedy',
        name: 'Hài hước',
        icon: '😂',
        color: 'bg-yellow-100 hover:bg-yellow-200',
    },
    {
        id: 'food',
        name: 'Ẩm thực',
        icon: '🍜',
        color: 'bg-orange-100 hover:bg-orange-200',
    },
    {
        id: 'sports',
        name: 'Thể thao',
        icon: '⚽',
        color: 'bg-green-100 hover:bg-green-200',
    },
    { id: 'gaming', name: 'Game', icon: '🎮', color: 'bg-blue-100 hover:bg-blue-200' },
    { id: 'beauty', name: 'Làm đẹp', icon: '💄', color: 'bg-pink-100 hover:bg-pink-200' },
    {
        id: 'fashion',
        name: 'Thời trang',
        icon: '👗',
        color: 'bg-indigo-100 hover:bg-indigo-200',
    },
    { id: 'travel', name: 'Du lịch', icon: '✈️', color: 'bg-cyan-100 hover:bg-cyan-200' },
    {
        id: 'education',
        name: 'Giáo dục',
        icon: '📚',
        color: 'bg-teal-100 hover:bg-teal-200',
    },
    {
        id: 'pets',
        name: 'Thú cưng',
        icon: '🐶',
        color: 'bg-amber-100 hover:bg-amber-200',
    },
];

export function Explore() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <div className="max-w-7xl mx-auto py-6 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Khám phá</h1>
                <p className="text-gray-600">
                    Tìm kiếm nội dung theo danh mục yêu thích của bạn
                </p>
            </div>

            <div className="grid grid-cols-6 gap-4">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`${
                            category.color
                        } rounded-xl p-6 shadow-sm hover:shadow-md ${
                            selectedCategory === category.id
                                ? 'ring-2 ring-purple-500'
                                : ''
                        }`}
                    >
                        <div className="text-4xl mb-3">{category.icon}</div>
                        <div className="text-sm font-semibold text-gray-800">
                            {category.name}
                        </div>
                    </button>
                ))}
            </div>

            {selectedCategory && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {categories.find((c) => c.id === selectedCategory)?.name}
                    </h2>
                    <p className="text-gray-600">Nội dung đang được cập nhật...</p>
                </div>
            )}
        </div>
    );
}
