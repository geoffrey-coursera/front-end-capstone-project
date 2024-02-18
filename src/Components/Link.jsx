import React from 'react-dom';

import './Link.css';

export { Link as default };

const Link = ({ href, children, before, after }) => (
    <a className="link" href={href}>
        {!!before && <Icon src={before} />}
        {children}
        {!!after && <Icon src={after} />}
    </a>
)

const Icon = ({ src, h=20, w=20 }) => (
    <img src={src} aria-hidden="true" alt="" height={h} width={w} />
);