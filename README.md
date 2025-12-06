# TikTok Clone - SvelteKit

Dự án TikTok clone được chuyển đổi hoàn toàn từ React/Preact sang SvelteKit với đầy đủ tính năng.

## Cài đặt

```bash
bun install
```

## Cấu hình API

Tạo file `.env` với API URL:

```env
VITE_API_URL=https://your-api-url.com/api/
```

## Chạy development server

```bash
bun run dev
```

Server sẽ chạy tại: http://localhost:5173

## Build production

```bash
bun run build
```

## Preview production build

```bash
bun run preview
```

## Tính năng đã hoàn thiện

### ✅ Layouts & Navigation

-   DefaultLayout với sidebar, header, và action bar
-   HeaderOnly layout cho upload page
-   File-based routing với SvelteKit
-   Scroll navigation buttons
-   Responsive design

### ✅ Pages

-   **Home** - Video feed với infinite scroll và autoplay
-   **Following** - Following feed
-   **Explore** - Category browser với 12 categories
-   **Live** - Live streaming page
-   **Profile** - User profile với videos/liked tabs, edit profile
-   **Upload** - Video upload với preview, caption, và edit
-   **Search** - Search page

### ✅ Components

**Video & Posts:**

-   PostMain - Video player với autoplay on scroll
-   ProfilePost - Video grid item cho profile
-   ActionButton - Like/comment/share buttons với loading states

**User:**

-   UserAvatar - Avatar component với fallback
-   SuggestedAccounts - Suggested users list với infinite load
-   AccountItem - User item với tooltip preview

**UI:**

-   Search - Search bar với debounce, dropdown results
-   Menu - Multi-level dropdown menu (đa cấp)
-   CommentDrawer - Slide-in comment panel
-   ZoomWarning - Browser zoom detection
-   Button - Reusable button component
-   Image - Image component với fallback

### ✅ Features

**Video Feed:**

-   Infinite scroll loading
-   Autoplay on scroll into view
-   Video controls
-   Like, comment, share actions
-   Comment drawer với smooth transition

**Search:**

-   Real-time search với debounce
-   Dropdown results với user info
-   Click outside to close

**User System:**

-   Guest mode authentication
-   User profile với videos/liked tabs
-   Suggested accounts
-   Follow/unfollow (UI ready)

**Menu System:**

-   Multi-level dropdown menu
-   Language selection submenu
-   User menu với logout
-   Keyboard shortcuts menu

**Other:**

-   Keyboard shortcuts (Ctrl+L toggle login)
-   Zoom detection và warning
-   Loading states
-   Error handling

### ✅ State Management

-   `commentStore` - Comment drawer state
-   `userStore` - User authentication với localStorage sync

### ✅ API Services

-   `videoService` - Video API calls
    -   `getVideo(id)` - Get single video
-   `userService` - User API calls
    -   `getSuggested({ page, perPage })` - Get suggested users
-   `searchService` - Search API calls
    -   `search(query, type)` - Search users

## Cấu trúc dự án

```
src/
├── routes/                    # SvelteKit routing
│   ├── (default)/            # Layout với sidebar
│   │   ├── +layout.svelte
│   │   ├── +page.svelte      # Home - Video feed
│   │   ├── following/
│   │   ├── explore/
│   │   ├── live/
│   │   └── [nickname]/       # Profile (dynamic)
│   ├── (header-only)/        # Layout header only
│   │   └── upload/
│   ├── search/               # No layout
│   └── +layout.svelte        # Root layout
├── lib/
│   ├── components/           # Shared components
│   │   ├── ActionButton.svelte
│   │   ├── Button.svelte
│   │   ├── Image.svelte
│   │   ├── Menu.svelte       # Multi-level menu
│   │   ├── PostMain.svelte
│   │   ├── ProfilePost.svelte
│   │   ├── UserAvatar.svelte
│   │   └── ZoomWarning.svelte
│   ├── features/
│   │   ├── CommentDrawer.svelte
│   │   └── SuggestedAccounts.svelte
│   ├── layouts/components/
│   │   ├── Header.svelte
│   │   ├── Sidebar.svelte
│   │   ├── MenuItem.svelte
│   │   ├── Search.svelte     # Search với debounce
│   │   ├── TopRightActionBar.svelte
│   │   ├── ScrollButtons.svelte
│   │   └── LoadingOverlay.svelte
│   └── stores/
│       ├── commentStore.ts
│       └── userStore.ts
├── core/
│   ├── config/
│   │   └── routes.ts
│   └── services/
│       ├── videoService.ts   # ✅ Implemented
│       ├── userService.ts    # ✅ Implemented
│       └── searchService.ts  # ✅ Implemented
├── shared/
│   ├── assets/images/
│   ├── constants/
│   │   └── guestUser.ts
│   └── utils/
│       └── urlHelper.ts
└── utils/
    └── httpRequest.ts        # Axios wrapper
```

## API Integration

Tất cả services đã được implement và sẵn sàng sử dụng:

### Video Service

```typescript
import { getVideo } from '~/core/services/videoService';

// Get single video
const video = await getVideo(123);
```

### User Service

```typescript
import { getSuggested } from '~/core/services/userService';

// Get suggested users
const users = await getSuggested({ page: 1, perPage: 5 });
```

### Search Service

```typescript
import { search } from '~/core/services/searchService';

// Search users
const results = await search('query', 'less');
```

## Phím tắt

-   `Ctrl + L` - Toggle đăng nhập/đăng xuất (guest user)

## Công nghệ sử dụng

-   **SvelteKit** - Full-stack framework
-   **Svelte 5** - UI library với runes
-   **Tailwind CSS** - Utility-first CSS
-   **Bun** - Fast package manager & runtime
-   **TypeScript** - Type safety
-   **Axios** - HTTP client
-   **Vite** - Build tool

## So sánh với React version

| Feature     | React/Preact | SvelteKit  |
| ----------- | ------------ | ---------- |
| Bundle size | ~50KB        | ~15KB      |
| Reactivity  | Virtual DOM  | Compiler   |
| Syntax      | JSX          | HTML-like  |
| State       | useState     | $state     |
| Effects     | useEffect    | $effect    |
| Computed    | useMemo      | $derived   |
| Routing     | wouter       | File-based |
| Performance | Good         | Excellent  |

## Tính năng nổi bật

### 1. Search với Debounce

-   Real-time search khi gõ
-   Debounce 500ms để tối ưu API calls
-   Dropdown results với user info
-   Click outside to close

### 2. Multi-level Menu (Đa cấp)

-   Support submenu nhiều cấp
-   Language selection submenu
-   Smooth transitions
-   Click outside to close

### 3. Video Feed

-   Infinite scroll loading
-   Autoplay khi scroll vào view
-   Pause khi scroll ra ngoài
-   Loading states

### 4. Suggested Accounts

-   Load more on scroll
-   User avatars với fallback
-   Verified badges
-   Smooth animations

## Lưu ý

-   Dự án sử dụng Svelte 5 với runes syntax mới
-   Tất cả components đã được chuyển đổi hoàn toàn
-   API services đã implement và sẵn sàng
-   Guest user data lưu trong localStorage
-   Cần cấu hình VITE_API_URL trong .env

## Đóng góp

Dự án đã được chuyển đổi hoàn toàn từ React/Preact sang SvelteKit với đầy đủ tính năng. Mọi đóng góp đều được hoan nghênh!
