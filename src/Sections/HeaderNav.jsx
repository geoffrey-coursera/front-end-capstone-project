import React from 'react-dom';
import Logo from '../assets/Logo.png';
import Nav from '../Components/Nav';

import './HeaderNav.css';

export { HeaderNav as default };

const HeaderNav = ({ children }) => (
    <div id='header-nav'>
        <header>
            <img
                width="200"
                height="55"
                src={Logo}
                alt="Little Lemon Restaurant"
            />
        </header>
        <Nav/>
    </div>
)