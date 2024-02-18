import React from 'react-dom';
import StartersPlate from '../assets/starters-plate.jpg';

export { Hero as default };

const Hero = () => (
    <article>
        <header>
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
        </header>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <a href="#reservations">Reserve a table</a>
        <img src={StartersPlate} alt="a plate of starters" />
    </article>
);