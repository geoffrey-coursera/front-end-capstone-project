import './ConfirmedBooking.scss';

export { Booking as default };

const Booking = (props) => props.guests && props.time
    ? <BookingSuccess { ...props } />
    : <BookingError />;

const BookingSuccess = ({ guests, date, currentDate, time }) => {
    const guestText = guests > 1
        ? <><strong>{guests}</strong> guests</>
        : <><strong>1</strong> guest</>;
    const dateText = date === currentDate
        ? 'today'
        : new Date(date).toLocaleDateString('en-GB', dateFormat)
    return (
        <main id="ConfirmedBooking">
            <h1>All good!</h1>
            <p>Your reservation for {guestText}, <strong>{dateText}</strong> at <strong>{time}</strong> was confirmed.
            </p>
        </main>
    )
}

const dateFormat = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year:'numeric'
}

const BookingError = () => (
    <main id="ConfirmedBooking">
        <h1>Oops</h1>
        <p>You need to make a reservation first.</p>
    </main>
);