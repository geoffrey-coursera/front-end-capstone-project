import { useState } from 'react';

import { generateTimes } from './availableTimes';

import './BookingForm.scss';

export { BookingForm as default };

const initializeTimes = generateTimes(new Date().getHours(), 22);

const BookingForm = () => {
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10);

    const [availableTimes] = useState(initializeTimes());

    const [date, setDate] = useState(currentDate);
    const [time, setTime] = useState(availableTimes[0]);
    const [guests, setGuests] = useState(2);

    const update = setter => e => setter(e.target.value);

    return (
        <form id="booking-form">
            <fieldset>
                <label htmlFor="res-date">Choose date</label>
                <input
                    id="res-date"
                    type="date"
                    value={date}
                    onChange={update(setDate)}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="res-time">Choose time</label>
                <select
                    id="res-time"
                    value={time}
                    onChange={update(setTime)}
                >
                    {availableTimes.map(time => <option key={time}>{time}</option>)}
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="guests">Number of guests</label>
                <input
                    id="guests"
                    type="number"
                    value={guests}
                    min="1" max="10"
                    onChange={update(setGuests)}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion">
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
            </fieldset>
            <input type="submit" value="Make Your reservation" />
        </form>
    );
};