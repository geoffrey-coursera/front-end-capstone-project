import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


import './BookingForm.scss';

export { BookingForm as default };

const BookingForm = ({
    timeSlots, dispatch, fetchTimes,
    date, currentDate, setDate,
    guests, setGuests,
    submitForm
}) => {
    const goTo = useNavigate();

    const { availableSlots, selectedSlot } = timeSlots;
    const [ok, setOk] = useState(null);

    const update = setter => e => setter(e.target.value);

    useEffect(() => {
        fetchTimes(new Date(date)).then(payload => dispatch({ type: 'times_fetched', payload }))
    }, [date]);

    useEffect(() => { ok && goTo('/confirmed-booking'); }, [ok]);

    return (
        <form
            id="booking-form"
            onSubmit={submitForm(() => setOk(true), () => setOk(false))}
        >
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
            <input
                type="submit"
                value="Make Your reservation"
            />
            {(ok === false) && <p>Submission failed. Try again.</p>}
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