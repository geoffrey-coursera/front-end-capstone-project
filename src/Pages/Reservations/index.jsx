import BookingForm from './BookingForm';

import './Reservations.scss';

export { Reservations as default };

const Reservations = (props) => (
    <main id="Reservation">
        <BookingForm {...props} />
    </main>
)