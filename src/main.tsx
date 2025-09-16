import { render } from 'preact';
import App from './app';
import GlobalStyles from './components/GlobalStyles';

const root = document.getElementById('app')!;
render(
    <GlobalStyles>
        <App />
    </GlobalStyles>,
    root,
);
