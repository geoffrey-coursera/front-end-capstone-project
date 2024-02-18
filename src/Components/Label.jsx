import { addClassName } from "lib/jsx";

import './Label.scss';

export { Label as default };

const Label = ({ icon, htmlFor, children }) => (
    <div className='custom-label'>
        { icon && addClassName(icon, 'icon') }
        <label icon={icon} htmlFor={htmlFor}>{children}</label>
    </div>
);