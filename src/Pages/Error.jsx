import { useLocation } from 'react-router-dom';

import './Error.scss';

export { Error as default }

const Error = () => (
    <main id="Error">
        <article>
            <h1>Page not found</h1>
            <p>Sorry, The page <i>{useLocation().pathname}</i> does not exist</p>
        </article>
    </main>
);