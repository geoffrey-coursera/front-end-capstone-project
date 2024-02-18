import { useReducer } from 'react';

import HeaderNav from 'Sections/HeaderNav';
import Footer from 'Sections/Footer';

import Home from 'Pages/Home';
import Reservations from 'Pages/Reservations';
import Error from 'Pages/Error';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

import { generateTimes } from './availableTimes';

const initializeTimes = generateTimes(new Date().getHours(), 22);
const updateTimes = times => times;

const App = () => {
    const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
    const timesProps = { availableTimes, dispatch };


    return (
        <BrowserRouter>
            <HeaderNav/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reservations" element={<Reservations { ...timesProps }/>} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;