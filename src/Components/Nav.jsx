import { Link } from "react-router-dom";

export { Nav as default };

const Nav = ({ burger=null, onClick }) => (
    <nav>
        <ul>{pageTitles.map(NavLink(onClick))}</ul>
        {burger}
    </nav>
);

const NavLink = (onClick) => (title) => {
    const slug = Slug(title);
    const url = title === 'Home' ? '/' : `/${slug}`;
    return <li key={slug}><Link to={url} onClick={onClick}>{title}</Link></li>;
}

const pageTitles = [
    'Home',
    'About',
    'Menu',
    'Booking',
    'Order Online',
    'Login',
];

const Slug = title => title.toLowerCase().replace(/ /g, '-');