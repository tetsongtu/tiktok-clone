import { render } from 'preact';
import App from './app';
import GlobalStyles from './component/GlobalStyles';

const root = document.getElementById('app')!;
render(
    <GlobalStyles>
        <App />
    </GlobalStyles>,
    root,
);
