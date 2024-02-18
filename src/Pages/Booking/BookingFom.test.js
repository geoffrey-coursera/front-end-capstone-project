import { render, screen } from "@testing-library/react";
import BookingForm from './BookingForm';
import { updateTimes } from 'App';
import { isTimeSlot } from 'availableTimes.test'
import { fetchTimes, getISODate } from 'availableTimes'

test('Renders the BookingForm heading', () => {
    const props = {
        timeSlots: {
            availableSlots: [],
            selectedSlot: '',
            date: new Date()
        },
        getTimeSlots: () => Promise.resolve([]),
        dispatchers: {
            date_selected: () => {},
            time_selected: () => {},
        },
        currentDate: '',
        onSubmit: () => {},
        onSuccess: () => {},
        guests: 0,
        setGuests: () => {},
        getISODate: () => ''
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

        const a = updateTimes('2024-01-30')(init, {
            type: 'times_fetched',
            payload: ['17:00', '19:00', '22:00']
        });

        expect(a.availableSlots).toStrictEqual(['17:00', '19:00', '22:00']);
        expect(a.selectedSlot).toBe('');

        const b = updateTimes('2024-01-30')(a, {
            type: 'time_selected',
            payload: '19:00'
        });
    
        expect(b.availableSlots).toStrictEqual(['17:00', '19:00', '22:00']);
        expect(b.selectedSlot).toBe('19:00');
    })
})