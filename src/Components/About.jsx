import React from 'react-dom';
import Chefs from '../assets/chicago/Mario-and-Adrian-vertical.jpg';
import Restaurant from '../assets/chicago/restaurant-vertical.jpg';

export { About as default };

const About = () => (
    <article>
        <header>
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
        </header>
        <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
        <img src={Restaurant} alt="The restaurant front" />
        <img src={Chefs} alt="Mario and Adrian laughing" />
    </article>
);