import { cloneElement, Children, useState, useEffect } from 'react';
import ValidationError from './ValidationError';

export { Validate as default, useValidation };

/* testing */
export { applyRules, override }

const applyRule = ({
    label,
    predicate,
    message,
    isLoading,
    loadingMessage,
    overriddenBy,
    type='error'
}, e) => {
    const m =
        isLoading ? loadingMessage
        : !predicate(e) ? message
        : null;

    const t =
        isLoading ? 'loading'
        : m ? type
        : '';

    return {[label]: { type: t, message: m, overriddenBy }};
};

const applyRules = (rules, e) => 
    !Array.isArray(rules) ? applyRule(rules, e)
    : rules.reduce(
        (a, b) => ({...a, ...applyRule(b, e)}),
        {}
    );

const override = newErr => oldErr => {
    const applied = Object.entries({ ...oldErr, ...newErr });

    return Object.fromEntries(
        applied.filter(isOverridden(applied))
    );
};

const isOverridden = errors => ([_, { overriddenBy }]) =>
    !errors.find(([label, error]) => {
        if(error.message === null) return false;
        if(Array.isArray(overriddenBy)) return overriddenBy.includes(label);
        else if (overriddenBy) return label === overriddenBy
        else return false;
    })


const useValidation = names => {
    const init = Object.fromEntries(
        names.map(name => [name, {
            error: false,
            touched: false
        }])
    );
    
    const [errors, setErrors] = useState(init);

    const report = name => state => setErrors(
        errors => ({...errors, [name]: state })
    );

    return [errors, report];
};

const equal = hash => (a, b) =>
    hash(a) === (typeof b === 'string' ? b : hash(b));

const Validate = ({
    children,
    onError=() => {},
    onRender=[],
    onChange=[],
    hash=JSON.stringify
}) => {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState(false);

    const ruleSet = extractKeys([onRender, onChange]);

    const renderErrors = applyRules(onRender);
    const hashedRenderErrors = hash(renderErrors);
    
    useEffect(() => {
        if(!equal(hash)(errors, hashedRenderErrors)) {
            setErrors(override(renderErrors));
            onError({ touched, error: hasErrors(renderErrors) });
        }
    }, [touched, hashedRenderErrors]);

    const instrumentedChildren = Children.map(children, child =>
        cloneElement(child, {
            onChange: e => {
                setTouched(true);
                if(onChange) {
                    const newErrors = applyRules(onChange, e);
                    setErrors(override(newErrors));
                    onError({ touched: true, error: hasErrors(newErrors) })
                } else {
                    onError({ touched: true, error: hasErrors(errors) })
                }
                if(child.props.onChange) child.props.onChange(e);
            }
        })
    );

    return (
        <div className="validation">
            {instrumentedChildren}
            {ruleSet.map(key => {
                const {type, message} = errors[key] || {};
                return  (
                    <ValidationError {...{ key, type }}>
                        {message}
                    </ValidationError>
                );
            }
            )}
        </div>
    );
};

const hasErrors = states => 
    Object.values(states)
        .some(({ message }) =>  message !== null);

const extractKeys = rules =>
    [...new Set(rules.flat().map(r => r.label))];