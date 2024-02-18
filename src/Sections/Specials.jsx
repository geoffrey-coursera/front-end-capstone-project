import React from 'react-dom';
import GreekSalad from '../assets/specials/greek-salad.jpg';
import Bruschetta from '../assets/specials/bruschetta.jpg';
import LemonDessert from '../assets/specials/lemon-dessert.jpg';
import Delivery from '../assets/specials/delivery.png';
import Button from '../Components/Button';
import Link from '../Components/Link';

import './Specials.css';

export { Specials as default };

const specials = [
    {
        id: 'greek-salad',
        title: 'Greek salad',
        src: GreekSalad,
        alt: "picture of a greek salad",
        price: '$12.99',
        description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
    },
    {
        id: 'bruschetta',
        title: 'Bruschetta',
        src: Bruschetta,
        alt: "picture of a bruschetta",
        price: '$5.99',
        description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
    },
    {
        id: 'lemon-dessert',
        title: 'Lemon Dessert',
        src: LemonDessert,
        alt: "picture of a slice of lemon cake",
        price: '$5.00',
        description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined"
    }
];

const Specials = () => (
    <>
        <div className="wrapper">
            <h2>This weeks specials!</h2>
            <Button href="/order-online">Online Menu</Button>
        </div>
        {specials.map(Special)}
    </>
);

const Special = ({ id, title, src, alt, price, description }) => (
    <article key={id}>
        <img src={src} alt={alt} />
        <h2>{title}</h2>
        <span className="price">{price}</span>
        <p>{description}</p>
        <OrderLink id={id} />
    </article>
)

const OrderLink = ({ id }) => (
    <Link href={`/order-online?id=${id}`} after={Delivery}>
        Order a delivery
    </Link>
)