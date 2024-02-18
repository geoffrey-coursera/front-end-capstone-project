import { useEffect } from 'react';

import './BookingForm.scss';

export { BookingForm as default };

const BookingForm = ({
    timeSlots, dispatch, fetchTimes,
    date, currentDate, setDate,
    guests, setGuests
}) => {
    const { availableSlots, selectedSlot } = timeSlots;

    const update = setter => e => setter(e.target.value);

    useEffect(() => {
        fetchTimes(new Date(date)).then(payload => dispatch({ type: 'times_fetched', payload }))
    }, [date]);

    return (
        <form id="booking-form">
            <h1>Reserve a table</h1>
            <fieldset>
                <label htmlFor="res-date">Choose date</label>
                <input
                    id="res-date"
                    type="date"
                    value={date}
                    min={currentDate}
                    onChange={update(setDate)}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="res-time">Choose time</label>
                <BookingSlots
                    id="res-time"
                    onChange={update(payload => dispatch({ type: 'time_selected', payload }))}
                    selectedSlot={selectedSlot}
                    availableSlots={availableSlots}
                    isToday={date === currentDate}
                />
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

const BookingSlots = ({ id, selectedSlot, onChange, availableSlots, isToday }) =>
    availableSlots.length
    ? (
        <select id={id} value={selectedSlot} onChange={onChange}>
            {availableSlots.map(time => <option key={time}>{time}</option>)}
        </select>
    ) : <p>Sorry, there are no more time slots available {isToday ? 'today' : 'that day'}. Try a different day.</p>
;