import { cloneElement } from 'react';

export { addClassName, mergeClassNames, wrapWith };

const mergeClassNames = (a, ...rest) => rest.reduce(merge2ClassNames, a);

const merge2ClassNames = (a, b) => {
    const u = a === undefined ? '' : a;
    const v = b === undefined ? '' : b;
    return [...new Set([...u.split(' '), ...v.split(' ')])].join(' ');
}

const addClassName = (element, className) => cloneElement(element, {
    className: mergeClassNames(element.props.className, className)
});

const wrapWith =  Component => children => <Component>{children}</Component>;