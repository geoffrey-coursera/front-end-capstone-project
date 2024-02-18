import { Link } from "react-router-dom";

import './Button.css';

export { Button as default };

const Button = ({ href, children }) => (
    <Link className="button-primary" to={href}>
        {children}
    </Link>
)