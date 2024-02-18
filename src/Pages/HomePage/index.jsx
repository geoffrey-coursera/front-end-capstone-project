import React from 'react-dom';

import Hero from './Sections/Hero';
import Specials from './Sections/Specials';
import Testimonials from './Sections/Testimonials';
import About from './Sections/About';

export { HomePage as default };

const HomePage = ({ children }) => (
    <>
        <section id="hero"><Hero /></section>
        <section id="specials"><Specials /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="about"><About /></section>
    </>
)