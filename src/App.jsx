import { useReducer, useState } from 'react';
import { getISODate, submitAPI } from 'availableTimes';

import HeaderNav from 'Sections/HeaderNav';
import Footer from 'Sections/Footer';

import Home from 'Pages/Home';
import Booking from 'Pages/Booking';
import ConfirmedBooking from 'Pages/ConfirmedBooking';
import Error from 'Pages/Error';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

import { fetchAPI } from './availableTimes';

export { initializeTimes, updateTimes };

const initializeTimes = fetchAPI;

const updateTimes = (state, { type, payload }) => {
    switch(type) {
        case 'times_fetched': return { availableSlots: payload, selectedSlot: '' };
        case 'time_selected': return {...state, selectedSlot: payload };
        default: return state
    }
};

// Jest does not support top-level await with this setup so I'm passing this 'sync' flag
const initialTimes = initializeTimes(new Date(), true);

const submitForm = (onSuccess, onError) => e => {
    submitAPI(e.target).then(ok => ok ? onSuccess() : onError());
    e.preventDefault();
}

const App = () => {
    const currentDate = getISODate(new Date());

    const [date, setDate] = useState(currentDate);
    const [guests, setGuests] = useState(2);
    const [timeSlots, dispatch] = useReducer(updateTimes, {
        availableSlots: initialTimes,
        selectedSlot: ''
    });

    const bookingFormProps = {
        timeSlots, dispatch, fetchTimes: fetchAPI,
        date, currentDate, setDate,
        guests, setGuests,
        submitForm
    };

    const confirmedBookingProps = {
        time: timeSlots.selectedSlot,
        date, currentDate,
        guests
    };

    return (
        <BrowserRouter>
            <HeaderNav/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booking" element={<Booking { ...bookingFormProps }/>} />
                <Route path="/confirmed-booking" element={<ConfirmedBooking { ...confirmedBookingProps }/>} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;