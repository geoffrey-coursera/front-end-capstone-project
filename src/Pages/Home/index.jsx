import Hero from './Sections/Hero';
import Specials from './Sections/Specials';
import Testimonials from './Sections/Testimonials';
import About from './Sections/About';

import './Home.css';

export { Home as default };

const Home = ({ children }) => (
    <main id="Home">
        <section id="hero"><Hero /></section>
        <section id="specials"><Specials /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="about"><About /></section>
    </main>
)