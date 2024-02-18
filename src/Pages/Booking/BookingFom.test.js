import { render, screen } from "@testing-library/react";
import BookingForm from './BookingForm';
import { updateTimes } from 'App';
import { isTimeSlot } from 'availableTimes.test'
import { fetchTimes } from 'availableTimes'

test('Renders the BookingForm heading', () => {
    const props = {
        timeSlots: {
            availableSlots: [],
            selectedSlot: ''
        },
        fetchTimes: () => Promise.resolve([]),
        dispatch: () => {},
        currentDate: '',
        onSubmit: () => {},
        onSuccess: () => {},
        guests: 0,
        setGuests: () => {}
    };

    render(<BookingForm {...props} />);
    const headingElement = screen.getByText("Reserve a table");

    expect(headingElement).toBeInTheDocument();
})

describe('time slots state', () => {
    test('fetchTimes fetches time slots', async () => {
        const times = await fetchTimes(
            new Date(2024, 1, 30, 12)
        );

        expect(times.every(isTimeSlot)).toBeTruthy();
    });
    
    test('updateTimes reducer', () => {
        const init = {};

        const a = updateTimes(init, {
            type: 'times_fetched',
            payload: ['17:00', '19:00', '22:00']
        });

        expect(a.availableSlots).toStrictEqual(['17:00', '19:00', '22:00']);
        expect(a.selectedSlot).toBe('');

        const b = updateTimes(a, {
            type: 'time_selected',
            payload: '19:00'
        });
    
        expect(b.availableSlots).toStrictEqual(['17:00', '19:00', '22:00']);
        expect(b.selectedSlot).toBe('19:00');
    })
})