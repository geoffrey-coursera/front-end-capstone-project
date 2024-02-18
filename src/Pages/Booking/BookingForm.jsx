import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Select, { Option } from 'Components/Select';

import { ReactComponent as OccasionIcon } from 'assets/booking/occasion.svg';
import { ReactComponent as TimeIcon } from 'assets/booking/time.svg';
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
            <BookingSlots
                id="res-time"
                onChange={update(payload => dispatch({ type: 'time_selected', payload }))}
                selectedSlot={selectedSlot}
                availableSlots={availableSlots}
                isToday={date === currentDate}
            />
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
            <Select
                icon={<OccasionIcon />}
                id="occasion"
                name="occasion"
                title="Occasion"
                defaultOption="Nothing special"
            >
                <Option>Birthday</Option>
                <Option>Engagement</Option>
                <Option>Anniversary</Option>
            </Select>
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
        <Select
            icon={<TimeIcon />}
            id={id}
            name={id}
            title="Choose a time"
            value={selectedSlot}
            onChange={onChange}
        >
            {availableSlots.map(time => <Option key={time}>{time}</Option>)}
        </Select>
    ) : <p>Sorry, there are no more time slots available {isToday ? 'today' : 'that day'}. Try a different day.</p>
;