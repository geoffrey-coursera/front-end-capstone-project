// import { } from 'react';
import Label from 'Components/Label';

import './DateInput.scss';

export { DateInput as default };

const DateInput = ({id, value, onChange, min, icon, children}) => (
    <div className="custom-date-input">
        <Label icon={icon} htmlFor={id}>{children}</Label>
        <input
            name={id}
            type="date"
            {...{id, value, min, onChange}}
        />
    </div>
);