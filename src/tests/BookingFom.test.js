import { render, fireEvent, waitFor } from "@testing-library/react";
import BookingForm, * as rule from 'Pages/Booking/BookingForm';
import App, { updateTimes } from 'App';
import { isTimeSlot } from 'tests/availableTimes.test'
import { fetchTimes, getISODate } from 'availableTimes'
import { Fixture, dependencies } from 'fixtures'

const currentDate = '2000-01-30';

const base = {
    timeSlots: {
        availableSlots: [],
        selectedSlot: '',
        date: new Date(currentDate)
    },
    getTimeSlots: () => Promise.resolve([]),
    dispatchers: {
        date_selected: () => {},
        time_selected: () => {},
    },
    currentDate,
    onSubmit: () => {},
    onSuccess: () => {},
    guests: 0,
    setGuests: () => {},
    getISODate: () => ''
};

test('HTML5 validation attributes are applied', () => {
    const props = base;

    const { container, findByText } = render(<BookingForm {...props} />);

    
    const dateInput = container.querySelector('[name=res-date]');
    expect(dateInput.min).toMatch(currentDate);
    
    const guestsInput = container.querySelector('[name=res-guests]');
    expect(guestsInput.max).toMatch('10');
    expect(guestsInput.min).toMatch('0'); // min is 0 to force the user to make a choice
})

test('Renders the BookingForm heading', () => {
    const props = base;

    const { getByText } = render(<BookingForm {...props} />);
    const headingElement = getByText("Reserve a table");

    expect(headingElement).toBeInTheDocument();
})

test('Render form submission pending message while submitting', () => {
    const props = base;

    const { getByText, container } = render(<BookingForm {...props} />);
    fireEvent.submit(container.querySelector('form'));

    const message = getByText("Sending reservation...");

    expect(message).toBeInTheDocument();
})

test('Render form submission error message on error', async () => {
    const props = {...base, onSubmit: (onSuccess, onError) => e => {
        onError(); e.preventDefault();
    }};

    const F = Fixture();

    const { findByText, container } = render(<F><BookingForm {...props} /></F>);

    fireEvent.submit(container.querySelector('form'));

    await waitFor(async () => {
        const message = await findByText("Submission failed. Try again.")
        expect(message).toBeInTheDocument();
    })
})

test('Getting to the confirmation page before submitting yields an error', () => {
    const F = Fixture(x => x, ['/confirmed-booking']);

    const { getByText } = render(<F><App /></F>);

    const message = getByText("You need to make a reservation first.")
    expect(message).toBeInTheDocument();
})

test('Render confirmation page when submission succeeds', async () => {
    const F = Fixture(x => x, ['/booking']);

    const date = '2000-01-30';
    const enDate = 'Sunday, 30 January 2000';
    const time = '17:00';
    const guests = 3;

    const { findByText, container } = render(<F><App /></F>);

    const form = container.querySelector('form');
    
    const dateInput = container.querySelector('[name=res-date]');
    fireEvent.change(dateInput, { target: { value: date } });

    fireEvent.click(await findByText('Choose a time'));
    fireEvent.click(await findByText(time));

    const guestsInput = container.querySelector('[name=res-guests]');
    fireEvent.change(guestsInput, { target: { value: guests } });

    fireEvent.submit(form);
    
    await waitFor(async () => {
        const message = container.querySelector('main').textContent;
        expect(message).toMatch(`Your reservation for ${guests} guests, ${enDate} at ${time} was confirmed.`)
    })
})


describe('time slots state', () => {
    test('fetchTimes fetches time slots', async () => {
        const times = await fetchTimes(
            new Date(2024, 1, 30, 12)
        );

        expect(times.every(isTimeSlot)).toBeTruthy();
    });
    
    test('updateTimes reducer', () => {
        const init = {};

        const a = updateTimes('2024-01-30')(init, {
            type: 'times_fetched',
            payload: ['17:00', '19:00', '22:00']
        });

        expect(a.availableSlots).toStrictEqual(['17:00', '19:00', '22:00']);
        expect(a.selectedSlot).toBe('');

        const b = updateTimes('2024-01-30')(a, {
            type: 'time_selected',
            payload: '19:00'
        });
    
        expect(b.availableSlots).toStrictEqual(['17:00', '19:00', '22:00']);
        expect(b.selectedSlot).toBe('19:00');
    })
})

