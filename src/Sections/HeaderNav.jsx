import { useState } from 'react';

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
                <img
                    width="200"
                    height="55"
                    src={Logo}
                    alt="Little Lemon Restaurant"
                />
            </header>
            <Nav
                burger={<Burger {...{open, toggle}} />}
                onClick={close}
            />
        </div>
    );
}