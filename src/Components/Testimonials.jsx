import React from 'react-dom';

import AlanTuring from '../assets/testimonials/alan-turing.jpg'
import GraceHopper from '../assets/testimonials/grace-hopper.jpg'
import AlonzoChurch from '../assets/testimonials/alonzo-church.jpg'
import HedyLamarr from '../assets/testimonials/hedy-lamarr.jpg'

export { Testimonials as default };

const testimonials = [
    {
        id: 'alan-turing',
        userName: 'Alan Turing',
        src: AlanTuring,
        testimonial: "The apple pie is to die for."
    },
    {
        id: 'grace-hopper',
        userName: 'Grace Hopper',
        src: GraceHopper,
        testimonial: "I could take another byte of that bruschetta"
    },
    {
        id: 'alonzo-church',
        userName: 'Alonzo Church',
        src: AlonzoChurch,
        testimonial: "Not a lambda restaurant for sure! Best in town!"
    },
    {
        id: 'hedy-lamarr',
        userName: 'Hedy Lamarr',
        src: HedyLamarr,
        testimonial: "Mario and Adrian send really good vibes!"
    }
];

const Testimonials = () => (
    <>
        <h2>Testimonials</h2>
        {testimonials.map(Testimonial)}
    </>
);

const Testimonial = ({ id, userName, src, testimonial  }) => (
    <article key={id}>
        <img src={src} alt={userName} />
        <h2>{userName}</h2>
        <blockquote>{testimonial}</blockquote>
    </article>
);