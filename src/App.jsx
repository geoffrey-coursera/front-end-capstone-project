import HeaderNav from 'Sections/HeaderNav';
import Footer from 'Sections/Footer';

import Home from 'Pages/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

const App = () => (
    <BrowserRouter>
        <HeaderNav/>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        <Footer/>
    </BrowserRouter>
);

export default App;