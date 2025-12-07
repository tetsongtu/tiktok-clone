# TikTok Clone - SvelteKit

Dự án TikTok clone được xây dựng với SvelteKit và Svelte 5.

## Cài đặt

```bash
bun install
```

## Cấu hình

Tạo file `.env.development`:

```env
VITE_API_URL=https://tiktok.fullstack.edu.vn/api/
```

## Chạy dự án

```bash
# Development
bun run dev

# Build production
bun run build

# Preview production
bun run preview
```

## Tính năng

-   ✅ Video feed với infinite scroll và autoplay
-   ✅ Comment drawer
-   ✅ Search với debounce
-   ✅ User profiles với videos/liked tabs
-   ✅ Upload video
-   ✅ Suggested accounts
-   ✅ Authentication (guest mode)
-   ✅ Multi-level menu
-   ✅ Zoom warning

## Công nghệ

-   **SvelteKit** - Full-stack framework
-   **Svelte 5** - UI với runes ($state, $derived, $effect)
-   **Tailwind CSS** - Styling
-   **Bun** - Package manager
-   **TypeScript** - Type safety
-   **Axios** - HTTP client

## Cấu trúc

```
src/
├── lib/
│   ├── components/       # UI components
│   ├── features/         # Feature components
│   ├── layouts/          # Layout components
│   ├── services/         # API services
│   ├── stores/           # State management
│   └── utils/            # Utilities
└── routes/
    ├── (default)/        # Routes với sidebar
    │   ├── +page.svelte  # Home
    │   ├── [nickname]/   # Profile
    │   ├── explore/
    │   ├── following/
    │   └── live/
    └── (header-only)/    # Routes chỉ có header
        └── upload/
```

## Phím tắt

-   `Ctrl + L` - Toggle login/logout

## API

Tất cả API services đã được implement:

```typescript
// Video
import { getVideo } from '~/lib/services/videoService';
const video = await getVideo(123);

// User
import { getSuggested } from '~/lib/services/userService';
const users = await getSuggested({ page: 1, perPage: 5 });

// Search
import { search } from '~/lib/services/searchService';
const results = await search('query', 'less');
```
