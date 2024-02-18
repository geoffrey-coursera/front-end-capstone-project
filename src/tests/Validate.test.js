import { render, screen, fireEvent } from "@testing-library/react";
import Validate, { applyRules, override } from "../Components/Validate";

describe('Render as many errors as there are rules', () => {
    const rules = [1, 2].map(i => ({
        label: `rule ${i}`,
        predicate: () => true,
        message: `rule ${i} error`,
    }));

    test('no rule', () => {
        const { container } = render(
            <Validate><input/></Validate>
        );

        const errors = container.querySelectorAll('.validation-error');
    
        expect(errors.length).toBe(0);
    })

    test('one rule', () => {
        const { container } = render(
            <Validate onChange={rules[0]}><input/></Validate>
        );

        const errors = container.querySelectorAll('.validation-error');
    
        expect(errors.length).toBe(1);
    })

    test('2 rules', () => {
        const { container } = render(
            <Validate onChange={rules}><input/></Validate>
        );

        const errors = container.querySelectorAll('.validation-error');
    
        expect(errors.length).toBe(2);
    })

    test('2 rules across predicates', () => {
        const { container } = render(
            <Validate onRender={rules[0]} onChange={rules[1]}><input/></Validate>
        );

        const errors = container.querySelectorAll('.validation-error');
    
        expect(errors.length).toBe(2);
    })

    test('2 rules with repetitions', () => {
        const { container } = render(
            <Validate onRender={rules} onChange={rules[1]}><input/></Validate>
        );

        const errors = container.querySelectorAll('.validation-error');
    
        expect(errors.length).toBe(2);
    })
})

describe('Render empty error when predicate is truthy', () => {
    const rule = {
        label: 'rule',
        predicate: () => true,
        message: 'rule error',
    };

    test('on render', () => {
        const { container } = render(
            <Validate onRender={rule}><input/></Validate>
        );

        const error = container.querySelector('.validation-error');

        expect(error.textContent).toBe('');
    })

    test('on change', () => {
        const { container } = render(
            <Validate onChange={rule}><input/></Validate>
        );

        const input = container.querySelector('input');
        const event = { target: { value: 'bar' } };

        fireEvent.change(input, event);

        const error = container.querySelector('.validation-error');

        expect(error.textContent).toBe('');
    })
})

describe('Render error message when predicate is falsy', () => {
    const rule = {
        label: 'rule',
        predicate: () => false,
        message: 'rule error',
    };

    test('on render', () => {
        const { container } = render(
            <Validate onRender={rule}><input/></Validate>
        );
    
        const error = container.querySelector('.validation-error');
    
        expect(error.textContent).toMatch(rule.message);
    })

    test('on change', () => {
        const { container } = render(
            <Validate onChange={rule}><input/></Validate>
        );

        const input = container.querySelector('input');
        const event = { target: { value: 'bar' } };

        fireEvent.change(input, event);

        const error = container.querySelector('.validation-error');
    
        expect(error.textContent).toMatch(rule.message);
    })
})

describe('Distinguish log levels with appropriate text icons and class names', () => {
    test('log level: error', () => {
        const rule = {
            label: 'rule',
            predicate: () => false,
            message: 'rule error',
            type: 'error'
        };
    
        const { container } = render(
            <Validate onRender={rule}><input/></Validate>
        );
    
        const error = container.querySelector('.validation-error');
        
        expect(error.textContent).toMatch(/^\!/);
        expect( error.querySelector('.error')).toBeTruthy();
    })

    test('log level: info', () => {
        const rule = {
            label: 'rule',
            predicate: () => false,
            message: 'rule error',
            type: 'info'
        };
    
        const { container } = render(
            <Validate onRender={rule}><input/></Validate>
        );
    
        const error = container.querySelector('.validation-error');
        
        expect(error.textContent).toMatch(/^i/);
        expect(error.querySelector('.info')).toBeTruthy();
    })

    test('log level: loading', () => {
        const rule = {
            label: 'rule',
            isLoading: true,
            loadingMessage: 'loading...'
        };
    
        const { container } = render(
            <Validate onRender={rule}><input/></Validate>
        );
    
        const error = container.querySelector('.validation-error');
        
        expect(error.textContent).toMatch(/^\?/);
        expect(error.querySelector('.loading')).toBeTruthy();
    })
})


test('applying rules produce errors', () => {
    const timeSlotsRule = {
        label: 'no time slots',
        predicate: () => false,
        message: `no time slots`,
        isLoading: false,
        loadingMessage: '...',
        overriddenBy: ['not valid date']
    };

    const validDateRule = {
        label: 'not valid date',
        predicate: () => false,
        message: 'not valid date',
        type: 'info'
    };

    const applied = applyRules([timeSlotsRule, validDateRule])

    expect(applied).toStrictEqual({
        'not valid date': {
            "message": 'not valid date',
            "overriddenBy": undefined,
            "type": 'info'
        },
        'no time slots': {
            message: `no time slots`,
            overriddenBy: ['not valid date'],
            type: 'error'
        }
    });
})

test('overriding errors replace overridden errors', () => {
    const newErr = {
        'not valid date': {
            "message": 'not valid date',
            "overriddenBy": undefined,
            "type": 'info'
        },
        'no time slots': {
            message: `no time slots`,
            overriddenBy: ['not valid date'],
            type: 'error'
        }
    }

    const oldErr = {
        'no time slots': {
            message: `no time slots`,
            overriddenBy: ['not valid date'],
            type: 'error'
        }
    };

    const merged = override(newErr)(oldErr);

    expect(merged).toStrictEqual({
        'not valid date': {
            "message": 'not valid date',
            "overriddenBy": undefined,
            "type": 'info'
        }
    });
})

test('overriding successes do not replace overridden errors', () => {
    const newErr = {
        'not valid date': {
            "message": null,
            "overriddenBy": undefined,
            "type": 'info'
        },
        'no time slots': {
            message: `no time slots`,
            overriddenBy: ['not valid date'],
            type: 'error'
        }
    }

    const oldErr = {
        'no time slots': {
            message: `no time slots`,
            overriddenBy: ['not valid date'],
            type: 'error'
        }
    };

    const merged = override(newErr)(oldErr);

    expect(merged).toStrictEqual({
        'no time slots': {
            message: `no time slots`,
            overriddenBy: ['not valid date'],
            type: 'error'
        },
        'not valid date': {
            "message": null,
            "overriddenBy": undefined,
            "type": 'info'
        }
    });
})