import { useEffect, useRef } from 'react';
import { mergeClassNames } from 'lib/jsx';

import './ValidationError.scss';

export { ValidationError as default };

const debounce = (f, delay) => {
    let timer;
    return () => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(f, delay)
    }
};

const computeHeight = content => {
    const style = getComputedStyle(content);
    const margin = parseFloat(style.marginTop);
    const padding = 2 * parseFloat(style.paddingBlock);
    const height = content.offsetHeight - padding;
    return !height ? 0 : (height + padding + margin)
} 

const ValidationError = ({ children, type }) => {
    const parent = useRef(null);
    const child = useRef(null);

    const onUpdate = () => {
        if(parent.current) {
            parent.current.style.height = computeHeight(child.current) + 'px';
        }
    };
    
    useEffect(debounce(onUpdate, 0), [children]);

    useEffect(() => {
        window.addEventListener('resize', onUpdate);
        return () => window.removeEventListener('resize', onUpdate);
    }, []);

    return (
        <div ref={parent}className="validation-error">
            <div ref={child} className={mergeClassNames("content", type)}>
                {children && <TextIcon type={type}/>}
                {children && <span className="wrapper">{children}</span>}
            </div>
        </div>
    );
}

const TextIcon = ({ type }) => (
    <span className="text-icon" aria-hidden>{
        type === 'error' ? '!'
        : type === 'info' ? 'i'
        : type === 'loading' ? '?'
        : ''
    }</span>
)