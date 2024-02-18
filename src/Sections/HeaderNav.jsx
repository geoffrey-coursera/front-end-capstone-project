import { useState } from 'react';
import { Link } from "react-router-dom";

import Logo from 'assets/Logo.png';
import Nav from 'Components/Nav';
import Burger from 'Components/Burger';

import './HeaderNav.scss';

export { HeaderNav as default };

const HeaderNav = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(state => !state);
    const close = () => setOpen(false);
    
    return (
        <div id='header-nav'>
            <header>
            <Link to="/">
                <img
                    width="200"
                    height="55"
                    src={Logo}
                    alt="Little Lemon Restaurant"
                />
            </Link>
            </header>
            <Nav
                burger={<Burger {...{open, toggle}} />}
                onClick={close}
            />
        </div>
    );
}