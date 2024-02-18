import React from 'react-dom';

import './Button.css';

export { Button as default };

const Button = ({ href, children }) => (
    <a className="button-primary" href={href}>
        {children}
    </a>
)