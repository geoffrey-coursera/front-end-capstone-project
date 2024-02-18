import Chefs from 'assets/chicago/Mario-and-Adrian-vertical.jpg';
import Restaurant from 'assets/chicago/restaurant-vertical.jpg';

import './About.scss';

export { About as default };

const About = () => (
    <article>
        <div className="wrapper">
            <header>
                <h2>Little Lemon</h2>
                <h3>Chicago</h3>
            </header>
            <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
        </div>
        <img src={Restaurant} alt="The restaurant front" />
        <img src={Chefs} alt="Mario and Adrian laughing" />
    </article>
);