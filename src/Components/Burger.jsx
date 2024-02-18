import React from 'react-dom';

import './Burger.css';

export { Burger as default };

const Burger = () => (
    <div className="burger">
        <input type="checkbox" role="button" aria-label="navigation menu toggle" className="open" name="" id="" />
        <div aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
        </div>  
    </div>
);