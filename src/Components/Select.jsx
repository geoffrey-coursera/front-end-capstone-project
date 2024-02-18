import { useState, Children, cloneElement, useEffect, useRef } from 'react';
import Icon from './Icon';

import './Select.scss';

export { Select as default, Option };


const Select = (props) => {
    const { id, icon, title, name, children, defaultOption } = props;
    const isControlled = props.value !== undefined;
    const hasDefaultValue = props.defaultValue !== undefined;
    const defaultValue = hasDefaultValue ? props.defaultValue : '';

    const [expanded, setExpanded] = useState(false);
    const [touched, setTouched] = useState(false);
    const [internalValue, setValue] = useState(defaultValue);
    const value = isControlled ? props.value : internalValue;

    const onChange = (child, i) => e => {
        const value = !i && defaultOption ? '' : child.props.children;
        if (props.onChange) props.onChange({
            ...e, target: {...e.target, value: value }
        });
        if (!isControlled) setValue(value);
    };

    const ref = useRef(null);

    useEffect(function blurEvent() {
        const clickOutside = e => {
            ref.current
            && !ref.current.contains(e.target)
            && ref.current.querySelector('[aria-expanded=true')
            && setExpanded(false);
        }
        
        document.addEventListener('click', clickOutside, true);
        
        return () => {
            document.removeEventListener('click', clickOutside, true);
        };
    }, []);

    useEffect(function onClose(){
        if(touched && !expanded) ref.current.querySelector('button').focus();
    }, [expanded, touched])

    useEffect(function onExpand(){
        const elem = ref.current;
        const focusSelected = () => {
            setTimeout(() => {
                const selected = elem.querySelector('[aria-selected=true]')
                    || elem.querySelector('[role=option]');
            
                selected.focus();
                const parent = selected.parentElement;
                parent.scrollTop = selected.offsetTop - parent.offsetTop;
            }, 20);
        }
        
        elem.querySelector('[role=listbox]').addEventListener(
            'animationstart',
            focusSelected
        );

        return () => {
            elem.querySelector('[role=listbox]').removeEventListener(
                'animationstart',
                focusSelected
            );
        }
    }, []);

    return (
        <div ref={ref} className="custom-select">
            <input type="hidden" name={name} value={value} />
            <button
                role="combobox"
                aria-labelledby={id + '-label'}
                aria-haspopup="listbox"
                aria-expanded={expanded}
                aria-controls={id + '-dropdown'}
                onClick={e => {
                    setExpanded(state => !state);
                    setTouched(true);
                    e.preventDefault();
                }}
                onKeyDown={e => {
                    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
                        setExpanded(true);
                        setTouched(true);
                        e.preventDefault();
                    } else if (e.key === "Escape") {
                        setExpanded(false);
                    }
                }}
            >
                { Boolean(icon) && <Icon src={icon} w="40" h="40" /> }
                <label id={id + '-label'}>
                    {value || title}
                </label>
                <Arrow />
            </button>
            <ul role="listbox" id={id + '-dropdown'} tabIndex={-1}>
                {Children.map([...[defaultOption ? <Option>{defaultOption}</Option> : []], ...children], (child, i) =>
                    cloneElement(child, {
                        selected: Boolean(value) && value === child.props.children,
                        close: () => setExpanded(false),
                        onChange: onChange(child, i),
                        parent: ref
                    })
                )}
            </ul>
        </div>
    )
};

const Option = ({ children, selected, close, onChange, parent }) => {
    return (
        <li
            tabIndex="0"
            role="option"
            aria-selected={selected}
            onClick={ e => {
                close();
                onChange(e);
                e.preventDefault()
            }}
            onKeyDown={e => {
                if (e.key === 'ArrowDown') {
                    const next = parent.current.querySelector('*:focus + *');
                    if (next) next.focus();
                    e.preventDefault()
                } else if (e.key === 'ArrowUp') {
                    const prev = parent.current.querySelector('*:focus').previousSibling;
                    if (prev) prev.focus();
                    e.preventDefault();
                } else if (e.key === "Escape") {
                    close();
                } else if (['Enter', 'Space', ' '].includes(e.key)) {
                    close()
                    onChange(e);
                    e.preventDefault();
                } else if (e.key === 'Tab') {
                    close()
                    onChange(e);
                }
            }}
        >
            {children}
        </li>
    );
}

const Arrow = () => (
    <svg viewBox="0 0 10 10">
        <polygon points="10,10 0,10 0,7.5 7.5,7.5 7.5,0 10,0 "/>
    </svg>
)