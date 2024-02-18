import HeaderNav from './Sections/HeaderNav';
import Hero from './Sections/Hero';
import Specials from './Sections/Specials';
import Testimonials from './Sections/Testimonials';
import About from './Sections/About';
import Footer from './Sections/Footer';

import './App.css';

function App() {
    return <>
        <HeaderNav/>
        <main>
            <section id="hero"><Hero /></section>
            <section id="specials"><Specials /></section>
            <section id="testimonials"><Testimonials /></section>
            <section id="about"><About /></section>
        </main>
        <Footer/>
    </>;
}

export default App;