describe('form submittablility', () => {
    const init = {
        error: false,
        touched: false
    };

    const autoFillError = {
        error: true,
        touched: false
    };

    const ok = {
        error: false,
        touched: true
    };

    const error = {
        error: true,
        touched: true
    };

    test('reservation time and number of guests must be set manually', () => {
        const neitherSet = { 'res-date': ok, 'res-time': init, 'guests': init };
        const guetsNotSet = { 'res-date': ok, 'res-time': ok, 'guests': init };
        const timeNotSet = { 'res-date': ok, 'res-time': init, 'guests': ok };

        expect(rule.isSubmittable(neitherSet)).toBeFalsy();
        expect(rule.isSubmittable(guetsNotSet)).toBeFalsy();
        expect(rule.isSubmittable(timeNotSet)).toBeFalsy()
    })

    describe('there should be no error', () => {
        test('when every value is set manually', () => {
            const errors = {
                'res-date': ok,
                'res-time': ok,
                'guests': ok
            };
    
            expect(rule.isSubmittable(errors)).toBeTruthy();
        })

        test('when the date was filled automatically and there are available slots', () => {
            const errors = {
                'res-date': init,
                'res-time': ok,
                'guests': ok
            };
    
            expect(rule.isSubmittable(errors)).toBeTruthy();
        })

        test('when there are no available slots for current date', () => {
            const autoFill = {
                'res-date': autoFillError,
                'res-time': ok,
                'guests': ok
            };
    
            expect(rule.isSubmittable(autoFill)).toBeFalsy();
        })

        test('when there is an error', () => {
            const a = {
                'res-date': error,
                'res-time': ok,
                'guests': ok
            };

            const b = {
                'res-date': ok,
                'res-time': error,
                'guests': ok
            };

            const c = {
                'res-date': ok,
                'res-time': ok,
                'guests': error
            };

            const ab = {
                'res-date': error,
                'res-time': error,
                'guests': ok
            };

            const ac = {
                'res-date': error,
                'res-time': ok,
                'guests': error
            };

            const bc = {
                'res-date': ok,
                'res-time': error,
                'guests': error
            };

            const abc = {
                'res-date': error,
                'res-time': error,
                'guests': error
            };
    
            expect(rule.isSubmittable(a)).toBeFalsy();
            expect(rule.isSubmittable(b)).toBeFalsy();
            expect(rule.isSubmittable(c)).toBeFalsy();
            expect(rule.isSubmittable(ab)).toBeFalsy();
            expect(rule.isSubmittable(ac)).toBeFalsy();
            expect(rule.isSubmittable(bc)).toBeFalsy();
            expect(rule.isSubmittable(abc)).toBeFalsy();
        })
    })
})

