import { Link as RouterLink } from "react-router-dom";
import Icon from './Icon';

import './Link.css';

export { Link as default };

const Link = ({ href, children, before, after }) => (
    <RouterLink className="link" to={href}>
        {!!before && <Icon src={before} />}
        {children}
        {!!after && <Icon src={after} />}
    </RouterLink>
)