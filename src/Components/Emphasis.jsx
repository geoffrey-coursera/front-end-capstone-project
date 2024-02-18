import React from 'react-dom';

import './Emphasis.css';

export { Emphasis as default };

const Emphasis = ({ children }) => (
    <p className="emphasis">
        {children}
    </p>
)