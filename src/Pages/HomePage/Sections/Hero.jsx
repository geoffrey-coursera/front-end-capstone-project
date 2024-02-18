import React from 'react-dom';
import StartersPlate from 'assets/starters-plate.jpg';
import Button from 'Components/Button';
import Emphasis from 'Components/Emphasis';

import './Hero.css';

export { Hero as default };

const Hero = () => (
    <article>
        <div className="wrapper">
            <header>
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
            </header>
            <Emphasis>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Emphasis>
            <Button href="/reservation">Reserve a table</Button>
        </div>
        <img src={StartersPlate} alt="a plate of starters" />
    </article>
);