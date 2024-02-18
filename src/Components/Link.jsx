import { Link as RouterLink } from "react-router-dom";

import './Link.css';

export { Link as default };

const Link = ({ href, children, before, after }) => (
    <RouterLink className="link" to={href}>
        {!!before && <Icon src={before} />}
        {children}
        {!!after && <Icon src={after} />}
    </RouterLink>
)

const Icon = ({ src, h=20, w=20 }) => (
    <img src={src} aria-hidden="true" alt="" height={h} width={w} />
);