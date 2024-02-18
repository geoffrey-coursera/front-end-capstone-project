import { useReducer } from 'react';

import HeaderNav from 'Sections/HeaderNav';
import Footer from 'Sections/Footer';

import Home from 'Pages/Home';
import Booking from 'Pages/Booking';
import Error from 'Pages/Error';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

import { fetchAPI } from './availableTimes';

export { initializeTimes, updateTimes };

const initializeTimes = fetchAPI;

const updateTimes = (state, { type, payload }) => {
    switch(type) {
        case 'times_fetched': return { availableSlots: payload, selectedSlot: payload[0] };
        case 'time_selected': return {...state, selectedSlot: payload };
        default: return state
    }
};

// Jest does not support top-level await with this setup so I'm passing this 'sync' flag
const initialTimes = initializeTimes(new Date(), true);

const App = () => {
    const [timeSlots, dispatch] = useReducer(updateTimes, {
        availableSlots: initialTimes,
        selectedSlot: initialTimes[0]
    });
    const timeProps = { timeSlots, dispatch, fetchTimes: fetchAPI };

    return (
        <BrowserRouter>
            <HeaderNav/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booking" element={<Booking { ...timeProps }/>} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;