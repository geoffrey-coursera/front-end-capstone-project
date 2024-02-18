import HeaderNav from 'Sections/HeaderNav';
import Footer from 'Sections/Footer';

import Home from 'Pages/Home';
import Reservations from 'Pages/Reservations';
import Error from 'Pages/Error';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

const App = () => (
    <BrowserRouter>
        <HeaderNav/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="*" element={<Error />} />
        </Routes>
        <Footer/>
    </BrowserRouter>
);

export default App;