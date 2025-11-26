import './global.css';

import { render } from 'preact';
import App from './app';
import { CurrentUserProvider } from './hooks/useCurrentUser';

const root = document.getElementById('app')!;
render(
    <CurrentUserProvider>
        <App />
    </CurrentUserProvider>,
    root,
);
