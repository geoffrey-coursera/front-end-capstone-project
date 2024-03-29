import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDependencies } from './dependencies';
import { bindActions } from 'lib/reducer';

import HeaderNav from 'Sections/HeaderNav';
import Footer from 'Sections/Footer';

import Home from 'Pages/Home';
import Booking from 'Pages/Booking';
import ConfirmedBooking from 'Pages/ConfirmedBooking';
import Error from 'Pages/Error';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

export { App as default, updateTimes };

const updateTimes = currentDate => (state, { type, payload }) => {
    switch(type) {
        case 'times_fetched': return {
            ...state,
            availableSlots: payload,
            selectedSlot: '',
            loading: false
        };
        case 'time_selected': return {
            ...state,
            selectedSlot: payload
        };
        case 'date_selected': {
            const date = Date.parse(payload);
            const isValid = Boolean(date);
            const isInTheFuture = date >= Date.parse(currentDate)
            const ok = isValid && isInTheFuture;
            return {
                ...state,
                date: ok ? new Date(payload) : state.date,
                selectedSlot: '',
                loading: ok
            };
        }
        default: return state
    }
};

const submitForm = api => (onSuccess, onError) => e => {
    api(e.target).then(ok => ok ? onSuccess() : onError());
    e.preventDefault();
}

const App = () => {
    const { dateNow, availableTimes: {
        getISODate,
        submitReservation,
        fetchTimes
    }} = useDependencies();
    
    const now = dateNow();
    const currentDate = getISODate(now);
    const navigate = useNavigate();

    const [guests, setGuests] = useState(0);
    const [timeSlots, dispatch] = useReducer(updateTimes(currentDate), {
        availableSlots: [],
        selectedSlot: '',
        date: now,
        loading: true
    });

    const dispatchers = bindActions(
        ['date_selected', 'time_selected', 'times_fetched'],
        dispatch
    );

    const getTimeSlots = date => fetchTimes(date).then(dispatchers.times_fetched);

    const bookingFormProps = {
        timeSlots, getTimeSlots, dispatchers, getISODate, currentDate,
        guests, setGuests,
        onSubmit: submitForm(submitReservation),
        onSuccess: () => navigate('/confirmed-booking')
    };

    const confirmedBookingProps = {
        time: timeSlots.selectedSlot,
        date: timeSlots.date, currentDate,
        guests
    };

    return (
        <>
            <HeaderNav/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booking" element={<Booking { ...bookingFormProps }/>} />
                <Route path="/confirmed-booking" element={<ConfirmedBooking { ...confirmedBookingProps }/>} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer/>
        </>
    );
}