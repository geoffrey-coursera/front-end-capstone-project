import { render, screen } from "@testing-library/react";
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from 'App';
import { laterThan, isTimeSlot } from 'availableTimes.test'

test('Renders the BookingForm heading', () => {
    const props = {
        timeSlots: {
            availableSlots: [],
            selectedSlot: ''
        },
        fetchTimes: () => Promise.resolve([]),
        dispatch: () => {}
    };

    render(<BookingForm {...props} />);
    const headingElement = screen.getByText("Reserve a table");

    expect(headingElement).toBeInTheDocument();
})

describe('time slots state', () => {
    test('initializeTimes gets at least one time slot later than current time', async () => {
        const currentHour = 17;
        const times = await initializeTimes(
            new Date(2024, 1, 30, currentHour, 0)
        );

        expect(times.every(isTimeSlot)).toBeTruthy();
        expect(laterThan(times, currentHour)).toBeTruthy();
        expect(times.length).toBeGreaterThanOrEqual(1);
    })

    test('updateTimes reducer', () => {
        const init = ['16:00', '18:00', '22:00'];

        const action1 = { type: 'times_fetched', payload: ['17:00', '19:00', '22:00'] };
        const action2 = { type: 'time_selected', payload: '19:00' };

        const a = updateTimes(init, action1);
        const b = updateTimes(a, action2);
    
        expect(a).toStrictEqual({
            availableSlots: ['17:00', '19:00', '22:00'],
            selectedSlot: '17:00'
        });

        expect(b).toStrictEqual({
            availableSlots: ['17:00', '19:00', '22:00'],
            selectedSlot: '19:00'
        });
    })
})