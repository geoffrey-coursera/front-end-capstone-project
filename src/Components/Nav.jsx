import React from 'react-dom';

export { Nav as default };

const Nav = ({ burger=null }) => (
    <nav>
        <ul>{pageTitles.map(NavLink)}</ul>
        {burger}
    </nav>
);

const NavLink = title => {
    const slug = Slug(title);
    const url = title === 'Home' ? '/' : `/${slug}`;
    return <li key={slug}><a href={url}>{title}</a></li>;
}

const pageTitles = [
    'Home',
    'About',
    'Menu',
    'Reservations',
    'Order Online',
    'Login',
];

const Slug = title => title.toLowerCase().replace(/ /g, '-');