describe('form validation viewModels', () => {
    const date = '2000-01-01';
    const currentDate = '2000-01-02';
    const availableSlots = ['17:00', '19:00', '22:00'];
    const loading = false;

    describe('timeSlotsRule', () => {
        test('message while fetching', () => {
            const { loadingMessage } = rule.timeSlotsRule(
                date, availableSlots, currentDate, loading
            );
            expect(loadingMessage).toBe('Checking availability...');
        })

        test('validation criterion: available time slots', () => {
            const { predicate } = rule.timeSlotsRule(
                date, availableSlots, currentDate, loading
            );

            expect(predicate()).toBeTruthy();
        })

        test('no more time slots today', () => {
            const availableSlots = [];
            const currentDate = date;

            const { predicate, message } = rule.timeSlotsRule(
                date, availableSlots, currentDate, loading
            );

            expect(predicate()).toBeFalsy();
            expect(message).toMatch('today');
            
        })
        
        test('no more time slots any day', () => {
            const availableSlots = [];

            const { predicate, message } = rule.timeSlotsRule(
                date, availableSlots, currentDate, loading
            );

            expect(predicate()).toBeFalsy();
            expect(message).toMatch('that day');
        })

        test('is of type `info`', () => {
            const { type} = rule.timeSlotsRule(
                date, availableSlots, currentDate, loading
            );

            expect(type).toBe('info');
        })
    })

    describe('validDateRule', () => {
        test('date is valid', () => {
            const event =  { target: { value: date } };
            const isValid = rule.validDateRule.predicate(event);

            expect(isValid).toBeTruthy();
        })

        test('date is invalid', () => {
            const event = { target: { value: '2000-00-00' } };
            const isValid = rule.validDateRule.predicate(event);

            expect(isValid).toBeFalsy();
        })
    })

    describe('nonEmptyRule', () => {
        describe('never touched', () => {
            const touched = false;

            test('empty', () => {
                const value = '';
                const isValid = rule.nonEmptyRule.predicate(value, touched);

                expect(isValid).toBeTruthy();
            })

            test('non-empty', () => {
                const value = '';
                const isValid = rule.nonEmptyRule.predicate(value, touched);

                expect(isValid).toBeTruthy();
            })
        })

        describe('touched', () => {
            const touched = true;

            test('empty', () => {
                const value = '';
                const isValid = rule.nonEmptyRule.predicate(value, touched);

                expect(isValid).toBeFalsy();
            })

            test('non-empty', () => {
                const value = '';
                const isValid = rule.nonEmptyRule.predicate(value, touched);

                expect(isValid).toBeFalsy();
            })
        })
    })

    describe('futureDateRule', () => {
        const currentDate = '2000-01-02';

        test('date in the past', () => {
            const event =  { target: { value: '1980-01-01' } };
            const isValid = rule.futureDateRule(currentDate).predicate(event);

            expect(isValid).toBeFalsy();
        })

        test('date in the the present', () => {
            const event =  { target: { value: currentDate } };
            const isValid = rule.futureDateRule(currentDate).predicate(event);

            expect(isValid).toBeTruthy();
        })

        test('date in the the future', () => {
            const event =  { target: { value: '2000-01-12' } };
            const isValid = rule.futureDateRule(currentDate).predicate(event);

            expect(isValid).toBeTruthy();
        })
    })

    describe('guestsRule', () => {
        test('0 guests', () => {
            const event = { target: { value: 0 } };
            const isValid = rule.guestsRule.predicate(event);

            expect(isValid).toBeFalsy();
        })

        test('1 guest', () => {
            const event = { target: { value: 1 } };
            const isValid = rule.guestsRule.predicate(event);

            expect(isValid).toBeTruthy();
        })

        test('more than 1 guests', () => {
            const event = { target: { value: 2 } };
            const isValid = rule.guestsRule.predicate(event);

            expect(isValid).toBeTruthy();
        })
    })

    describe('submitRule', () => {
        test('submission is idle', () => {
            const formState = 'idle';
            const applied = rule.submitRule(formState);
            const isValid = applied.predicate();

            expect(isValid).toBeTruthy();
            expect(applied.isLoading).toBe(false)
        })

        test('submission is pending', () => {
            const formState = 'pending';
            const applied = rule.submitRule(formState);
            const isValid = applied.predicate();

            expect(isValid).toBeTruthy();
            expect(applied.isLoading).toBe(true)
        })

        test('submission is ok', () => {
            const formState = 'ok';
            const applied = rule.submitRule(formState);
            const isValid = applied.predicate();

            expect(isValid).toBeTruthy();
            expect(applied.isLoading).toBe(false)
        })

        test('submission errored', () => {
            const formState = 'error';
            const applied = rule.submitRule(formState);
            const isValid = applied.predicate();

            expect(isValid).toBeFalsy();
            expect(applied.isLoading).toBe(false)
        })
    })
})