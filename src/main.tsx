import { render } from 'preact';
import { Router } from 'wouter-preact';
import { CurrentUserProvider } from './shared/hooks/useCurrentUser';

import './global.css';
import App from './app';

const root = document.getElementById('app')!;
render(
    <CurrentUserProvider>
        <Router>
            <App />
        </Router>
    </CurrentUserProvider>,
    root,
);
