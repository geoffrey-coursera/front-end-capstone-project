import React from 'react-dom';
import Logo from '../assets/Logo.png';

export { Header as default };

const Header = () => (
    <header>
        <img
            id="logo"
            width="200"
            height="55"
            src={Logo}
            alt="Little Lemon Restaurant"
        />
    </header>
);