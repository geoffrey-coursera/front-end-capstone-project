import { cloneElement, Children, useState, useEffect } from 'react';
import ValidationError from './ValidationError';
import { wrapWith } from 'lib/jsx';

export { Validate as default };

const Validate = ({ children, onRender, onChange, renderErrors=wrapWith(ValidationError) }) => {
    const [errors, setErrors] = useState('');

    useEffect(() => { if(onRender) {
        setErrors(onRender());
    } }, [onRender]);

    const instrumentedChildren = Children.map(children, child =>
        cloneElement(child, {
            onChange: e => {
                setErrors(onChange(e));
                child.props.onChange(e);
            }
        })
    );

    return (
        <div className="validation">
            {instrumentedChildren}
            {renderErrors(errors)}
        </div>
    );
};