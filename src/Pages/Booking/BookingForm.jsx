import { useEffect, useRef, useState } from 'react';
import Select, { Option } from 'Components/Select';
import Range from 'Components/Range';
import DateInput from 'Components/DateInput';
import Validate, { useValidation } from 'Components/Validate';

import { ReactComponent as CalendarIcon } from 'assets/booking/calendar.svg';
import { ReactComponent as OccasionIcon } from 'assets/booking/occasion.svg';
import { ReactComponent as TimeIcon } from 'assets/booking/time.svg';
import { ReactComponent as GuestsIcon } from 'assets/booking/guests.svg';

import './BookingForm.scss';

export { BookingForm as default };

/* test */
export { timeSlotsRule, validDateRule, nonEmptyRule, futureDateRule, guestsRule, submitRule, isSubmittable };

const apply = setter => e => setter(e.target.value);

const after = g => f => (...xs) => { apply(f)(...xs); g(); };

const timeSlotsRule = (date, availableSlots, currentDate, loading) => ({
    label: 'no time slots',
    predicate: () => availableSlots.length,
    message: `Sorry, there are no more time slots available ${date === currentDate ? 'today' : 'that day'}. Try a different day.`,
    isLoading: loading,
    loadingMessage: 'Checking availability...',
    type: 'info'
});

const validDateRule = {
    label: 'not valid date',
    predicate: apply(Date.parse),
    message: 'You must enter a valid date.',
    type: 'error'
};

const nonEmptyRule = {
    label: 'is empty',
    predicate: (value, touched) => value || !touched,
    message: 'You must choose a time slot.',
    type: 'error'
}

const futureDateRule = (currentDate) => ({
    label: 'not future date',
    predicate: apply(date => Date.parse(date) >= Date.parse(currentDate) ),
    message: "You can't select a date which has already passed.",
    overriddenBy: ['not valid date'],
    type: 'error'
});

const guestsRule = {
    label: 'too few guests',
    predicate: apply(Number),
    message: 'You need to specify a number of guests.',
    type: 'error'
};

const submitRule = state => ({
    label: 'submition failure',
    predicate: () => state !== 'error',
    message: 'Submission failed. Try again.',
    isLoading: state === 'pending',
    loadingMessage: 'Sending reservation...'
});

const useDelay = state => {
    const stateTimer = useRef(null);
    const [delayed, setDelayed] = useState(state);

    useEffect(() => {
        if(state) {
            stateTimer.current = setTimeout(() => { setDelayed(true) }, 0);
        } else {
            clearTimeout(stateTimer.current);
            setDelayed(false);
        }
    }, [state]);

    return delayed;
}

const BookingForm = ({
    timeSlots, getTimeSlots, dispatchers, getISODate, currentDate,
    guests, setGuests,
    onSubmit, onSuccess
}) => {
    const mounted = useRef(false);

    const { availableSlots, selectedSlot, date: dateTime, loading } = timeSlots;
    const date = getISODate(dateTime);
    const [formState, setFormState] = useState('idle'); // idle | pending | ok | error
    const [errors, report] = useValidation(['res-date','res-time','guests']);
    
    const delayedLoading = useDelay(loading);

    useEffect(() => { getTimeSlots(dateTime) }, [date]);

    const act = (state, f=() => {}) => (...xs) => { setFormState(state); f(...xs); }

    const change = after(() => setFormState('idle'));

    return (
        <form
            id="booking-form"
            onSubmit={act('pending', onSubmit(act('ok', onSuccess), act('error')))}
        >
            <h1>Reserve a table</h1>
            <Validate
                onError={report('res-date')}
                onChange={[validDateRule, futureDateRule(currentDate)]}
                onRender={timeSlotsRule(date, availableSlots, currentDate, loading)}
            >
                <DateInput
                    id="res-date"
                    value={date}
                    onChange={change(dispatchers.date_selected)}
                    icon={<CalendarIcon />}
                    min={currentDate}
                >
                    Choose a date
                </DateInput>
            </Validate>
            <Validate onRender={nonEmptyRule} onError={report('res-time')}>
                <Select
                    disabled={!availableSlots.length || delayedLoading}
                    icon={<TimeIcon />}
                    id="res-time"
                    name="res-time"
                    title="Choose a time"
                    value={selectedSlot}
                    onChange={change(dispatchers.time_selected)}
                >
                    {availableSlots.map(time => <Option key={time}>{time}</Option>)}
                </Select>
            </Validate>
            {/* I'm not implementing HTML5 validation on the min number of guests 
                because I want to make sure the user selects a number of guests
                and does not submit `1` by mistake, hence the `minValid` attr.
            */}
            <Validate onError={report('guests')} onChange={guestsRule}>
                <Range
                    type="range"
                    renderIcon={(className) => <GuestsIcon {...{className}} />}
                    title="Number of guests"
                    id="guests"
                    value={guests}
                    min={0} minValid={1} max={10}
                    onChange={change(setGuests)}
                />
            </Validate>
            <Select
                icon={<OccasionIcon />}
                id="occasion"
                name="occasion"
                title="A special occasion?"
                defaultOption="Nothing special"
            >
                <Option>Birthday</Option>
                <Option>Engagement</Option>
                <Option>Anniversary</Option>
            </Select>
            <Validate onRender={submitRule(formState)}>
                <input
                    disabled={!isSubmittable(errors)}
                    className="button-primary"
                    type="submit"
                    value="Make Your reservation"
                />
            </Validate>
        </form>
    );
};

const isSubmittable = states => {
    const entries = Object.entries(states);

    const allTouched = entries
        .filter(([key]) => key !== 'res-date')
        .every(([_, val]) => val.touched);

    const noError = entries.every(([_, val]) => !val.error);

    return allTouched && noError
}