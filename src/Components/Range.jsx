import { useState } from 'react';
import { mergeClassNames } from 'lib/jsx';

import './Range.scss';

export { Range as default };

const Range = ({
    className,
    defaultValue,
    renderIcon,
    title,
    id,
    name,
    min,
    max,
    minValid=min,
    ...props
}) => {
    const isControlled = props.value !== undefined;
    const hasDefaultValue = defaultValue !== undefined;
    
    const [internalValue, setValue] = useState(hasDefaultValue ? defaultValue : '');
    const value = Number(isControlled ? props.value : internalValue);
    const progress = (value - min) / (max - min);

    const onChange = e => {
        if (props.onChange) props.onChange(e);
        setValue(value);
    };

    const optionClass = i => {
        const selected = value === i ? ['selected'] : [];
        const invalid = i < minValid ? ['invalid'] : [];
        return [...selected, ...invalid].join(' ');
    }

    return (
        <div
            className={mergeClassNames(className, "custom-range")}
            style={{ '--progress': progress }}
        >
            <div>
                {Boolean(renderIcon) && renderIcon('icon')}
                <label htmlFor={id}>{title}</label>
            </div>
            <input
                type="range"
                name={name}
                id={id}
                list={id + '-range-list'}
                min={min}
                max={max}
                {...props}
                onChange={onChange}
                value={value}
            />
            <datalist id={id + '-range-list'}>
                {Array.from({ length: max + 1 - min }, (_, i) =>
                    <option onClick={onChange} className={optionClass(i)} key={i + min} value={i + min} label={i + min} />
                )}
            </datalist>
        </div>
    );
}