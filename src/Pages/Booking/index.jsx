import BookingForm from './BookingForm';

import './Booking.scss';

export { Booking as default };

const Booking = (props) => (
    <main id="Booking">
        <BookingForm {...props} />
    </main>
)