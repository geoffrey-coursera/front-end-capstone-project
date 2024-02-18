import React from 'react-dom';
import Hero from './Hero';
import Specials from './Specials';
import Testimonials from './Testimonials';
import About from './About';

export { main as default };


const main = () => (
    <main>
        <section id="hero"><Hero /></section>
        <section id="specials"><Specials /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="about"><About /></section>
    </main>
);