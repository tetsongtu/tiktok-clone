import config from '~/core/config';

// Layouts
import { HeaderOnly } from '~/Layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Explore from '~/pages/Explore';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.live, component: Live },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.profile, component: Profile },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
