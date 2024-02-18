import React from 'react-dom';

import AlanTuring from '../assets/testimonials/alan-turing.jpg'
import GraceHopper from '../assets/testimonials/grace-hopper.jpg'
import AlonzoChurch from '../assets/testimonials/alonzo-church.jpg'
import HedyLamarr from '../assets/testimonials/hedy-lamarr.jpg'

import './Testimonials.css';

export { Testimonials as default };

const testimonials = [
    {
        id: 'alan-turing',
        userName: 'Alan Turing',
        src: AlanTuring,
        testimonial: "The apple pie is to die for.",
        rating: 5
    },
    {
        id: 'grace-hopper',
        userName: 'Grace Hopper',
        src: GraceHopper,
        testimonial: "I could take another byte of that bruschetta",
        rating: 5
    },
    {
        id: 'alonzo-church',
        userName: 'Alonzo Church',
        src: AlonzoChurch,
        testimonial: "Not a lambda restaurant for sure! Best in town!",
        rating: 4
    },
    {
        id: 'hedy-lamarr',
        userName: 'Hedy Lamarr',
        src: HedyLamarr,
        testimonial: "Mario and Adrian send really good vibes!",
        rating: 5
    }
];

const Testimonials = () => (
    <>
        <h2>Testimonials</h2>
        {testimonials.map(Testimonial)}
    </>
);

const Testimonial = ({ id, userName, src, testimonial, rating  }) => (
    <article key={id}>
        <img src={src} alt={userName} />
        <Rating stars={rating} />
        <h2>{userName}</h2>
        <blockquote>{testimonial}</blockquote>
    </article>
);

const Rating = ({ stars }) => (
    <div className="rating" role="img" aria-label={`Rating: ${stars} out of 5 stars`}>
        { many(5, i => <Star filled={i < stars} key={i} />) }
    </div>
);
const Star = ({ filled }) => (
    <span className="icon-star" aria-hidden="true">
        {filled ? "★" : "☆"}
    </span>
);

const many = (length, f) =>
    Array.from({ length }, (_, i) => f(i));